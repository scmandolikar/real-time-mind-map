import React, { useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactFlow, {
  Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');
let nodeId = 1;

function MapPage() {
  const { mapId } = useParams();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    socket.emit('join-map', mapId);

    socket.on('initial-map', ({ nodes, edges }) => {
      setNodes(nodes || []);
      setEdges(edges || []);
      if (nodes && nodes.length > 0) {
        nodeId = nodes.reduce((maxId, node) => Math.max(parseInt(node.id, 10), maxId), 0) + 1;
      } else {
        nodeId = 1;
      }
    });

    socket.on('node-added', (newNode) => setNodes((nds) => [...nds, newNode]));
    socket.on('edge-added', (newEdge) => setEdges((eds) => addEdge(newEdge, eds)));
    socket.on('node-moved', ({ id, position }) => {
      setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, position } : node)));
    });
    socket.on('node-label-updated', ({ nodeId, label }) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, label } } : node))
      );
    });
    socket.on('elements-deleted', ({ nodeIds, edgeIds }) => {
      setNodes((nds) => nds.filter((n) => !nodeIds.includes(n.id)));
      setEdges((eds) => eds.filter((e) => !edgeIds.includes(e.id)));
    });

    return () => {
      socket.off('initial-map');
      socket.off('node-added');
      socket.off('edge-added');
      socket.off('node-moved');
      socket.off('node-label-updated');
      socket.off('elements-deleted');
    };
  }, [mapId]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
    const posChange = changes.find((c) => c.type === 'position' && !c.dragging);
    if (posChange) {
      const node = nodes.find((n) => n.id === posChange.id);
      if (node) socket.emit('node-move', { mapId, id: node.id, position: node.position });
    }
  }, [nodes, mapId]);

  const onEdgesChange = useCallback((c) => setEdges((eds) => applyEdgeChanges(c, eds)), []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
    socket.emit('add-edge', { mapId, edge: params });
  }, [mapId]);

  const addNode = () => {
    const newNode = { id: `${nodeId++}`, position: { x: 100, y: 100 }, data: { label: `Node ${nodeId - 1}` } };
    setNodes((nds) => [...nds, newNode]);
    socket.emit('add-node', { mapId, node: newNode });
  };

  const onNodeDoubleClick = useCallback((event, node) => {
    const label = prompt('Enter new node label:', node.data.label);
    if (label !== null && label.trim() !== '') {
      setNodes((nds) =>
        nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label } } : n))
      );
      socket.emit('update-node-label', { mapId, nodeId: node.id, label });
    }
  }, [mapId, nodes]);

  const onNodesDelete = useCallback((deletedNodes) => {
    const nodeIds = deletedNodes.map(n => n.id);
    socket.emit('delete-elements', { mapId, nodeIds, edgeIds: [] });
  }, [mapId]);

  const onEdgesDelete = useCallback((deletedEdges) => {
    const edgeIds = deletedEdges.map(e => e.id);
    socket.emit('delete-elements', { mapId, nodeIds: [], edgeIds });
  }, [mapId]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Link to="/" style={{ position: 'absolute', zIndex: 10, top: 10, right: 10, background: 'white', padding: '0.5rem', borderRadius: '8px', textDecoration: 'none' }}>
        ← Back to Home
      </Link>
      <button onClick={addNode} style={{ position: 'absolute', zIndex: 10, top: 10, left: 10 }}>
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default MapPage;