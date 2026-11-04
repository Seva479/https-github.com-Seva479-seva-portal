import { createClient } from '@supabase/supabase-js';
import { Application, ContactMessage } from '../types';

export const SUPABASE_PROJECT_ID =
  import.meta.env.VITE_SUPABASE_PROJECT_ID || 'eusqtayzaojdgucpvomg';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://eusqtayzaojdgucpvomg.supabase.co';

export function getSupabaseAnonKey(): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem('seva_supabase_anon_key');
      if (stored && stored.trim().length > 10) return stored.trim();
    }
  } catch (e) {
    // Ignore private browsing restrictions
  }
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (envKey && envKey !== 'your-supabase-anon-key-placeholder' && envKey !== 'your-supabase-anon-key-here') {
    return envKey;
  }
  return '';
}

export function saveSupabaseAnonKey(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (key && key.trim()) {
        window.localStorage.setItem('seva_supabase_anon_key', key.trim());
      } else {
        window.localStorage.removeItem('seva_supabase_anon_key');
      }
    }
  } catch (e) {
    // Ignore private browsing restrictions
  }
  reinitSupabaseClient();
}

export function isSupabaseConfigured(): boolean {
  const key = getSupabaseAnonKey();
  return Boolean(key && key.length > 20 && key !== 'your-supabase-anon-key-placeholder' && key !== 'your-supabase-anon-key-here');
}

