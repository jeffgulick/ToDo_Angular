require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling multipart/form-data

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DATABASENAME = "todoappdb";

let database; // Declare a variable to hold the database connection

// Function to connect to the MongoDB database
async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING);
        database = client.db(DATABASENAME);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// Start the server and connect to the database
app.listen(5038, async () => {
    try {
        await connectToDatabase();
        console.log("Server started on port 5038");
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
});

// API Endpoints
// GET endpoint to retrieve all notes
app.get('/api/todoapp/GetNotes', async (req, res) => {
    try {
        const result = await database.collection("todoappcollection").find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Failed to fetch notes", error: error.message });
    }
});

// POST endpoint to add a new note
app.post('/api/todoapp/AddNotes', multer().none(), async (req, res) => {
    try {
        const numOfDocs = await database.collection("todoappcollection").countDocuments({});
        const newNote = {
            id: (numOfDocs + 1).toString(),
            description: req.body.newNotes
        };
        await database.collection("todoappcollection").insertOne(newNote);
        res.status(201).json({ message: "Added Successfully", data: newNote });
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ message: "Failed to add note", error: error.message });
    }
});

// DELETE endpoint to delete a note
app.delete('/api/todoapp/DeleteNotes', async (req, res) => {
    try {
        const { id } = req.query;
        const result = await database.collection("todoappcollection").deleteOne({ id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Deleted Successfully", deletedId: id });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Failed to delete note", error: error.message });
    }
});