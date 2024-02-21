import { memo, useState, useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import axios from "axios";
import "../../../assets/Node.css";

const DecisionTreeNode = ({ isConnectable, id, data }: NodeProps) => {
    const postData = {
        "node-type": "DECISION_TREE",
        "id": id,
        "name": "DecisionTree",
        "kwargs": {
            "max_depth": 2
        }
    };

    useEffect(() => {
        const autoPost = async () => {
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
    }, [id]);

    function showParameter(): void {

    }

    return (
        <div className="custom-node__input" onClick={showParameter}>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>
            <div>
                <p>Decision Tree Node</p>
            </div>
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable}/>
        </div>
    );
};

export default memo(DecisionTreeNode);
