import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Créer un client pour Inngest
export const inngest = new Inngest({ id: "quickcart-next" });

// Fonction pour créer un utilisateur
export const syncUserCreate = inngest.createFunction({ id: 'syncUserCreate-from-clerk' }, { event: 'clerk/user.created' },
    async({ event }) => {

        const { id, first_name, last_name, email_address, image_url } = event.data

        const userData = {
            _id: id,
            name: first_name + '' + last_name,
            email: email_address[0].email_address,
            imageUrl: image_url,
        }
        await connectDB()
        await User.create(userData)


    }
)

// Fonction pour mettre à jour un utilisateur
export const syncUserUpdate = inngest.createFunction({
        id: 'syncUserUpdate-from-clerk'
    }, {
        event: 'clerk/user.updated'
    },
    async({ event }) => {

        const { id, first_name, last_name, email_address, image_url } = event.data

        const userData = {
            _id: id,
            name: first_name + '' + last_name,
            email: email_address[0].email_address,
            imageUrl: image_url,
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)


    }
);

// Fonction pour supprimer un utilisateur
export const syncUserDelete = inngest.createFunction({
        id: 'syncUserDelete-from-clerk'
    }, {
        event: 'clerk/user.deleted'
    },
    async({ event }) => {
        const {
            id
        } = event.data
        await connectDB();

        await User.findByIdAndDelete(id);

    }

);