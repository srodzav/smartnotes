# Smart Notes

This web application helps users organize their thoughts by automatically connecting semantically related notes. It uses natural language processing to analyze note content and visualize relationships between ideas, creating an intelligent knowledge graph.

---

## Features

- **Semantic Analysis**: Automatically detects relationships between notes based on content similarity. 
- **Visual Knowledge Graph**: Visualizes connections between related notes for better understanding. 
- **Simple Note Management**: Create, edit, and delete notes with an intuitive interface.
- **Smart Connections**: The system automatically suggests connections between relevant notes.

## Technologies Used

*React.js*
  - Component-based architecture for a modular UI.
  - React Hooks for state management and side effects
  - Custom components for note creation and visualization

*Node.js & Express*

- RESTful API endpoints for note management
- Middleware for request processing and error handling

*Embeddings*

- Text embeddings for semantic analysis
- Cosine similarity calculations for determining note relationships


# Deployment Instructions

*Development Environment*

  Tested locally with Node.js and React development tools.

1. Clone the repository:
``
git clone https://github.com/srodzav/smartnotes.git
``

2. Install frontend dependencies:
``
npm install
``  

3. Start frontend:
``
npm start
``

4. Start backend:
``
node server.js
`` 

## Usage

  1. Create a new note by typing in the input field and clicking "Save"
  2. The system will automatically analyze your note and establish connections with related notes
  3. View your notes and their connections in the graph visualization
  4. Click on nodes in the graph to view and edit specific notes

![imagen](https://github.com/user-attachments/assets/64d2070c-0003-4fbf-882f-812b65544f8d)

## Notes

  - The application uses local storage for demonstration purposes. For production use, integrate with a proper database system.
  - For optimal results when creating notes, be descriptive and specific to help the semantic analysis establish meaningful connections.

## Author

*Sebastián Rodríguez*
- [LinkedIn](https://www.linkedin.com/in/sebastian-rodriguez-zavala/)
- [Web](https://sebastianrdz.com)
- [Email](mailto:contact@sebastianrdz.com)

---

## License

This project is for personal use and is not licensed for commercial distribution.
