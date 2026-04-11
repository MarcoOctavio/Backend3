import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: "user"
    },

    documents: [
        {
            name: String,
            reference: String
        }
    ],

    last_connection: {
        type: Date,
        default: null
    }

});

export default mongoose.model(userCollection, userSchema);