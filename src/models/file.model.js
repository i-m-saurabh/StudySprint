import mongoose, {Schema} from "mongoose";

const fileSchema = new Schema(
    {
        file:{
            type: String,               //Cloudinary URL
            trim: true,
        },
        thumbnail:{
            type: String,               //Cloudinary URL
            default: null
        }, 
        correspondingTask:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const File = mongoose.model("File", fileSchema);