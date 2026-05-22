const mongoose = require('mongoose')
const slugify = require('slugify')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    slug: {
      type: String,
      unique: true
    },
    problem: {
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    },
    approach: {
      type: String,
      required: true
    },
    features: [
      {
        type: String
      }
    ],
    technologies: [
      {
        type: String,
        index: true
      }
    ],
    images: [
      {
        type: String
      }
    ],
    icon: {
      type: String
    },
    creator: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
      },
      username: String,
      profilePic: String
    },
    voteCount: {
      type: Number,
      default: 0,
      index: true
    },
    savesCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)
projectSchema.index({ createdAt: -1 })

projectSchema.index({
  title: 'text',
  problem: 'text',
  solution: 'text',
  techStack: 'text'
})

projectSchema.pre('save', async function () {
  if (!this.isModified('title')) return

  const baseSlug = slugify(this.title, {
    lower: true,
    strict: true
  })

  let slug = baseSlug
  let counter = 1

  while (await this.constructor.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`
  }

  this.slug = slug
})

module.exports = mongoose.model('Projects', projectSchema)
