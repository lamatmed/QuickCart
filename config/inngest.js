import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Créer un client pour Inngest
export const inngest = new Inngest({ id: "quickcart" });

// Fonction pour créer un utilisateur
export const syncUserCreate = inngest.createFunction({ id: 'syncUserCreate-from-clerk' }, { event: 'clerk/user.created' },
    async({ event }) => {
        await connectDB(); // Connexion à la base de données
        console.log("📢 Événement reçu pour la création d'un utilisateur :", event.data);

        try {
            const { id, first_name, last_name, email_address, image_url } = event.data;

            const userData = {
                _id: id,
                name: `${first_name} ${last_name}`,
                email: email_address[0].email_address,
                imageUrl: image_url,
            };

            const newUser = await User.create(userData);
            console.log("✅ Utilisateur créé avec succès :", newUser);
        } catch (error) {
            console.error("❌ Erreur lors de la création de l'utilisateur :", error);
        }
    }
);

// Fonction pour mettre à jour un utilisateur
export const syncUserUpdate = inngest.createFunction({ id: "syncUserUpdate-from-clerk" }, { event: "clerk/user.updated" },
    async({ event }) => {
        await connectDB();
        console.log("📢 Événement reçu pour la mise à jour d'un utilisateur :", event.data);

        try {
            const { id, first_name, last_name, email_address, image_url } = event.data;

            const userData = {
                name: `${first_name} ${last_name}`,
                email: email_address[0].email_address,
                imageUrl: image_url,
            };

            const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
            console.log("✅ Utilisateur mis à jour :", updatedUser);
        } catch (error) {
            console.error("❌ Erreur lors de la mise à jour de l'utilisateur :", error);
        }
    }
);

// Fonction pour supprimer un utilisateur
export const syncUserDelete = inngest.createFunction({ id: "syncUserDelete-from-clerk" }, { event: "clerk/user.deleted" },
    async({ event }) => {
        await connectDB();
        console.log("📢 Événement reçu pour la suppression d'un utilisateur :", event.data);

        try {
            const { id } = event.data;
            await User.findByIdAndDelete(id);
            console.log("✅ Utilisateur supprimé avec succès :", id);
        } catch (error) {
            console.error("❌ Erreur lors de la suppression de l'utilisateur :", error);
        }
    }
);