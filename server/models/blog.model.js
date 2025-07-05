import { Schema, model } from 'mongoose'
import slugify from '../utils/slugify.js'

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"],
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true,
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
    },
    publishedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true 
})

blogSchema.pre('save', function (next) {
    this.slug = slugify(this.title);
    next()
})


const Blog = model('Blog', blogSchema)

export default Blog