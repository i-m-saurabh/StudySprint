import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        comment: {
            type: String,
            trim: true
        },
        topic:{
            type: String,
            required: true,
            enum:["C++", "Frontend", "Backend", "OS", "Networking", "DBMS", "OOPS", "System Design"],
        },
        revisionDate: {
            type: Date,
            default: null
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        notes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note"
            }
        ],
        thumbnail:{
            type: String,
            default: null
        },
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model("Task", taskSchema);