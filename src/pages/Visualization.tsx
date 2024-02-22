import ExplorationVisualize from '@/components/update/Visualize/ExplorationVisualize';
import ShapeletVisualize from '@/components/update/Visualize/ShapeletVisualize';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Visualization: React.FC = () => {

  const nodeId = sessionStorage.getItem("nodeId")

  const [nodeInfo, setNodeInfo] = useState(null)
  const [nodeVisualize, setNodeVisualize] = useState(null)
  const [isMount, setIsMount] = useState(false)

  const autoGetNodeInfo = async (nodeId) => {
    try {
        const response = await axios.get(
            "http://127.0.0.1:5000/project/node",
            {params: {nodeId: nodeId}}
        );
        console.log("Get node info successful:", response.data);
        setNodeInfo(response.data)
    } catch (error) {
        console.error("Error Get node info data:", error);
    }
  };

  const autoGetNodeVisualize = async (nodeId) => {
    try {
        const response = await axios.get(
            "http://127.0.0.1:5000/visualize/data",
            {params: {nodeId: nodeId}}
        );
        console.log("Get node Visualize successful:", response.data);
        setNodeVisualize(response.data)
    } catch (error) {
        console.error("Error Get node Visualize data:", error);
    }
  };

  useEffect(() => {
    console.log(nodeId);
    if (!isMount) {
      setIsMount(true)
      autoGetNodeInfo(nodeId)
      autoGetNodeVisualize(nodeId)
    }
  }, [nodeId])

  useEffect(() => {

  }, [])

  return (
    <div>
      <p>Welcome to visualization</p>
      <p>nodeId = {nodeId}</p>
      {nodeInfo && <p>nodeType = {nodeInfo["type"]}</p>}
      {nodeVisualize && nodeInfo["type"] == "ShapeletTransformNode" && <ShapeletVisualize nodeVisualize={nodeVisualize}/>}
      {nodeVisualize && (nodeInfo["type"] == "InputNode" || nodeInfo["type"] == "PrepNode") && <ExplorationVisualize nodeVisualize={nodeVisualize}/>}
    </div>
  );
};
