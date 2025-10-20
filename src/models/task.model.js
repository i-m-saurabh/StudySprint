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
            enum:["C++", "Frontend", "Backend", "OS", "Networking", "DBMS", "OOPS", "System Design"],
        },
        revisionDate: {
            type: Date,
            default: null
        },
        notes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note"
            }
        ]
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model("Task", taskSchema);