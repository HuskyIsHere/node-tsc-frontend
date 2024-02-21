import { memo, useState, useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import axios from "axios";
import "../../../assets/Node.css";

const ApplyModelNode = ({ isConnectable, id, data }: NodeProps) => {

    const postData = {
        "node-type": "APPLY",
        "id": id,
        "name": "ApplyModel (DT)",
        "kwargs": {

        },
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

    function showParameter(): void{
        sessionStorage.setItem('form', JSON.stringify(postData));
    }

    return(
        <div className="custom-node__input" onClick={showParameter}>
            <Handle type="target" position={Position.Top} id="input1" style={{ right: 35, left: 'auto' }} isConnectable={isConnectable} />
            <Handle type="target" position={Position.Top} id="input2" style={{ left: 40 }} isConnectable={isConnectable} />
            <div>
                <p>Apply Model</p>
            </div>
            <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            />
        </div>
    );

};

export default memo(ApplyModelNode);