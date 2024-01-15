import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  ReactFlowInstance,
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
} from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import Sidebar from '../update/SideBar';
import '../../assets/Flow.css';
import InputFileNode from './Node/InputFileNode';
import TrainInputNode from './Node/TrainInputNode';
import CustomNode from './Node/CustomNode';
import TestInputNode from './Node/TestInputNode'
import TrainPrepNode from './Node/TrainPrepNode';

const nodeTypes = {
  InputFileNode: InputFileNode,
  TrainInputNode: TrainInputNode,
  TestInputNode: TestInputNode,
  TrainPrepNode: TrainPrepNode
};

export const Flow: React.FC = () => {

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const initialNodes: Node[] = [];

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any> | null>(null);
  const reactFlowWrapper = useRef(null);

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(

    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return;
      }

      const { x, y } = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position: { x, y },
        data: {label: `${type} node`, action: false, source: "TO ADD SOURCE"},
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // console.log(nodes);
  // console.log(edges)


  return(
    <ReactFlowProvider>
    <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <div className='half-width'>
          <Sidebar />
        </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
    </div>
    </ReactFlowProvider>
  );
};
