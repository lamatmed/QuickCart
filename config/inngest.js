import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart" });

// Connect to MongoDB before handling events
async function ensureDBConnection() {
    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

// Function to create a new user when an event is received
export const syncUserCreate = inngest.createFunction(
    "syncUserCreate-from-clerck",
    { event: "clerck/user.created" },
    async ({ event }) => {
        await ensureDBConnection();

        const { id, first_name, last_name, email_address, image_url } = event.data;
        
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_address?.[0]?.email_address || "", // Sécurisation
            imageUrl: image_url,
        };

        await User.create(userData);
    }
);

// Function to update user data
export const syncUserUpdate = inngest.createFunction(
    "syncUserUpdate-from-clerck",
    { event: "clerck/user.updated" },
    async ({ event }) => {
        await ensureDBConnection();

        const { id, first_name, last_name, email_address, image_url } = event.data;

        const userData = {
            name: `${first_name} ${last_name}`,
            email: email_address?.[0]?.email_address || "",
            imageUrl: image_url,
        };

        await User.findByIdAndUpdate(id, userData, { new: true });
    }
);

// Function to delete user data
export const syncUserDelete = inngest.createFunction(
    "syncUserDelete-from-clerck",
    { event: "clerck/user.deleted" },  // Vérifiez le bon nom de l'événement
    async ({ event }) => {
        await ensureDBConnection();

        const { id } = event.data;
        await User.findByIdAndDelete(id);
    }
);
