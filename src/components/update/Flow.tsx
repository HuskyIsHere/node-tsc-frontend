import React, { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
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
} from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";
import Sidebar from "../update/SideBar";
import "../../assets/Flow.css";
import { Config } from "@/components/update/Config";
import InputFileNode from "./Node/InputFileNode";
import InputNode from "./Node/InputNode";
import PrepNode from "./Node/PrepNode";
import ApplyModelNode from "./Node/ApplyModelNode";
import ApplyTransformerNode from "./Node/ApplyTransformerNode";
import ShapeletTransformNode from "./Node/ShapeletTransformNode";
import DecisionTreeNode from "./Node/DecisionTreeNode";
import KnnNode from "./Node/KnnNode";

const nodeTypes = {
  InputFileNode: InputFileNode,
  InputNode: InputNode,
  PrepNode: PrepNode,
  ApplyModelNode: ApplyModelNode,
  ApplyTransformerNode: ApplyTransformerNode,
  ShapeletTransformNode: ShapeletTransformNode,
  DecisionTreeNode: DecisionTreeNode,
  KnnNode: KnnNode,
};

export const Flow: React.FC = () => {
  // localStorage.setItem("TrainInput", "/Users/ditthaponglakagul/Desktop/END/Vite/GunPoint_TRAIN.arff");
  // localStorage.setItem("TestInput", "/Users/ditthaponglakagul/Desktop/END/Vite/GunPoint_TEST.arff");
  let id = 0;
  const getId = () => uuidv4();
  const [numberNode, setNumberNode] = useState(0);
  const [numberEdge, setNumberEdge] = useState(0);

  const [selectedNode, setSelectedNode] = useState();

  const initialNodes: Node[] = [];

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    any,
    any
  > | null>(null);
  const reactFlowWrapper = useRef(null);

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type || !reactFlowInstance) {
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
        data: { label: `${type} node`, action: false },
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  function postEdges(): void {
    const autoPost = async () => {
      const last = edges[edges.length - 1];
      const postData = {
        source: last.source,
        dest: last.target,
        "port-type": "DATA",
      };

      nodes.forEach((node) => {
        if (node.id == last.target && node.type == "ApplyModelNode") {
          nodes.forEach((sourceNode) => {
            if (
              sourceNode.id == last.source &&
              sourceNode.type == "ShapeletTransformNode"
            ) {
              postData["port-type"] = "MODEL";
            } else if (
              sourceNode.id == last.source &&
              sourceNode.type == "DecisionTreeNode"
            ) {
              postData["port-type"] = "MODEL";
            } else if (
              sourceNode.id == last.source &&
              sourceNode.type == "KnnNode"
            ) {
              postData["port-type"] = "MODEL";
            }
          });
        }
      });

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/project/edge",
          postData
        );
        console.log("Post edge successful:", response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    autoPost();
  }

  function onNodeRemove(node): void {
    const autoDelete = async (id) => {
      const deleteData = {
        id: id,
      };
      try {
        const response = await axios.delete(
          "http://127.0.0.1:5000/project/node",
          { data: deleteData }
        );
        console.log("Get data successful:", response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
      console.log(node[0].id);
    };
    autoDelete(node[0].id);
  }

  function onEdgeRemove(edge): void {
    console.log(edge);
    const autoDelete = async (source, dest) => {
      const deleteData = {
        source: source,
        dest: dest,
        "port-type": "DATA",
      };
      try {
        const response = await axios.delete(
          "http://127.0.0.1:5000/project/edge",
          { data: deleteData }
        );
        console.log("Get data successful:", response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };
    autoDelete(edge[0].source, edge[0].target);
  }

  useEffect(() => {
    if (numberEdge < edges.length) {
      postEdges();
    }

    setNumberEdge(edges.length);
    setNumberNode(nodes.length);
  }, [nodes, edges]);

  async function getNodeInfo(nodeId) {
    try {
      const response = await axios.get("http://127.0.0.1:5000/project/node", {
        params: { nodeId },
      });
      console.log("Get Node Info Successful:", response.data);
      setSelectedNode(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  function handleOnNodeClick(event, node): void {
    setSelectedNodeId(node.id);
    if(node.type != "InputFileNode"){
      getNodeInfo(node.id);
    }
  }

  useEffect(() => {
    nodes.forEach((node) => {
      const customNodeInput = document.querySelector(`#input-${node.id}`);
      if (!customNodeInput) return; // Skip if element not found
  
      if (node.id === selectedNodeId) {
        customNodeInput.style.backgroundColor = "#808080";
      } else {
        customNodeInput.style.backgroundColor = "#FFFFFF";
      }
    });
  }, [selectedNodeId, nodes]);

  return (
    <>
      <ReactFlowProvider>
        <div className="dndflow">
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <div className="half-width">
              <Sidebar />
            </div>
            <ReactFlow
              onNodeClick={handleOnNodeClick}
              onNodesDelete={onNodeRemove}
              onEdgesDelete={onEdgeRemove}
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
