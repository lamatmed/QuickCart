import { inngest, syncUserCreate, syncUserDelete, syncUserUpdate } from "@/config/inngest";
import { serve } from "inngest/next";



console.log("⏳ Initialisation de Inngest...");

let handlers; // Variable pour stocker GET, POST, PUT

try {
    handlers = serve({
        client: inngest,
        functions: [syncUserCreate, syncUserUpdate, syncUserDelete],
    });

    console.log("✅ Inngest route initialized successfully");
} catch (error) {
    console.error("❌ Error initializing Inngest route:", error);
}

// Exporter les handlers en dehors du bloc try
export const { GET, POST, PUT } = handlers;