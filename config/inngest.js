import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart" });

// Connect to the MongoDB database
export const syncUserCreate = inngest.createFunction({
    id: "syncUserCreate-from-clerck",
}, {
    event: "clerck/user.created"
}, async({ event }) => {
    const {
        id,
        first_name,
        last_name,
        email_address,
        image_url
    } = event.data;
    const userData = {
        _id: id,
        name: `${first_name} ${last_name}`,
        email: email_address[0].email_address,
        imageUrl: image_url,

    }
    await connectDB()
    await User.create(userData)
})

export const syncUserUpdate = inngest.createFunction({
    id: "syncUserUpdate-from-clerck"
   

},{
     event: "clerck/user.updated"
},

async ({ event }) => {
    const {
        id,
        first_name,
        last_name,
        email_address,
        image_url
    } = event.data;
    const userData = {
         _id:id,
         name: `${first_name} ${last_name}`,
         email: email_address[0].email_address,
         imageUrl: image_url,
    }
    await connectDB()
    await User.findByIdAndUpdate(id, userData)
}
)

export const syncUserDelete = inngest.createFunction(
    {id: "syncUserDelete-from-clerck"},
    {event: "clerck/user.delete"},
    async ({ event }) => {
        const { id } = event.data;
        await connectDB()
        await User.findByIdAndDelete(id)
    }

)