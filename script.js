
// const express=require('express');
// const app=express();
// const path=require("path");
// const mongoose = require('mongoose');//database connect kiya tbhi enter kroge data
// const Blog=require("./model/blog");
// const User=require("./model/user");
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// app.use(session({
//     secret: 'keyboard cat',
//     // resave: false,
//     // saveUninitialized: true,
//     // cookie: { secure: true }
//   }))
// //const { register } = require('module');
// app.use(express.static(path.join(__dirname, "static")));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.set('view engine','hbs');


// const hbs = require('hbs');
// hbs.registerHelper('eq', function (a, b) {
//     return a.toString() === b.toString(); // Convert ObjectId to string for comparison
// });
// function checkIsLoggedIN(req,res,next){
//     if(req.session.isLoggedIn)
//     {
//         next();
//     }
//     else{
//         res.redirect("/register");

//     }
// }
// app.get("/", (req, res) => {
//     res.render("home", { user: req.session.user });
// });

// // app.get("/",checkIsLoggedIN,(req,res)=>{
// //     res.render("home",{user:req.session.user});//user ka name bhja home pe
// // })
// app.get("/login",(req,res)=>{
//     res.render("login");
// })

// app.get("/register",(req,res)=>{
//     res.render("register");
// })
// // app.post("/register", async (req, res) => {
// //     try {
// //         const { username, password } = req.body;
        
// //         // Hash the password
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Create a new user with the hashed password
// //         const newUser = new User({ username, password: hashedPassword });
// //         await newUser.save();

// //         res.send("User registered successfully");
       
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });


// // app.post("/register", async (req, res) => {
// //     try {
// //         const { username, password } = req.body;

// //         // Hash the password
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Create a new user with the hashed password
// //         const newUser = new User({ username, password: hashedPassword });
// //         await newUser.save();

// //         // Display success message and redirect to login page
// //         res.send(`
// //             <script>
// //                 alert('User registered successfully');
// //                 window.location.href = '/login';
// //             </script>
// //         `);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });
// app.post("/register", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Set the role for 'sukhveen' to 'admin'
//         const role = username === 'sukhveen' ? 'admin' : 'user';

//         // Create a new user with the hashed password and role
//         const newUser = new User({ username, password: hashedPassword, role });
//         await newUser.save();

//         // Display success message and redirect to login page
//         res.send(`
//             <script>
//                 alert('User registered successfully');
//                 window.location.href = '/login';
//             </script>
//         `);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// app.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         let user = await User.findOne({ username: username });

//         if (user) {
//             // Compare the entered password with the hashed password
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 req.session.isLoggedIn = true;
//                 req.session.user = user;
//                 res.redirect("/");
//             } else {
//                 res.send("Invalid password");
//             }
//         } else {
//             res.send("User not found");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // app.post("/register",async(req,res)=>{
// //     const{username,password}=req.body;
// //     const newUser=new User({username,password});
// //     await newUser.save();
// //     res.send("User registered successfully");

// // })
// // app.post("/login",async(req,res)=>{
// //     const{username,password}=req.body;
// //     let user=await User.findOne({username:username});
// //     if(user)
// //     {
// //         if(user.password!=password)
// //         res.send("invalid password");
// //     else{
// //         req.session.isLoggedIn=true;
// //        req.session.user=user;

// //     res.redirect("/");
// //     }

// //     }
// //     else{
// //         res.send("user not found");

// //     }


// // })
// // app.post("/addblog",async(req,res)=>{
// //     const {title,content,imageUrl}=req.body;
// //     let newBlog=new blog({title,content,user:req.session.user._id,imageUrl});
// //     await newBlog.save();
// //     let user=await User.findOne({_id:req.session.user._id})
// //     user.blog.push(newBlog._id);
// //     await  user.save();
// //     const script = `
// //             <script>
// //                 alert('Blog added successfully!');
// //                 window.location.href = '/';
// //             </script>
// //         `;

// //         res.send(script);
// //     // res.send("done");

// // })
// // app.post("/addblog", async (req, res) => {
// //     const { title, content, imageUrl } = req.body;
// //     const newBlog = new blog({ title, content, user: req.session.user._id, imageUrl });
// //     await newBlog.save();

// //     let user = await User.findOne({ _id: req.session.user._id });
// //     user.pendingBlogs.push(newBlog._id);
// //     await user.save();

// //     const script = `
// //         <script>
// //             alert('Blog added successfully! Pending approval from admin.');
// //             window.location.href = '/';
// //         </script>
// //     `;

// //     res.send(script);
// // });

// // app.get("/myblog",async(req,res)=>{
// //     let user=await User.findById(req.session.user._id).populate("blog");
// //     console.log(user);
// //     res.render("myblog",{blogs:user.blog,user:user});

