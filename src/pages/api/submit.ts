import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../lib/database.types"; // types actually broke it...
import { FormSchema } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;
  console.log("supabaseUrl", supabaseUrl);
  console.log("supabaseKey", supabaseKey);

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method === "POST") {
    console.log("req.body", req.body);
    const userData: FormSchema = req.body;
    const { data, error } = await supabase
      .from("users")
      .insert([{ data: userData }])
      .select();
    if (error) {
      console.log("error", error);
      return res.status(500).json({ message: "error" });
    } else {
      console.log("OK");
      console.log("user", data);
      return res.status(200).json({ message: "OK" });
    }
  }
}
