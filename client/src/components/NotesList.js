import React, { useState } from "react";
import NoteInput from "./NoteInput";

function NotesList({ notes, selectedNote, onSelect, onDelete, onUpdate }) {
    const [editingNote, setEditingNote] = useState(null);

    const handleEdit = (note) => {
        setEditingNote(note);
    };

    const handleUpdate = (id, content) => {
        onUpdate(id, content);
        setEditingNote(null);
    };

    return (
        <div className="notes-list">
            <h2>My Notes</h2>
            {notes.length === 0 ? (
                <p>No notes. Write one!</p>
            ) : (
                <ul>
                    {notes.map((note) => (
                        <li
                            key={note.id}
                            className={
                                selectedNote && selectedNote.id === note.id
                                    ? "selected"
                                    : ""
                            }
                        >
                            {editingNote && editingNote.id === note.id ? (
                                <NoteInput
                                    onSave={handleUpdate}
                                    initialContent={note.content}
                                    noteId={note.id}
                                />
                            ) : (
                                <>
                                    <div
                                        className="note-content"
                                        onClick={() => onSelect(note)}
                                    >
                                        {note.content.length > 100
                                            ? `${note.content.substring(
                                                  0,
                                                  100
                                              )}...`
                                            : note.content}
                                    </div>
                                    <div className="note-actions">
                                        <button
                                            onClick={() => handleEdit(note)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            onClick={() => onDelete(note.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NotesList;
