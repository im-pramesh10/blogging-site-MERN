const {Blog} = require("../models/blogModel")

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
        const blog = await Blog.findOne({_id: req.params.id}).populate("author", "-password").exec()
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
        blog.save()
        res.json({
                message: `Blog ${
                blog._id
            } Updated`
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

        const blogs = await Blog.find().populate('author').skip((page - 1) * limit).limit(limit);

        res.json({
            totalItems: totalBlogs,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: limit,
            blogs
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching blogs', error});
    }
}
