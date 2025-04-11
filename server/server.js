const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt")
const multer = require('multer');
const path = require("path");
const searchSongs = require("./database");
const checkLogin = require("./checkLogin")
const dotenv = require('dotenv');
//For sessions
const session = require("express-session")

dotenv.config();

app = express();

// Allow cross origin requests
app.use(cors({
    origin:"http://localhost:3000",
    methods: ['GET','POST'],
    credentials: true,
}))

// Middleware to parse URL encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session middleware
app.use(session({
    name:'session',
    secret:"Secret_key",
    resave:false,
    saveUninitialized: true,
    expires: new Date(Date.now() + 2*60*60*1000),//24 hrs
}))


//# Search
app.get('/search', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Missing search query' });
    }

    res.json({ 
        message: `You searched for: ${query}`,
        results: await searchSongs(query, 0),
    });
});

// Serve static files from the 'public' directory
app.use('/covers', express.static(path.join(__dirname, 'public', 'covers')));

// Handle missing images (optional)
app.use('/covers', (req, res, next) => {
    res.status(404).send('Cover image not found');
});


//# Sign-in, Register and authentication check
//POST
app.post('/signincheck',async function(req,res)
{
    //console.log(req.body);
    //res.send(("Recieved your request:: username:"+req.body["uname"]+" password "+req.body["pass"]));
    username = req.body["uname"];
    password = req.body["pass"];

    val = await checkLogin(username,password);
    console.log("Val")
    console.log(val)
    if(val !=-1)
    { 
        //If session is not defined
        if(!req.session.user)
        {
            req.session.user = {};
        }

        //Set user session
        req.session.user.id = val;
        req.session.user.name = username;
    

        //If its valid
       
        res.redirect('http://localhost:3000/');
    }
    else   
        res.send("INVALID");
})

app.post('/registercheck',function(req,res)
{
    console.log(req.body);
    res.send(("New user tried to register"));
})

//Check authentication
app.get('/auth/check',function(req,res)
{
    if (req.session.user)
    {
        console.log(req.session.user.id)
        res.json({authenitcated:true,user:req.session.user.name,id:req.session.user.id});
    }
    else
    {
        res.send({authenitcated:false});
    }
})



//# Song Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Files will be uploaded to 'uploads' directory
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate unique filename with original extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter function to control which files are accepted
const fileFilter = (req, file, cb) => {
    // Accept only specific file types
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'text/plain' ||
        file.mimetype === 'audio/mpeg' ||    // MP3 files
        file.mimetype === 'audio/mp3'){
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10MB file size limit
    }
});

app.post('/songupload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }   
        // File upload successful
        res.send({
            message: 'File uploaded successfully',
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error uploading file',
            error: error.message
        });
    }
});

app.listen(process.env.SERVER_PORT)
