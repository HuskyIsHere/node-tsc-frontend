import ShapeletVisualize from '@/components/update/Visualize/ShapeletVisualize';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Visualization: React.FC = () => {

  const nodeId = "a819ba13-d37e-47c8-a520-f66123c7afb9"

  const [nodeInfo, setNodeInfo] = useState(null)
  const [nodeVisualize, setVisualze] = useState(null)
  const [isMount, setIsMount] = useState(false)

  const fetchInfo = (nodeId) => {
    axios.get(
      "http://127.0.0.1:5000/project/node",
      {params: {nodeId: nodeId}}
    ).then((response) => setNodeInfo(response.data));
  }

  const fetchVisualize = (nodeId) => {
    axios.get(
      "http://127.0.0.1:5000/visualize/data",
      {params: {nodeId: nodeId}}
    ).then((response) => setVisualze(response.data))
  }

  useEffect(() => {
    if (!isMount) {
      fetchInfo(nodeId)
      fetchVisualize(nodeId)
      console.log("items", nodeInfo)
    }
  }, [nodeInfo]);

  useEffect(() => {
    setIsMount(true)
  , [isMount]})

  // const nodeId = sessionStorage.getItem("nodeId")

  // TODO: chage to dynamic node id

  // TODO: change this to axios request/respond

  return (
    <div>
      <p>Welcome to visualization</p>
      <p>nodeId = {nodeId}</p>
      {nodeInfo && <p>nodeType = {nodeInfo["type"]}</p>}
      {nodeVisualize && nodeInfo["type"] == "ShapeletTransformNode" && <ShapeletVisualize nodeVisualize={nodeVisualize}/>}
    </div>
  );
};