// // })
// // app.get("/blogs",async(req,res)=>{
// //     let data=await blog.find().populate("user");
// //     // console.log(data);
// //     res.render("allblogs", { blogs: data });
   
// // })
// app.post("/addblog", async (req, res) => {
//     const { title, content, imageUrl } = req.body;
//     const newBlog = new Blog({ title, content, user: req.session.user._id, imageUrl });
//     await newBlog.save();

//     let user = await User.findOne({ _id: req.session.user._id });
//     if(user.username ==='sukhveen'){
//         user.blog.push(newBlog._id);
//                 await user.save();
//     }
//     else{
//     user.pendingBlogs.push(newBlog._id);
//     await user.save();
//     }

//     const script = `
//         <script>
//             alert('Blog added successfully! Pending approval from admin.');
//             window.location.href = '/';
//         </script>
//     `;

//     res.send(script);
// });

// app.get("/myblog", async (req, res) => {
//     let user = await User.findById(req.session.user._id).populate("blog");
//     console.log(user);
//     res.render("myblog", { blogs: user.blog, user: user });
// });

// app.get("/blogs", async (req, res) => {
//     let data = await Blog.find().populate("user");
//     res.render("allblogs", { blogs: data });
// });

// app.get("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error(err);
//         } else {
//             res.redirect("/"); // Redirect to the login page after logout
//         }
//     });
// });
// // Edit blog route
// app.get("/editblog/:blogId", async (req, res) => {
//     try {
//         const blogId = req.params.blogId;
//         const blogToUpdate = await Blog.findById(blogId);

//         if (!blogToUpdate) {
//             return res.status(404).send("Blog not found");
//         }

//         // Check if the logged-in user is the same as the blog creator
//         if (req.session.user._id.toString() !== blogToUpdate.user.toString()) {
//             return res.status(403).send("You do not have permission to edit this blog");
//         }

//         // Render the edit form with the blog data
//         res.render("editblog", { blogToUpdate });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Update blog route
// app.post("/updateblog/:blogId", async (req, res) => {
//     try {
//         const blogId = req.params.blogId;
//         const { title, content, imageUrl } = req.body;

//         const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content, imageUrl }, { new: true });

//         if (!updatedBlog) {
//             return res.status(404).send("Blog not found");
//         }
//         const script = `
//             <script>
//                 alert('Blog updated successfully!');
//                 window.location.href = '/myblog';
//             </script>
//         `;

//         res.send(script);
//         // res.send("Blog updated successfully");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Delete blog route
// app.get("/deleteblog/:blogId", async (req, res) => {
//     try {
//         const blogId = req.params.blogId;

//         const blogToDelete = await Blog.findById(blogId);

//         if (!blogToDelete) {
//             return res.status(404).send("Blog not found");
//         }

//         // Check if the logged-in user is the same as the blog creator
//         if (req.session.user._id.toString() !== blogToDelete.user.toString()) {
//             return res.status(403).send("You do not have permission to delete this blog");
//         }

//         // Delete the blog
//         await Blog.deleteOne({ _id: blogId });
//         const script = `
//         <script>
//             alert('Blog deleted successfully!');
//             window.location.href = '/myblog';
//         </script>
//     `;

//     res.send(script);
//         // res.send("Blog deleted successfully");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });
// // app.get("/admin-dashboard", async (req, res) => {
// //     // Check if the logged-in user is the admin (sukhveen)
// //     if (req.session.user.username === 'sukhveen') {
// //         // Fetch pending blogs from the admin's pendingBlogs array
// //         let admin = await User.findOne({ _id: req.session.user._id }).populate('pendingBlogs');
// //         res.render("admin-dashboard", { pendingBlogs: admin.pendingBlogs });
// //     } else {
// //         res.status(403).send("Permission Denied");
// //     }
// // });
// app.get("/admin-dashboard", async (req, res) => {
//     // Check if the logged-in user is the admin (sukhveen)
//     if (req.session.user.username === 'sukhveen') {
//         try {
//             // Fetch all users with pending blogs
//             let usersWithPendingBlogs = await User.find({ pendingBlogs: { $exists: true, $not: { $size: 0 } } }).populate('pendingBlogs');

//             // Render the admin dashboard with pending blogs for each user
//             res.render("admin-dashboard", { usersWithPendingBlogs });
//         } catch (error) {
//             console.error(error);
//             res.status(500).send("Internal Server Error");
//         }
//     } else {
//         res.status(403).send("Permission Denied");
//     }
// });