// Client cache and reinitialization
let supabaseClientInstance = createClient(
  SUPABASE_URL,
  getSupabaseAnonKey() || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

export function getSupabaseClient() {
  return supabaseClientInstance;
}

export function reinitSupabaseClient() {
  supabaseClientInstance = createClient(
    SUPABASE_URL,
    getSupabaseAnonKey() || 'placeholder-anon-key',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
  return supabaseClientInstance;
}

export const supabase = supabaseClientInstance;

export interface SupabaseHealthStatus {
  connected: boolean;
  projectId: string;
  url: string;
  hasApplicationsTable: boolean;
  hasContactTable: boolean;
  isKeyConfigured: boolean;
  errorMessage?: string;
  details?: string;
}

/**
 * Checks connection status to the Supabase backend and tests table availability
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealthStatus> {
  const isKeyReady = isSupabaseConfigured();
  const currentKey = getSupabaseAnonKey();

  const result: SupabaseHealthStatus = {
    connected: false,
    projectId: SUPABASE_PROJECT_ID,
    url: SUPABASE_URL,
    hasApplicationsTable: false,
    hasContactTable: false,
    isKeyConfigured: isKeyReady,
  };

  if (!isKeyReady) {
    result.errorMessage = 'Supabase Anon Key is not yet configured. Please enter your project Anon Key below to enable cloud synchronization.';
    result.details = 'Get your Project API Anon Key from Supabase Dashboard > Settings > API.';
    return result;
  }

  try {
    // 1. Test basic connectivity
    const ping = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: currentKey,
        Authorization: `Bearer ${currentKey}`,
      },
    });

    if (ping.status === 200 || ping.status === 204) {
      result.connected = true;
    } else {
      result.errorMessage = `Supabase returned HTTP ${ping.status} (Invalid API Key or project paused)`;
      return result;
    }

    // 2. Check if applications table exists
    const client = getSupabaseClient();
    const appCheck = await client.from('applications').select('id').limit(1);
    if (!appCheck.error) {
      result.hasApplicationsTable = true;
    } else if (appCheck.error.code === 'PGRST205') {
      result.hasApplicationsTable = false;
      result.details = 'Table public.applications not yet created in Supabase schema cache.';
    } else {
      result.errorMessage = appCheck.error.message;
    }

    // 3. Check if contact_messages table exists
    const contactCheck = await client.from('contact_messages').select('id').limit(1);
    if (!contactCheck.error) {
      result.hasContactTable = true;
    } else {
      result.hasContactTable = false;
    }

    return result;
  } catch (err: any) {
    result.connected = false;
    result.errorMessage = err.message || 'Network error connecting to Supabase.';
    return result;
  }
}

/**
 * Saves a completed 32-field application record into the Supabase database
 */
export async function insertApplicationToSupabase(
  app: Application
): Promise<{ success: boolean; error?: string; code?: string; data?: any; skipped?: boolean }> {
  if (!isSupabaseConfigured()) {
    return { success: false, skipped: true, error: 'Supabase Anon Key is not configured yet.' };
  }

  try {
    const payload = {
      id: app.id,
      status: app.status,
      priority: app.priority,

      // Section A
      name_of_organization: app.name_of_organization,
      type_of_organization: app.type_of_organization,
      year_of_establishment: app.year_of_establishment,
      registration_number: app.registration_number,
      state: app.state,
      district: app.district,
      organisation_address: app.organisation_address,
      organisation_website: app.organisation_website || null,
      organisation_email: app.organisation_email,

      // Section B
      contact_person_name: app.contact_person_name,
      designation: app.designation,
      contact_number: app.contact_number,

      // Section C
      brief_description: app.brief_description,
      key_areas_of_work: app.key_areas_of_work || [],
      villages_covered: app.villages_covered,
      geographical_area_of_operation: app.geographical_area_of_operation,
      annual_beneficiaries_reached: app.annual_beneficiaries_reached,
      primary_beneficiaries: app.primary_beneficiaries,

      // Section D
      has_website: app.has_website,
      has_mis_system: app.has_mis_system,
      current_digital_tools: app.current_digital_tools || [],

      // Section E
      major_technology_challenges: app.major_technology_challenges,
      support_type_seeking: app.support_type_seeking || [],
      description_of_solution_needed: app.description_of_solution_needed,
      main_problem_to_solve: app.main_problem_to_solve,
      intended_users: app.intended_users,
      estimated_users_count: app.estimated_users_count,

      // Section F
      has_previous_digital_project: app.has_previous_digital_project,
      previous_digital_project_details: app.previous_digital_project_details || null,

      // Section G
      requirement_urgency: app.requirement_urgency,
      preferred_timeline: app.preferred_timeline,
      first_priority_support: app.first_priority_support,

      created_at: app.created_at,
      updated_at: app.updated_at,
    };

    const client = getSupabaseClient();
    const { data, error } = await client.from('applications').insert([payload]);

    if (error) {
      console.warn('Supabase insert application returned error:', error);
      return { success: false, error: error.message, code: error.code };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Exception sending application to Supabase:', err);
    return { success: false, error: err.message || 'Unexpected network error' };
  }
}

/**
 * Saves an inquiry form message to the Supabase contact_messages table
 */
export async function insertContactMessageToSupabase(
  msg: ContactMessage
): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  if (!isSupabaseConfigured()) {
    return { success: false, skipped: true, error: 'Supabase Anon Key is not configured yet.' };
  }

  try {
    const payload = {
      id: msg.id,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      organisation: msg.organisation || null,
      subject: msg.subject,
      message: msg.message,
      submitted_at: msg.submitted_at,
      status: msg.status,
    };

    const client = getSupabaseClient();
    const { error } = await client.from('contact_messages').insert([payload]);

    if (error) {
      console.warn('Supabase insert contact message error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch remote applications from Supabase database
 */
export async function fetchRemoteApplications(): Promise<Application[] | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Failed to fetch from Supabase:', error);
      return null;
    }

    return data as Application[];
  } catch (err) {
    console.error('Network error fetching applications:', err);
    return null;
  }
}

/**
 * Quick SQL setup script for user to copy-paste into Supabase SQL editor
 */
export const QUICK_SETUP_SQL = `-- SEVA - Supabase Setup Script for Project: ${SUPABASE_PROJECT_ID}
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new

CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'New Application',
    priority TEXT NOT NULL DEFAULT 'Medium',
    name_of_organization TEXT NOT NULL,
    type_of_organization TEXT NOT NULL,
    year_of_establishment INTEGER NOT NULL,
    registration_number TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    organisation_address TEXT NOT NULL,
    organisation_website TEXT,
    organisation_email TEXT NOT NULL,
    contact_person_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    brief_description TEXT NOT NULL,
    key_areas_of_work TEXT[] NOT NULL DEFAULT '{}',
    villages_covered INTEGER NOT NULL DEFAULT 0,
    geographical_area_of_operation TEXT NOT NULL,
    annual_beneficiaries_reached INTEGER NOT NULL DEFAULT 0,
    primary_beneficiaries TEXT NOT NULL,
    has_website BOOLEAN NOT NULL DEFAULT false,
    has_mis_system BOOLEAN NOT NULL DEFAULT false,
    current_digital_tools TEXT[] NOT NULL DEFAULT '{}',
    major_technology_challenges TEXT NOT NULL,
    support_type_seeking TEXT[] NOT NULL DEFAULT '{}',
    description_of_solution_needed TEXT NOT NULL,
    main_problem_to_solve TEXT NOT NULL,
    intended_users TEXT NOT NULL,
    estimated_users_count INTEGER NOT NULL DEFAULT 1,
    has_previous_digital_project BOOLEAN NOT NULL DEFAULT false,
    previous_digital_project_details TEXT,
    requirement_urgency TEXT NOT NULL,
    preferred_timeline TEXT NOT NULL,
    first_priority_support TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    organisation TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    status TEXT NOT NULL DEFAULT 'Unread'
);

-- Enable RLS & Allow public insert & read
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on applications"
ON public.applications FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow read on applications"
ON public.applications FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Allow update on applications"
ON public.applications FOR UPDATE TO anon, authenticated
USING (true);

CREATE POLICY "Allow public insert on contact_messages"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow read on contact_messages"
ON public.contact_messages FOR SELECT TO anon, authenticated
USING (true);
`;
