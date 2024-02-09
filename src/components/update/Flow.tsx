import React, { useState, useEffect, useRef, useCallback } from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
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
import { Config } from '@/components/update/Config';
import InputFileNode from './Node/InputFileNode';
import InputNode from './Node/InputNode';
import PrepNode from './Node/PrepNode';
import ApplyModelNode from './Node/ApplyModelNode';
import ShapeletTransformNode from './Node/ShapeletTransformNode';
import DecisionTreeNode from './Node/DecisionTreeNode';

const nodeTypes = {
  InputFileNode: InputFileNode,
  InputNode: InputNode,
  PrepNode: PrepNode,
  ApplyModelNode: ApplyModelNode,
  ShapeletTransformNode: ShapeletTransformNode,
  DecisionTreeNode: DecisionTreeNode
};

export const Flow: React.FC = () => {

  let id = 0;
  const getId = () => uuidv4();
  const [numberNode, setNumberNode] =  useState(0);
  const [numberEdge, setNumberEdge] =  useState(0);

  const [selectedNode, setSelectedNode] = useState();

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
        data: {label: `${type} node`, action: false},
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
      
    },
    [reactFlowInstance]
  );

  function postEdges(): void{
    const autoPost = async () => {

      const last = edges[edges.length - 1];
      const postData = {
        "source": last.source,
        "dest": last.target,
        "port-type": "DATA"
      };

      nodes.forEach(node => {
        if(node.id == last.source && node.type == "ShapeletTransformNode"){
          postData['port-type'] = "MODEL"
        }
      })

      try {
        const response = await axios.post('http://127.0.0.1:5000/project/edge', postData);
        console.log('Post edge successful:', response.data);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
    autoPost();
  }

  function getNodeEdge(nodes, edges): void{
    const autoGet = async () =>{
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/project/info"
        );
        console.log("Get data successful:", response.data['nodes']);
        deleteNode(nodes, response)
        deleteEdge(edges, response)
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    autoGet();
  }

  function deleteNode(nodes, response): void{
    const autoDelete = async (id) =>{
      const deleteData = {
        "id": id
      };
      try {
        const response = await axios.delete("http://127.0.0.1:5000/project/node", {data: deleteData});
        console.log("Get data successful:", response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }

    let nodesList = []
    for(let j = 0; j < nodes.length; j++){
      nodesList[j] = nodes[j]["id"]
    }
    for(let i = 0; i < response.data['nodes'].length; i++){
      if(!nodesList.includes(response.data['nodes'][i]["id"].toString())){
        let toDeleteNode = response.data['nodes'][i]["id"].toString()
        autoDelete(toDeleteNode)
      }
    }
  }

  function deleteEdge(edges, response): void{
    console.log("delete edges", edges);
    const autoDelete = async (source, dest) =>{
      const deleteData = {
          "source": source,
          "dest": dest,
          "port-type": "DATA"
      };
      try {
        const response = await axios.delete("http://127.0.0.1:5000/project/edge", {data: deleteData});
        console.log("Get data successful:", response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }

      let edgeList = []
      for(let j = 0; j < edges.length; j++){
        edgeList[0] = edges[j]["source"]
        edgeList[1] = edges[j]["dest"]
      }

      for(let i = 0; i < response.data['edges'].length; i++){
        console.log(response.data['edges'][i]["source"]);
        console.log(response.data['edges'][i]["dest"]);
        
        if(!edgeList[0].includes(response.data['edges'][i]["source"]) && !edgeList[1].includes(response.data['edges'][i]["dest"])){
          let source = response.data['edges'][i]["source"];
          let dest = response.data['edges'][i]["dest"];        
          autoDelete(source, dest);
        }
      }

    }
  }

  useEffect(() => {    
    if (numberEdge < edges.length){
      postEdges();
    }

    if(numberNode > nodes.length || numberEdge > edges.length){
      getNodeEdge(nodes, edges);
    }
    setNumberEdge(edges.length)
    setNumberNode(nodes.length)
  }, [nodes, edges]);

  function handleOnNodeClick(event, node) : void {
    setSelectedNode(node)
  }

  return(
    <>
    <ReactFlowProvider>
    <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <div className='half-width'>
          <Sidebar />
        </div>
          <ReactFlow
            onNodeClick={handleOnNodeClick}
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
    <Config data={selectedNode} />
    </>
  );
};
