const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const app = express();
const bodyPraser = require("body-parser")
const cors = require('cors');
const PORT = process.env.PORT;
const multer = require('multer');
const path = require('path');
const { type } = require('os');
const { auth } = require("./firebaseAdmin");
const {supabase} = require('./SupabaseClient');
app.use(cors());
app.use(express.json())
app.use(bodyPraser.json())
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));


app.get("/", (req, res) => {
  res.send("Firebase Auth Backend is running!");
});

app.get("/auth-users", async (req, res) => {
  try {
    const listUsersResult = await auth.listUsers(1000);
    const users = listUsersResult.users.map((userRecord) => ({
      uid: userRecord.uid,
      Email: userRecord.email,
      CreatedAt: userRecord.metadata.creationTime,
    }));
    res.status(200).json(users);
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

mongoose.connect(process.env.DBuri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB is connected'))
.catch((err) => console.log(err));

const subjectSchema = new mongoose.Schema({
    subImageUrl: { required:true, type:String },
    VideoUrl: { required:true, type:String },
    subjectTopic: { required:true, type:String },
    subjectDescription: { required:true, type:String },
    MaterialPdf: { required:true, type:String },
    QnPdf: { required:true, type:String },
    CreatedAt: { type: Date, default: Date.now }
});

const SubjectModel = mongoose.model('subjects', subjectSchema);


const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/uploadSubject', upload.fields([
    { name: 'subImage' },
    { name: 'MaterialPdf' },
    { name: 'QnPdf' }
]), async (req, res) => {
    const { subjectTopic, subjectDescription, VideoUrl } = req.body;

    try {
       
        const uploadToSupabase = async (file, folder) => {
            if (!file) return '';
            const fileName = Date.now() + '-' + file.originalname;
            const { data, error } = await supabase.storage
                .from('uploads') 
                .upload(`${folder}/${fileName}`, file.buffer, {
                    cacheControl: '3600',
                    upsert: true,
                    contentType: file.mimetype
                });
            if (error) throw error;
            const { publicUrl } = supabase.storage.from('uploads').getPublicUrl(`${folder}/${fileName}`);
            return publicUrl;
        };

        const subImageUrl = await uploadToSupabase(req.files['subImage'] ? req.files['subImage'][0] : null, 'images');
        const materialPdfUrl = await uploadToSupabase(req.files['MaterialPdf'] ? req.files['MaterialPdf'][0] : null, 'pdfs');
        const qnPdfUrl = await uploadToSupabase(req.files['QnPdf'] ? req.files['QnPdf'][0] : null, 'pdfs');

        const newSubject = new SubjectModel({
            subImageUrl,
            MaterialPdf: materialPdfUrl,
            QnPdf: qnPdfUrl,
            VideoUrl,
            subjectTopic,
            subjectDescription
        });

        await newSubject.save();
        res.status(201).json(newSubject);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Get all subjects
app.get('/get-subjects', async (req, res) => {
    try {
        const subjects = await SubjectModel.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get subject by ID
app.get('/get_subjects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const subjects = await SubjectModel.findById(id);
        if (!subjects) return res.status(404).json({ message: "Subject not found" });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const itemSchema = new mongoose.Schema({
    imageUrl:{
        required:true,
        type:String,
    },
    videoUrl:{
        required:true,
        type:String,
    },
    subjectTitle: {
        required:true,
        type:String,
        length:10
    },
    videoContent:{
        type:String,
    },
    content:{
        required:true,
        type:String,
        length:10
    },
    CreatedAt:{
        type:Date,
        default:Date.now(),
    }
});


const itemModel = mongoose.model('courses',itemSchema);



app.post('/subjects', upload.single('image'), async (req, res) => {
    const {videoUrl,videoContent,subjectTitle, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const newItem = new itemModel({
            videoUrl,
            imageUrl,
            subjectTitle,
            content
        });
        await newItem.save();
        res.status(201).json(newItem);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

app.get('/subjects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await itemModel.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.get('/subjectsGet' ,async(req,res)=>{
    try {
        const subjects = await itemModel.find();
        res.json(subjects)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
        
    }
});

app.put('/subjectsUpdate/:id', upload.single('image'), async (req, res) => {
    const { videoUrl,videoContent,subjectTitle, content } = req.body;
    const id = req.params.id;

    try {
        const existingItem = await itemModel.findById(id);
        if (!existingItem) {
            return res.status(404).json({ message: "The Data Is Not Found" });
        }

        let imageUrl = existingItem.imageUrl;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedItem = await itemModel.findByIdAndUpdate(
            id,
            { subjectTitle, content, imageUrl,videoUrl,videoContent },
            { new: true }
        );

        res.status(200).json(updatedItem);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


app.delete('/subjectsDelete/:id', async(req,res) => {
    try {
        const id = req.params.id;
        await itemModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
});

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`The server is running port ${PORT} `)
});
