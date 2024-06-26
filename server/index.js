const express = require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
// const fileURLToPath = require("url");
const authRoutes= require("./routes/auth.js");
const userRoutes= require("./routes/users.js");
const postRoutes= require("./routes/posts.js");
const {register} = require("./controllers/auth");
const {createPost} = require("./controllers/posts");
const User = require("./models/User.js");
const Post = require("./models/Post.js");
const {users,posts} = require("./data/index.js");

// configuration  (middleware configurations and other functions)
// const __filename= fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(cors());
app.use('/assets',express.static(path.join(__dirname, "public/assets")));

// File storage
const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload= multer({storage});

// Routes with files(requires upload functionality so kept here)

app.post('/auth/register', upload.single("picture"), register);
app.post('/posts', upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP

const PORT= process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( ()=>{
    app.listen(PORT, ()=> {
        console.log(`Server started at port: ${PORT}`);
    });

    // ADD Data only one time
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error)=>{
    console.log(`Error: ${error}`);
})