import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Créer un client pour Inngest
export const inngest = new Inngest({ id: "QuickCart" });

// Fonction pour créer un utilisateur
export const syncUserCreate = inngest.createFunction(
  { id: 'syncUserCreate-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    console.log("Données reçues pour la création de l'utilisateur :", event.data);

    // Accès aux données correctement en utilisant event.data
    const { id, first_name, last_name, email_address, image_url } = event.data;

    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_address[0].email_address,  // Prenez le premier email si plusieurs
      imageUrl: image_url,
    };

    try {
      await connectDB();
      console.log("Connexion réussie à la base de données.");

      const newUser = await User.create(userData);
      console.log("Utilisateur créé :", newUser);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  }
);

// Fonction pour mettre à jour un utilisateur
export const syncUserUpdate = inngest.createFunction(
  { id: 'syncUserUpdate-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    console.log("Données reçues pour la mise à jour de l'utilisateur :", event.data);

    // Accès aux données correctement en utilisant event.data
    const { id, first_name, last_name, email_address, image_url } = event.data;

    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_address[0].email_address,  // Prenez le premier email si plusieurs
      imageUrl: image_url,
    };

    try {
      await connectDB();
      console.log("Connexion réussie à la base de données.");

      const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
      console.log("Utilisateur mis à jour :", updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  }
);

// Fonction pour supprimer un utilisateur
export const syncUserDelete = inngest.createFunction(
  { id: 'syncUserDelete-from-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    console.log("Données reçues pour la suppression de l'utilisateur :", event.data);

    // L'ID de l'utilisateur est directement sous event.data.id
    const { id } = event.data;

    try {
      await connectDB();
      console.log("Connexion réussie à la base de données.");

      await User.findByIdAndDelete(id);
      console.log("Utilisateur supprimé.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  }
);
