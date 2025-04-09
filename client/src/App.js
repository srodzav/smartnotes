import React, { useState, useEffect } from "react";
import NoteInput from "./components/NoteInput";
import NotesList from "./components/NotesList";
import GraphVisualization from "./components/GraphVisualization";
import { getNotes, createNote, updateNote, deleteNote } from "./services/api";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
    const [notes, setNotes] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getNotes();
                setNotes(data.notes || []);
                setConnections(data.connections || []);
            } catch (error) {
                console.error("Error fetchin notes:", error);
                setError(
                    "Error al cargar notas. ¿El servidor está funcionando?"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateNote = async (content) => {
        try {
            const data = await createNote({ content });
            setNotes(data.notes);
            setConnections(data.connections);
        } catch (error) {
            console.error("Error creating note:", error);
            setError(
                "Error al crear nota. Verifica la conexión con el servidor."
            );
        }
    };

    const handleUpdateNote = async (id, content) => {
        try {
            const data = await updateNote(id, { content });
            setNotes(data.notes);
            setConnections(data.connections);
            setSelectedNote(null);
        } catch (error) {
            console.error("Error updating note:", error);
            setError(
                "Error al actualizar nota. Verifica la conexión con el servidor."
            );
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const data = await deleteNote(id);
            setNotes(data.notes);
            setConnections(data.connections);
            if (selectedNote && selectedNote.id === id) {
                setSelectedNote(null);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            setError(
                "Error al eliminar nota. Verifica la conexión con el servidor."
            );
        }
    };

    const handleNoteSelect = (note) => {
        setSelectedNote(note);
    };

    return (
        <div className="app-container">
            <h1>Smart Notes</h1>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="main-content">
                    <div className="notes-section">
                        <NoteInput
                            onSave={(content) => handleCreateNote(content)}
                        />
                        <NotesList
                            notes={notes}
                            selectedNote={selectedNote}
                            onSelect={handleNoteSelect}
                            onDelete={handleDeleteNote}
                            onUpdate={handleUpdateNote}
                        />
                    </div>
                    <div className="graph-section">
                        <GraphVisualization
                            notes={notes}
                            connections={connections}
                            onNoteSelect={handleNoteSelect}
                            selectedNote={selectedNote}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
