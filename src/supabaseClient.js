import { createClient } from '@supabase/supabase-js';

// Your Supabase project details
const SUPABASE_URL = "https://dnsjylzyhyfwvuoprfpi.supabase.co"; // Replace with your Project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuc2p5bHp5aHlmd3Z1b3ByZnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTA2NTcsImV4cCI6MjA1ODM4NjY1N30.teamPH3_p8oXTsJzTgLZVg7lCCLRB7CO9VTHfbV7qcQ"; // Replace with your Anon Key

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
