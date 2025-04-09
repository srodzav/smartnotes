import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import * as similarity from "../utils/similarity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "../../data/db.json");

// In-memory database
let data = {
    notes: [],
    connections: [],
};

function init() {
    try {
        // Ensure data directory exists
        const dataDir = path.dirname(DB_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Load data if file exists
        if (fs.existsSync(DB_FILE)) {
            const fileData = fs.readFileSync(DB_FILE, "utf8");
            data = JSON.parse(fileData);
        } else {
            // Create initial empty data
            saveData();
        }
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

function saveData() {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

function getAllData() {
    return data;
}

function addNote(content, embedding) {
    const id = uuidv4();
    const note = {
        id,
        content,
        embedding,
        createdAt: new Date().toISOString(),
    };

    data.notes.push(note);
    saveData();

    return id;
}

function updateNote(id, content, embedding) {
    const index = data.notes.findIndex((note) => note.id === id);

    if (index === -1) {
        throw new Error("Note not found");
    }

    data.notes[index] = {
        ...data.notes[index],
        content,
        embedding,
        updatedAt: new Date().toISOString(),
    };

    saveData();
}

function deleteNote(id) {
    data.notes = data.notes.filter((note) => note.id !== id);
    data.connections = data.connections.filter(
        (conn) => conn.source !== id && conn.target !== id
    );

    saveData();
}

function findConnections(noteId) {
    const newNote = data.notes.find((note) => note.id === noteId);

    if (!newNote) {
        throw new Error("Note not found");
    }

    // Compare with other notes
    data.notes.forEach((otherNote) => {
        if (otherNote.id === noteId) return; // Skip self

        const sim = similarity.cosineSimilarity(
            newNote.embedding,
            otherNote.embedding
        );

        console.log(
            `Similitud entre "${newNote.content}" y "${otherNote.content}": ${sim}`
        );

        // Add connection if similarity is above threshold
        if (sim >= 0.4) {
            const connection = {
                source: noteId,
                target: otherNote.id,
                similarity: sim,
            };

            data.connections.push(connection);
        }
    });

    saveData();
}

function recalculateConnections() {
    // Clear existing connections
    data.connections = [];

    // Recalculate all connections
    data.notes.forEach((note) => {
        data.notes.forEach((otherNote) => {
            if (note.id === otherNote.id) return; // Skip self

            const sim = similarity.cosineSimilarity(
                note.embedding,
                otherNote.embedding
            );

            // Add connection if similarity is above threshold
            if (sim >= 0.4) {
                // Check if connection already exists (in opposite direction)
                const existingConnection = data.connections.find(
                    (conn) =>
                        (conn.source === otherNote.id &&
                            conn.target === note.id) ||
                        (conn.source === note.id &&
                            conn.target === otherNote.id)
                );

                if (!existingConnection) {
                    const connection = {
                        source: note.id,
                        target: otherNote.id,
                        similarity: sim,
                    };

                    data.connections.push(connection);
                }
            }
        });
    });

    saveData();
}

export {
    init,
    getAllData,
    addNote,
    updateNote,
    deleteNote,
    findConnections,
    recalculateConnections,
};
