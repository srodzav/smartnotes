import React, { useState } from "react";

function NoteInput({ onSave, initialContent = "", noteId = null }) {
    const [content, setContent] = useState(initialContent);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            if (noteId) {
                onSave(noteId, content);
            } else {
                onSave(content);
            }
            if (!noteId) setContent(""); // Clear only for new notes
        }
    };

    return (
        <div className="note-input">
            {noteId ? "" : <h2> Save Note </h2>}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="  Write your thoughts here..."
                    rows="4"
                />
                <div className="text-align-right">
                    <button type="submit">
                        {noteId ? (
                            <i className="bi bi-pencil"></i>
                        ) : (
                            <i className="bi bi-floppy2-fill"></i>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoteInput;
