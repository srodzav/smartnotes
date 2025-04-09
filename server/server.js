import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getEmbedding } from "./services/embeddingService.js";
import * as db from "./models/database.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database
db.init();

// Routes
app.get("/api/notes", (req, res) => {
    const { notes, connections } = db.getAllData();
    res.json({ notes, connections });
});

app.post("/api/notes", async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }

        // Generate embedding for the note
        const embedding = await getEmbedding(content);

        // Add note to database
        const noteId = db.addNote(content, embedding);

        // Find connections with other notes
        db.findConnections(noteId);

        // Return updated data
        const { notes, connections } = db.getAllData();
        res.status(201).json({ notes, connections });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Error creating note" });
    }
});

app.put("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }

        // Generate new embedding
        const embedding = await getEmbedding(content);

        // Update note
        db.updateNote(id, content, embedding);

        // Recalculate connections
        db.recalculateConnections();

        // Return updated data
        const { notes, connections } = db.getAllData();
        res.json({ notes, connections });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Error updating note" });
    }
});

app.delete("/api/notes/:id", (req, res) => {
    try {
        const { id } = req.params;

        // Delete note
        db.deleteNote(id);

        // Return updated data
        const { notes, connections } = db.getAllData();
        res.json({ notes, connections });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Error deleting note" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
