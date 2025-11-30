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

---

## 🎯 Use Cases

This tool is perfect for:

- **Team Brainstorming**: Collaborate with your team in real-time to visualize ideas and workflows
- **Project Planning**: Create project roadmaps, task dependencies, and workflow diagrams together
- **Educational Sessions**: Teachers and students can collaborate on concept maps during online classes
- **Agile Development**: Map out sprint planning, user stories, and system architectures
- **Remote Collaboration**: Work with distributed teams across different time zones
- **Design Thinking**: Facilitate design thinking workshops with interactive mind mapping

---

## 📋 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file and add your MongoDB connection string
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env

# Start the server
npm start
```

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

---

## 🎮 How It Works

1. **Create or Join a Room**: Users can create a new mind map session with a unique room ID or join an existing one
2. **Real-Time Sync**: All changes (node creation, editing, moving, connecting) are instantly synchronized via Socket.IO
3. **Interactive Canvas**: Drag-and-drop interface powered by React Flow for intuitive node manipulation
4. **Persistent Storage**: All mind maps are automatically saved to MongoDB, ensuring no data loss
5. **Multi-User Sessions**: Multiple users can work on the same mind map simultaneously with live cursors

---

## 🗺️ Roadmap

- [ ] Add user authentication and authorization
- [ ] Implement export functionality (PNG, PDF, JSON)
- [ ] Add templates for common use cases
- [ ] Introduce color coding and custom node styling
- [ ] Add commenting and annotation features
- [ ] Implement version history and undo/redo
- [ ] Add mobile responsive design
- [ ] Integrate video chat for remote collaboration

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact & Support

Created by **Sushant Mandolikar**

- **Email**: scmandolikar@gmail.com
- **GitHub**: [@scmandolikar](https://github.com/scmandolikar)
- **LinkedIn**: [Sushant Mandolikar](https://www.linkedin.com/in/sushant-mandolikar-71a519256/)

If you find this project helpful, please give it a ⭐ on GitHub!

---

*Built with ❤️ using React, Node.js, and Socket.IO*
