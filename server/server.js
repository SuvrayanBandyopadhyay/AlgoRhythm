const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt")
const multer = require('multer');
const path = require("path");
const dotenv = require('dotenv');
const session = require("express-session");
const fs = require('fs').promises;


const searchSongs = require("./searchSongs");
const checkLogin = require("./checkLogin");
const checkRegister = require("./checkRegister");
const saveFile = require("./saveFile");
const getLatestItems = require("./getLatest");
const getTrendingItems = require("./getTrending")
const getSongInfo = require("./getSongInfo");
const getPopularItems = require("./getPopular");
const getAccountInfo = require("./getAccountInfo");
const getAccountSongs = require("./getAccountSongs");


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
//Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//# Search
app.get('/search', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Missing search query' });
    }

    res.json({ 
        message: `You searched for: ${query}`,
        results: await searchSongs(query, 0,false),
    });
});


//# Browse
app.get('/browse', async (req, res) => {
    
    res.json({ 
        message: `You are browsing`,
        results: await searchSongs(" ", 0,true),
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
    else  {
        // Failed login: redirect back to signin with query param
        res.redirect("http://localhost:3000/signin?failed=true");
    } 
        
})

app.post('/registercheck',async function(req,res)
{
    username = req.body["uname"];
    email = req.body["email"];
    pass = req.body["password"];
    pass_conf = req.body["confirmpassword"];
    val = await checkRegister(username,email,pass,pass_conf);

    //Success
    if(val==0)
    {
        res.redirect('http://localhost:3000/signin')
    }
    //Failiure
    else  {
        // Failed login: redirect back to signin with query param
        res.redirect(`http://localhost:3000/register?failed=${val}`);
    } 

})

app.get('/signout',function(req,res)
{
    delete req.session.user;
    res.redirect('http://localhost:3000/');
})

//Check authentication
app.get('/auth/check',function(req,res)
{
    if (req.session.user)
    {
        res.json({authenitcated:true,user:req.session.user.name,id:req.session.user.id});
    }
    else
    {
        res.send({authenitcated:false});
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //If it is an imageFile
        if(file.fieldname==='imageFile')
        {
            cb(null, 'uploads/images');
        }
        else if(file.fieldname==="audioFile")
        {
            cb(null,'uploads/audio')
        }

        
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//Get Latest
app.get('/getlatest', async (req, res) => {
    const i = req.query.i;
    if (!i) {
        return res.status(400).json({ error: 'Missing search query' });
    }
    const data = await getLatestItems(i);

    // Map over items and update imagefile to be a URL
    const itemsWithUrls = data.items.map(item => {
        let imagefileUrl = null;
        if (item.imagefile) {
            // Replace backslashes with forward slashes for URLs
            const normalizedPath = item.imagefile.replace(/\\/g, '/');
            imagefileUrl = `http://localhost:5000/${normalizedPath}`;
        }
        return {
            ...item,
            imagefile: imagefileUrl
        };
    });

    res.json({
        items: itemsWithUrls,
        hasAll: data.hasAll,
    });
});

//Get trending
app.get('/gettrending', async (req, res) => {
    const i = req.query.i;
    if (!i) {
        return res.status(400).json({ error: 'Missing search query' });
    }
    const data = await getTrendingItems(i);

    // Map over items and update imagefile to be a URL
    const itemsWithUrls = data.items.map(item => {
        let imagefileUrl = null;
        if (item.imagefile) {
            // Replace backslashes with forward slashes for URLs
            const normalizedPath = item.imagefile.replace(/\\/g, '/');
            imagefileUrl = `http://localhost:5000/${normalizedPath}`;
        }
        return {
            ...item,
            imagefile: imagefileUrl
        };
    });

    res.json({
        items: itemsWithUrls,
        hasAll: data.hasAll,
    });
});


//Get Popular
app.get('/getpopular', async (req, res) => {
    const i = req.query.i;
    if (!i) {
        return res.status(400).json({ error: 'Missing search query' });
    }
    const data = await getPopularItems(i);

    // Map over items and update imagefile to be a URL
    const itemsWithUrls = data.items.map(item => {
        let imagefileUrl = null;
        if (item.imagefile) {
            // Replace backslashes with forward slashes for URLs
            const normalizedPath = item.imagefile.replace(/\\/g, '/');
            imagefileUrl = `http://localhost:5000/${normalizedPath}`;
        }
        return {
            ...item,
            imagefile: imagefileUrl
        };
    });

    res.json({
        items: itemsWithUrls,
        hasAll: data.hasAll,
    });
});




//Upload song
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }
});

app.post('/songupload', upload.fields([
    { name: 'imageFile', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 }
]), async (req, res) => {
    try {
        if (!req.files || !req.files.audioFile) {
            return res.status(400).send({ message: 'Audio Files not found' });
        }
        if(!req.files.imageFile)
        {
            return res.status(400).send({message:"imagefile not found"})
        }

        if(!req.session.user)
        {
            if (req.files?.audioFile) {
                await fs.unlink(req.files.audioFile[0].path).catch(console.error);
            }
            if (req.files?.imageFile) {
                await fs.unlink(req.files.imageFile[0].path).catch(console.error);
            }

            res.redirect("http://localhost:3000/signin");
    
        }

        else{

        val = await saveFile(req.session.user.id,req.body.title,req.files.imageFile[0].path,req.files.audioFile[0].path);
        
        if(val>=0)
        {
            res.redirect("http://localhost:3000?upload=success");
        }
        else
        {
            if (req.files?.audioFile) {
                await fs.unlink(req.files.audioFile[0].path).catch(console.error);
            }
            if (req.files?.imageFile) {
                await fs.unlink(req.files.imageFile[0].path).catch(console.error);
            }
        
            if(val==-1)
            {
                res.redirect("http://localhost:3000/songupload?failed=true");
            }
        }

        }
        


    } catch (error) {


        if (req.files?.audioFile) {
            await fs.unlink(req.files.audioFile[0].path).catch(console.error);
        }
        if (req.files?.imageFile) {
            await fs.unlink(req.files.imageFile[0].path).catch(console.error);
        }

        res.redirect("http://localhost:3000/songupload?failed=true");


    }
});

//Get song info
app.get('/song/:id',async (req,res)=>
    {
        try
        {
            const id = req.params.id;
            data = await getSongInfo(id);
            if(data)
            {
                res.send({data});
            }
            else
            {
                return res.status(404).send({message:"song not found"})
            }
        }
        catch
        {
            res.status(500).send({ message: 'Error while retrieving song information' });
        }
    });

//Get account info
app.get('/account/:id',async(req,res)=>
{
    try
    {
        const id = req.params.id;
        data = await getAccountInfo(id);
        if(data)
        {
            res.send({data});
        }
        else
        {
            return res.status(404).send({message:"Account not found"})
        }
    }
    catch
    {
        res.status(500).send({ message: 'Error while retrieving account information' });
    }
});
//Get account songs
app.get('/accountsongs/:id',async(req,res)=>
{
    const i = req.query.i;
    const id = req.params.id;
    if (!i) {
        return res.status(400).json({ error: 'Missing search query' });
    }
    const data = await getAccountSongs(i,id);

    // Map over items and update imagefile to be a URL
    const itemsWithUrls = data.items.map(item => {
        let imagefileUrl = null;
        if (item.imagefile) {
            // Replace backslashes with forward slashes for URLs
            const normalizedPath = item.imagefile.replace(/\\/g, '/');
            imagefileUrl = `http://localhost:5000/${normalizedPath}`;
        }
        return {
            ...item,
            imagefile: imagefileUrl
        };
    });

    res.json({
        items: itemsWithUrls,
        hasAll: data.hasAll,
    });
});



app.listen(process.env.SERVER_PORT)
