import { memo, useState, useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import axios from "axios";
import "../../../assets/Node.css";

const ShapeletTransformNode = ({ isConnectable, id, data }: NodeProps) => {
    const postData = {
        "node-type": "SHAPELET_TRANSFORM",
        "id": id,
        "name": "ShapeletTransform",
        "kwargs": {
            "n_shapelets":5, 
            "window_sizes":[18, 24],
            "sort":true,
            "random_state":0,
            "n_jobs":-1,
            "remove_similar":true
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
    }, [id, data, isConnectable]);


    return(
        <div className="custom-node__input">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>
            <div className="handler-label">
                <p>DATA</p>
            </div>
            <div>
                <p>Shapelet Transform Node</p>
            </div>
            <div className="handler-label">
                <p>MODEL / DATA</p>
            </div>
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable}/>
        </div>
    )
};

export default memo(ShapeletTransformNode);