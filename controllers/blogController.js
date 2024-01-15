const express = require('express');
const Blog = require("../model/blog");
const User = require("../model/user");

const blogController = express.Router();

blogController.post("/addblog", async (req, res) => {
    const { title, content, imageUrl } = req.body;
    const newBlog = new Blog({ title, content, user: req.session.user._id, imageUrl });
    await newBlog.save();

    let user = await User.findOne({ _id: req.session.user._id });

    if (user.username === 'sukhveen') {
        user.blog.push(newBlog._id);
        await user.save();
    } else {
        user.pendingBlogs.push(newBlog._id);
        await user.save();
    }
    if (user.username === 'sukhveen') {
        const script = `
        <script>
            alert('Blog added successfully!');
            window.location.href = '/';
        </script>
    `;

    res.send(script);
        
    } else {
        const script = `
        <script>
            alert(' Pending approval from admin.');
            window.location.href = '/';
        </script>
    `;

    res.send(script);
    }
    // const script = `
    //     <script>
    //         alert('Blog added successfully! Pending approval from admin.');
    //         window.location.href = '/';
    //     </script>
    // `;

    // res.send(script);
});

blogController.get("/myblog", async (req, res) => {
    let user = await User.findById(req.session.user._id).populate("blog");
    res.render("myblog", { blogs: user.blog, user: user });
});

blogController.get("/blogs", async (req, res) => {
    let data = await Blog.find().populate("user");
    res.render("allblogs", { blogs: data });
});

blogController.get("/editblog/:blogId", async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blogToUpdate = await Blog.findById(blogId);

        if (!blogToUpdate) {
            return res.status(404).send("Blog not found");
        }

        if (req.session.user._id.toString() !== blogToUpdate.user.toString()) {
            return res.status(403).send("You do not have permission to edit this blog");
        }

        res.render("editblog", { blogToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

blogController.post("/updateblog/:blogId", async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const { title, content, imageUrl } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content, imageUrl }, { new: true });

        if (!updatedBlog) {
            return res.status(404).send("Blog not found");
        }
        const script = `
            <script>
                alert('Blog updated successfully!');
                window.location.href = '/myblog';
            </script>
            `;
        
            res.send(script);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
        });
        
        blogController.get("/deleteblog/:blogId", async (req, res) => {
            try {
                const blogId = req.params.blogId;
        
                const blogToDelete = await Blog.findById(blogId);
        
                if (!blogToDelete) {
                    return res.status(404).send("Blog not found");
                }
        
                if (req.session.user._id.toString() !== blogToDelete.user.toString()) {
                    return res.status(403).send("You do not have permission to delete this blog");
                }
        
                await Blog.deleteOne({ _id: blogId });
                const script = `
                <script>
                    alert('Blog deleted successfully!');
                    window.location.href = '/myblog';
                </script>
            `;
        
            res.send(script);
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
        
        module.exports = blogController;
        