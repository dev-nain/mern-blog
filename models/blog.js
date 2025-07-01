import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subTitle: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: false,
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    publishedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
})


blogSchema.virtual('isPublished').get(function() {
    return this.publishedAt !== null;
})

blogSchema.methods.publish = function() {
    this.publishedAt = new Date()
    return this.save()
}

blogSchema.methods.unpublish = function() {
    this.publishedAt = null
    return this.save()
}


blogSchema.statics.findByTag = function(tag) {
    return this.find({
        tags: { $in: [tag.toLowerCase()] },
        publishedAt: { $ne: null }
    }).sort({ publishedAt: -1 })
}

const Blog = model('Blog', blogSchema)

export default Blog