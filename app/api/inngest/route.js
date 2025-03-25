"use server";

import { serve } from "inngest/next";
import { inngest, syncUserCreate, syncUserDelete, syncUserUpdate } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [syncUserCreate, syncUserUpdate, syncUserDelete],
});