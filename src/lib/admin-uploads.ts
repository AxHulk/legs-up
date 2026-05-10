import { supabase } from "@/integrations/supabase/client";

export async function uploadAdminImage(file: File, prefix = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("admin-uploads").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("admin-uploads").getPublicUrl(path);
  return data.publicUrl;
}
