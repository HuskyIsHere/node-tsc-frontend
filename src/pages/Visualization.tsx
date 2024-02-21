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

  // const fetchInfo = (nodeId) => {
  //   axios.get(
  //     "http://127.0.0.1:5000/project/node",
  //     {params: {nodeId: nodeId}}
  //   ).then((response) => setNodeInfo(response.data));
  // }

  // const fetchVisualize = (nodeId) => {
  //   axios.get(
  //     "http://127.0.0.1:5000/visualize/data",
  //     {params: {nodeId: nodeId}}
  //   ).then((response) => setVisualze(response.data))
  // }

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

  // useEffect(() => {
  //   if (!isMount) {
  //     fetchInfo(nodeId)
  //     fetchVisualize(nodeId)
  //     console.log("items", nodeInfo)
  //   }
  // }, [nodeInfo]);

  // useEffect(() => {
  //   setIsMount(true)
  // }, [isMount])

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