// // app.get("/admin-dashboard",async(req,res)=>{
// //     let admin = await User.findOne({ _id: req.session.user._id }).populate('pendingBlogs');
// //     console.log(admin);
// //      res.render("admin-dashboard", { pendingBlogs: admin.pendingBlogs });
// // })
// // app.post("/approve-blog/:blogId", async (req, res) => {
// //     // Check if the logged-in user is the admin (sukhveen)
// //     if (req.session.user.username === 'sukhveen' ) {
// //         const blogId = req.params.blogId;
// //         const blogToApprove = await Blog.findById(blogId);
// //         if (blogToApprove) {
// //             blogToApprove.isApproved = true;
// //             await blogToApprove.save();

// //             // Remove the blog from the admin's pendingBlogs array
// //             const admin = await User.findOne({ _id: req.session.user._id });
// //             admin.pendingBlogs.pull(blogId);
// //             await admin.save();

// //             res.redirect("/admin-dashboard");
// //         } else {
// //             res.status(404).send("Blog not found");
// //         }
// //     } else {
// //         res.status(403).send("Permission Denied");
// //     }
// // });

// // app.get("/deny-blog/:blogId", async (req, res) => {
// //     if (req.session.user.username === 'sukhveen' ) {
// //         const blogId = req.params.blogId;
// //         const blogToApprove = await Blog.findById(blogId);

// //         if (blogToApprove) {
// //             blogToApprove.isApproved = false;
// //             await blogToApprove.save();

// //             // Remove the blog from the admin's pendingBlogs array
// //             const admin = await User.findOne({ _id: req.session.user._id });
// //             admin.pendingBlogs.pull(blogId);
// //             await admin.save();

// //             res.redirect("/admin-dashboard");
// //         } else {
// //             res.status(404).send("Blog not found");
// //         }
// //     } else {
// //         res.status(403).send("Permission Denied");
// //     }
   
// // });
// // Update "/approve-blog/:blogId" route
// // app.get("/approve-blog/:blogId", async (req, res) => {
// //     try {
// //         // Check if the logged-in user is the admin (sukhveen)
// //         if (req.session.user.username === 'sukhveen' ) {
// //             const blogId = req.params.blogId;
// //             const blogToApprove = await Blog.findById(blogId);

// //             if (blogToApprove) {
// //                 // Approve the blog
// //                 blogToApprove.isApproved = true;
// //                 await blogToApprove.save();

// //                 // Move the blog from pendingBlogs to blogs of the user who created it
// //                 const user = await User.findOne({ _id: blogToApprove.user });
// //                 user.pendingBlogs.pull(blogId);
// //                 user.blogs.push(blogId);
// //                 await user.save();

// //                 res.redirect("/admin-dashboard");
// //             } else {
// //                 res.status(404).send("Blog not found");
// //             }
// //         } else {
// //             res.status(403).send("Permission Denied");
// //         }
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });
// app.get("/approve-blog/:blogId", async (req, res) => {
//     // Check if the logged-in user is the admin (sukhveen)
//     if (req.session.user.username === 'sukhveen') {
//         const blogId = req.params.blogId;

//         try {
//             // Find the blog to approve
//             const blogToApprove = await Blog.findById(blogId);

//             if (!blogToApprove) {
//                 return res.status(404).send("Blog not found");
//             }

//             // Set isApproved to true
//             blogToApprove.isApproved = true;
//             await blogToApprove.save();

//             // Find the user who created the blog
//             const user = await User.findOne({ _id: blogToApprove.user });

//             if (user) {
//                 // Remove the blog from pendingBlogs
//                 user.pendingBlogs.pull(blogId);

//                 // Push the blogId to the user's blogs array
//                 user.blog.push(blogId);

//                 // Save the changes to the user
//                 await user.save();
//             }

//             res.redirect("/admin-dashboard");
//         } catch (error) {
//             console.error(error);
//             res.status(500).send("Internal Server Error");
//         }
//     } else {
//         res.status(403).send("Permission Denied");
//     }
// });

// // Update "/deny-blog/:blogId" route
// app.get("/deny-blog/:blogId", async (req, res) => {
//     try {
//         // Check if the logged-in user is the admin (sukhveen)
//         if (req.session.user.username === 'sukhveen') {
//             const blogId = req.params.blogId;
//             const blogToDeny = await Blog.findById(blogId);

//             if (blogToDeny) {
//                 // Deny the blog
//                 blogToDeny.isApproved = false;
//                 await blogToDeny.save();

//                 // Remove the blog from the pendingBlogs array
//                 const user = await User.findOne({ _id: blogToDeny.user });
//                 user.pendingBlogs.pull(blogId);
//                 await user.save();

