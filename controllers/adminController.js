const express = require('express');
const User = require("../model/user");
const Blog = require("../model/blog");
const adminController = express.Router();
adminController.get("/admin-dashboard", async (req, res) => {
    if (req.session.user.username === 'sukhveen') {
        try {
            let usersWithPendingBlogs = await User.find({ pendingBlogs: { $exists: true, $not: { $size: 0 } } }).populate('pendingBlogs');
            res.render("admin-dashboard", { usersWithPendingBlogs });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(403).send("Permission Denied");
    }
});

adminController.get("/approve-blog/:blogId", async (req, res) => {
    if (req.session.user.username === 'sukhveen') {
        const blogId = req.params.blogId;

        try {
            const blogToApprove = await Blog.findById(blogId);

            if (!blogToApprove) {
                return res.status(404).send("Blog not found");
            }

            blogToApprove.isApproved = true;
            await blogToApprove.save();

            const user = await User.findOne({ _id: blogToApprove.user });

            if (user) {
                user.pendingBlogs.pull(blogId);
                user.blog.push(blogId);
                await user.save();
            }

            res.redirect("/admin-dashboard");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(403).send("Permission Denied");
    }
});

adminController.get("/deny-blog/:blogId", async (req, res) => {
    try {
        if (req.session.user.username === 'sukhveen') {
            const blogId = req.params.blogId;
            const blogToDeny = await Blog.findById(blogId);

            if (blogToDeny) {
                blogToDeny.isApproved = false;
                await blogToDeny.save();

                const user = await User.findOne({ _id: blogToDeny.user });
                user.pendingBlogs.pull(blogId);
                await user.save();

                res.redirect("/admin-dashboard");
            } else {
                res.status(404).send("Blog not found");
            }
        } else {
            res.status(403).send("Permission Denied");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = adminController;
