const {Blog} = require("../models/blogModel")
const {Comment} = require("../models/commentModel")
const {Like} = require("../models/likesModel")

async function getBloglikes(id) {
    const likesCount = await Like.count().where("blog").equals(id)
    return likesCount
}

exports.create = async (req, res) => {
    try {
        const blog = await Blog.create({
            ...req.body
        })
        console.log(blog)
        res.json({message: "blog succesfully created"})
    } catch (err) {
        res.json(err)
    }
}
exports.getOne = async (req, res) => {
    try {
        let blog = await Blog.findOne({_id: req.params.id}).populate("author", "-password").exec()
        const likesCount = await getBloglikes(req.params.id)
        blog = {
            ... blog._doc,
            likesCount: likesCount
        }
        res.json(blog)
    } catch (err) {
        res.json(err)
    }

}

exports.update = async (req, res) => { // console.log(req.params.id)
    try {
        const _id = req.params.id
        let blog = await Blog.findById(_id)
        blog.title = req.body.title
        blog.content = req.body.content
        blog.save().then(() => {
            res.json({
                    message: `Blog ${
                    blog._id
                } Updated`
            })
        })

    } catch (err) {
        res.json({err})
    }
}
exports.delete = async (req, res) => {
    try {
        const _id = req.params.id
        const blog = await Blog.findByIdAndDelete(_id)
        res.json(`Blog ${
            blog._id
        } deleted`)

    } catch (err) {
        res.json(err)
    }
}
exports.getPages = async (req, res) => {
    if (req.query.page < 0 || req.query.limit < 0) {
        res.json({message: "page or limit can't be negative number"})
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        // const blogs = await Blog.find().populate('author', "-password").skip((page - 1) * limit).limit(limit);
        const aggregatedResult = await Blog.aggregate([
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "blog",
                    as: "likes"
                }
            },
            {
                $addFields: {
                    likesCount: {
                        $size: "$likes"
                    }
                }
            }, {
                $project: {
                    likes: 0
                }
            }
        ]).exec()

        const blogs = await Blog.populate(aggregatedResult, {
            path: "author",
            select: "-password"
        })

        res.json({
            totalItems: totalBlogs,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: limit,
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching blogs', error});
    }
}

exports.getComments = async (req, res) => {
    try {
        const count = await Comment.count({blog: req.params.id}).exec()
        const comments = await Comment.find({blog: req.params.id}).exec()
        res.json({count: count, comments: comments})
    } catch (err) {
        res.json(err)
    }
}
