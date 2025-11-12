# 🧠 Real-Time Collaborative Mind-Map

A web-based application where multiple users can collaboratively create and edit mind maps in real-time. This project is built with a modern web stack and features a persistent database and a real-time communication engine.



---

## ✨ Key Features

* **Real-Time Collaboration:** Changes made by one user are instantly visible to all other users in the same session, powered by Socket.IO.
* **Interactive Canvas:** A fluid, drag-and-drop canvas (using React Flow) to create, connect, move, and edit nodes and edges.
* **Database Persistence:** All mind maps are saved in a MongoDB database, so your work is never lost.
* **Multi-Room Sessions:** Users can create or join unique rooms (e.g., `/map/project-alpha`) to work on different mind maps simultaneously.

---

## 🛠️ Tech Stack

### Frontend
* **React (Vite):** A fast, modern library for building the user interface.
* **React Flow:** A powerful library for building node-based editors and diagrams.
* **Socket.IO Client:** Manages the real-time WebSocket connection to the server.

### Backend
* **Node.js:** A JavaScript runtime for the server.
* **Express.js:** A minimal framework for building the server's API and logic.
* **Socket.IO:** Enables real-time, bi-directional event-based communication.
* **MongoDB (Mongoose):** A NoSQL database used to store all mind map data (nodes and edges).