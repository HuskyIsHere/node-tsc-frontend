import { memo, useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import axios from "axios";
import "../../../assets/Node.css";

const TestInputNode = ({ isConnectable, id, data }: NodeProps) => {
  useEffect(() => {
    const autoPost = async () => {
      const postData = {
        "node-type": "INPUT",
        id: id,
        name: "TestInput",
        kwargs: {
          source: data.source,
          source_type: "arff",
        },
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/project/node",
          postData
        );
        console.log("Post successful:", response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    if (data.action === false) {
      data.action = true;
      autoPost();
    }
  }, [id, data, isConnectable]);

  return (
    <div className="custom-node__input">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <p>TestInput Node</p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(TestInputNode);
