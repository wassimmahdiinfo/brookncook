// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jqlnjbcddkjntbomftqp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG5qYmNkZGtqbnRib21mdHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDA2OTEsImV4cCI6MjA5MTMxNjY5MX0.2LTLkTWjGNYSLC3UzeYjF42GdBkGyS2kEK4um-FVl2c"
);