//                 res.redirect("/admin-dashboard");
//             } else {
//                 res.status(404).send("Blog not found");
//             }
//         } else {
//             res.status(403).send("Permission Denied");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'sukhveen.d@gmail.com', // Your Gmail address
//         pass: 'xkog mdys xrgp qgjm' // Your Gmail password
//     }
// });

// app.post("/register", async (req, res) => {
//     try {
//         const { username, password, email } = req.body;

//         // Check if email is provided
//         if (!email) {
//             return res.status(400).send("Email is required");
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Set the role for 'sukhveen' to 'admin'
//         const role = username === 'sukhveen' ? 'admin' : 'user';

//         // Create a new user with the hashed password, role, and email
//         const newUser = new User({ username, password: hashedPassword, role, email });
//         await newUser.save();

//         // Send verification email
        
//         const verificationLink = `http://localhost:3334/verify-email/${newUser._id}`;
//         // const verificationLink = `http://your-app-domain/verify-email/${newUser._id}`;
//         const mailOptions = {
//             from: 'sukhveen.d@gmail.com', // Your Gmail address
//             to: email,
//             subject: 'Email Verification',
//             html: `Click <a href="${verificationLink}">here</a> to verify your email.`
//         };

//         await transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error(error);
//                 res.status(500).send("Error sending verification email");
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 res.send(`
//                     <script>
//                         alert('User registered successfully! Please check your email for verification.');
//                         window.location.href = '/login';
//                     </script>
//                 `);
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.get("/verify-email/:userId", async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId);

//         if (user) {
//             // Update the user's emailVerified status
//             user.emailVerified = true;
//             await user.save();

//             res.send(`
//                 <script>
//                     alert('Email verified successfully! You can now log in.');
//                     window.location.href = '/login';
//                 </script>
//             `);
//         } else {
//             res.status(404).send("User not found");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });



// // mongoose.connect('mongodb://127.0.0.1:27017/g26session').then(()=>{//database s connect kiya mongoose ko
// //  app.listen(6655,()=>{
// //     console.log("Server started");
// // })   
// // })
// mongoose.connect('mongodb://127.0.0.1:27017/g26session', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(3334, () => {
//       console.log(`Server started on port 3334`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });
// // const express = require('express');
// // const app = express();
// // const path = require("path");
// // const mongoose = require('mongoose');
// // const session = require('express-session');
// // const bcrypt = require('bcrypt');
// // const nodemailer = require('nodemailer');
// // const authController = require('./controllers/authController');
// // const blogController = require('./controllers/blogController');
// // const adminController = require('./controllers/adminController');

// // // ... (other setup code)

// // // Middleware
// // app.use(session({
// //     secret: 'keyboard cat',
// // }))
// // app.use(express.static(path.join(__dirname, "static")));
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// // app.set('view engine', 'hbs');

// // // Routes
// // app.get("/", (req, res) => {
// //     res.render("home", { user: req.session.user });
// // });

// // app.get("/login", authController.getLogin);
// // app.get("/register", authController.getRegister);
// // app.post("/register", authController.postRegister);
// // app.post("/login", authController.postLogin);
// // app.get("/logout", authController.logout);

// // app.get("/myblog", blogController.getMyBlog);
// // app.get("/blogs", blogController.getAllBlogs);
// // app.post("/addblog", blogController.postAddBlog);
// // app.get("/editblog/:blogId", blogController.getEditBlog);
// // app.post("/updateblog/:blogId", blogController.postUpdateBlog);
// // app.get("/deleteblog/:blogId", blogController.getDeleteBlog);

// // app.get("/admin-dashboard", adminController.getAdminDashboard);
// // app.get("/approve-blog/:blogId", adminController.getApproveBlog);
// // app.get("/deny-blog/:blogId", adminController.getDenyBlog);

// // app.post("/register", authController.postRegisterWithEmailVerification);
// // app.get("/verify-email/:userId", authController.verifyEmail);

// // // ...

// // // Connect to MongoDB
// // mongoose.connect('mongodb://127.0.0.1:27017/g26session', { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //     app.listen(3334, () => {
// //       console.log(`Server started on port 3334`);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error('Error connecting to MongoDB:', error);
// //   });
// Importing controllers
const authController = require('./controllers/authController');
const blogController = require('./controllers/blogController');
const adminController = require('./controllers/adminController');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require("path");
const session = require('express-session');
const hbs = require('hbs');
const dotenv = require("dotenv");
hbs.registerHelper('eq', function (a, b) {
    return a.toString() === b.toString(); // Convert ObjectId to string for comparison
});
dotenv.config();



app.use(session({
    secret: 'keyboard cat',
}));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');

// Routes
app.use("/", authController);
app.use("/", blogController);
app.use("/", adminController);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3334, () => {
      console.log(`Server started on port 3334`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
