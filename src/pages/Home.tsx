import React, { useRef, ReactNode}from 'react';
import { NavBar } from '../components/update/NavBar';
import { Flow } from '../components/update/Flow'
import 'react-flow-renderer/dist/style.css';
import '../assets/Home.css';

export const Home: React.FC = () => {

  return (
    <div>
      <NavBar />
      <div className="home">
        <div className="row">
          <div className="column2">
            <Flow/>
          </div>
          {/* <div className="column3">
            <Config/>
          </div> */}
        </div>
      </div>
    </div>
  );
};
