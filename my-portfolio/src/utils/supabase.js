import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ecwgfsgpiicqwojtjgid.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd2dmc2dwaWljcXdvanRqZ2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODEzOTAsImV4cCI6MjA4NzA1NzM5MH0.urGHtHnFed1PtO3FjojXvILS0bRTtqhS9v9TVnRyt-g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
