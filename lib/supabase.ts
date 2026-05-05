import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oqjmgdcazagatrhpeqov.supabase.co";
const supabaseAnonKey = "sb_publishable_XvSsU5lu4faVcL3mvF_f6A_XpfJlDEj";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);