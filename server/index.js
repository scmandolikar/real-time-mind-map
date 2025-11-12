const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');

// --- 1. CONFIGURATION ---
const DB_CONNECTION_STRING = "mongodb+srv://sakshathcm23hit_db_user:bXO4Hxkvx8w76Pcj@mindmap-cluster.45xq93f.mongodb.net/?retryWrites=true&w=majority&appName=mindmap-cluster";
const PORT = 4000;

// --- 2. INITIALIZATION ---
mongoose.connect(DB_CONNECTION_STRING)
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

const mindMapSchema = new mongoose.Schema({
  _id: String, // mapId
  nodes: [mongoose.Schema.Types.Mixed],
  edges: [mongoose.Schema.Types.Mixed],
});
const MindMap = mongoose.model('MindMap', mindMapSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

// --- 3. REAL-TIME SOCKET.IO LOGIC ---
io.on('connection', (socket) => {
  socket.on('join-map', async (mapId) => {
    socket.join(mapId);
    try {
      const map = await MindMap.findById(mapId);
      socket.emit('initial-map', map ? { nodes: map.nodes, edges: map.edges } : { nodes: [], edges: [] });
    } catch (err) {
      console.error("Error loading map:", err);
    }
  });

  socket.on('add-node', async ({ mapId, node }) => {
    socket.to(mapId).emit('node-added', node);
    await MindMap.updateOne({ _id: mapId }, { $push: { nodes: node } }, { upsert: true });
  });

  socket.on('add-edge', async ({ mapId, edge }) => {
    socket.to(mapId).emit('edge-added', edge);
    await MindMap.updateOne({ _id: mapId }, { $push: { edges: edge } }, { upsert: true });
  });

  socket.on('node-move', async ({ mapId, id, position }) => {
    socket.to(mapId).emit('node-moved', { id, position });
    await MindMap.updateOne({ _id: mapId, 'nodes.id': id }, { $set: { 'nodes.$.position': position } });
  });

  socket.on('update-node-label', async ({ mapId, nodeId, label }) => {
    socket.to(mapId).emit('node-label-updated', { nodeId, label });
    await MindMap.updateOne({ _id: mapId, 'nodes.id': nodeId }, { $set: { 'nodes.$.data.label': label } });
  });

  socket.on('delete-elements', async ({ mapId, nodeIds, edgeIds }) => {
    socket.to(mapId).emit('elements-deleted', { nodeIds, edgeIds });
    await MindMap.updateOne({ _id: mapId }, { $pull: { nodes: { id: { $in: nodeIds } }, edges: { id: { $in: edgeIds } } } });
  });

  socket.on('disconnect', () => { /* User disconnected */ });
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));