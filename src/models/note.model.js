import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema(
    {
        file:{
            type: String,               //Cloudinary URL
            trim: true,
        }
    },
    {
        timestamps: true
    }
);

export const Note = mongoose.model("Note", noteSchema);