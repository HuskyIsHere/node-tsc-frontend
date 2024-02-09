import { memo, useEffect, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import axios from "axios";
import "../../../assets/Node.css";

const InputNode = ({ isConnectable, id, data }: NodeProps) => {
  useEffect(() => {
    const autoPost = async () => {
      const postData = {
        "node-type": "INPUT",
        "id": id,
        "name": "TrainInput",
        "kwargs": {
          "source": "/home/natch/final/node-tsc/temp_data/GunPoint_TRAIN.arff",
          "source_type": "arff",
        },
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/project/node",
          postData
        );
        console.log("Post node successful:", response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    if (data.action === false) {
      data.action = true;
      autoPost();
  }
  }, [id, data, isConnectable]);

  let choice = [
                {
                  label: 'Train Input',
                  nodeType: 'INPUT',
                  name: 'TrainInput'
                },
                {
                  label: 'Test Input',
                  nodeType: 'INPUT',
                  name: 'TestInput'
                },]

  return (
    <div className="custom-node__input">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
        <div className="custom-node__header">
          Input Node
        </div>
        {/* <div className="custom-node__select">
          <select id="selectOption">
            {choice.map((option, index) => (
              <option key={index} value={option.name}>
                {option.label}
              </option>
            ))}`
          </select>
        </div> */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(InputNode);
