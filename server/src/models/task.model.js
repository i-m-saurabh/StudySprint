import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        note: {
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
        allFiles:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "File"
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


taskSchema.pre("save", function(next){
    if(this.thumbnail)
        return next();
    const topicThumbnails = {
        "C++": "https://www.vikingsoftware.com/wp-content/uploads/2024/02/C-2.png",
        "Frontend": "https://media.geeksforgeeks.org/wp-content/uploads/20240703165023/Frontend-Development-(1).webp",
        "Backend": "https://media.geeksforgeeks.org/wp-content/uploads/20240703165023/Frontend-Development-(1).webp",
        "OS": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPujbHXoJlpTIrHGnwGIOH5i8xx90nagfRWA&s",
        "Networking": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPujbHXoJlpTIrHGnwGIOH5i8xx90nagfRWA&s",
        "DBMS": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPujbHXoJlpTIrHGnwGIOH5i8xx90nagfRWA&s",
        "OOPS": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPujbHXoJlpTIrHGnwGIOH5i8xx90nagfRWA&s",
        "System Design": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjY_kBnvWybsQG3c9RlOATqLwOAFTVF-jWDA&s",
    };

    this.thumbnail = topicThumbnails[this.topic] || "https://example.com/thumbnails/default.png";
    next();
})

export const Task = mongoose.model("Task", taskSchema);