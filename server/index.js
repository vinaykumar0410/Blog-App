
// import packages
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.js')
const bcrypt = require('bcrypt')
const json = require('jsonwebtoken')
const middleware = require('./middleware/middleware.js')
const cors = require('cors')
const Blog = require('./models/blog.js')


require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors({origin:'*'}))

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('DB Connected');
        })
        .catch((err)=>{
            console.log(err);
        })

// defining routes
app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.post('/register', async (req, res)=>{
    try {
        const {username, email, password, confirmpassword} = req.body;
        let exist = await User.findOne({email});
        if(exist){
            return res.status(401).json({message : 'User Already Exist'});
        }
        if(password !== confirmpassword){
            return res.status(401).json({message : 'Password Mismatch'});
        }
        
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password : hashedpassword
        })
        await user.save();
        return res.status(200).json({message: 'User Registered Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'})
    }
})

app.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
        let exist = await User.findOne({email});
        if(!exist){
            return res.status(401).json({message : 'User Not Found'});
        }
        const isMatch = await bcrypt.compare(password, exist.password);
        if(!isMatch){
            return res.status(401).json({message : 'Invalid Credentials'});
        }
        let payload = {
            user : {
                id : exist.id,
            }
        }
        json.sign(payload, process.env.SECRET, {expiresIn: '1h'}, (err, token)=>{
            if(err){
                throw new err
            }
            return res.status(200).json({token});
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
})

app.get('/home', middleware, async (req, res)=>{
    try {
        let user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message: 'User Not Found'});
        }
        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
})

app.post('/blogs',middleware, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        const {title, content} = req.body
        const newBlog = new Blog({
            title,
            content,
            author:user,
            authorname:user.username,
            createdAt : new Date(),
            published:true
        })
        const savedBlog = await newBlog.save()
        return res.status(200).json({savedBlog})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
})

app.get('/blogs', middleware, async(req,res)=>{
    try {
        const blogs = await Blog.find()
        return res.status(200).json({blogs})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
})

app.get('/blogs/:id', middleware, async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        if(!blog){
            return res.status(404).json({message : 'Blog Not Found'})
        }
        return res.status(200).json({blog})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
})

app.put('/blogs/:id', middleware, async(req,res)=>{
    try {
        const {title, content} = req.body
        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            return res.status(404).json({ message: 'Blog Not Found' });
        }
        if(blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this blog' });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,{
            title, 
            content, 
            updatedAt: new Date()
        });
        if(!updatedBlog) {
            return res.status(404).json({message:'Blog Not Found'});
        }
        return res.status(200).json({updatedBlog});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
})

app.delete('/blogs/:id', middleware, async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            return res.status(404).json({ message: 'Blog Not Found' });
        }
        if(blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this blog' });
        }
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        if(!deletedBlog){
            return res.status(404).json({message:'Blog Not Found'});
        }
        const blogs = await Blog.find()
        return res.status(200).json({blogs})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
})

app.listen(process.env.PORT, ()=>{
    console.log('Server started..');
})

