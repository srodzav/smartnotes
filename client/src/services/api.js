const API_URL = "http://localhost:5000/api";

export const getNotes = async () => {
    try {
        const response = await fetch(`${API_URL}/notes`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error en getNotes:", error);
        throw error;
    }
};

export const createNote = async (noteData) => {
    try {
        const response = await fetch(`${API_URL}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noteData),
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error en createNote:", error);
        throw error;
    }
};

export const updateNote = async (id, noteData) => {
    try {
        const response = await fetch(`${API_URL}/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noteData),
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error en updateNote:", error);
        throw error;
    }
};

export const deleteNote = async (id) => {
    try {
        const response = await fetch(`${API_URL}/notes/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error en deleteNote:", error);
        throw error;
    }
};
