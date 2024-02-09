import { session } from 'electron';
import React, { useRef, ReactNode }from 'react';
// import { NavBar } from '../components/update/NavBar';
// import { Flow } from '../components/update/Flow'
// import 'react-flow-renderer/dist/style.css';
// import '../assets/Home.css';

export const Visualization: React.FC = () => {

  const nodeId = sessionStorage.getItem("nodeId")

  return (
    <div>
      <p>Welcome to visualization</p>
      <p>nodeId = {nodeId}</p>
    </div>
  );
};
