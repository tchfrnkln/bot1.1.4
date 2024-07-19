import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(`${process.env.NEXT_PUBLIC_SuperBaseUrl}`, `${process.env.NEXT_PUBLIC_SuperBaseApiKey}`)
 


