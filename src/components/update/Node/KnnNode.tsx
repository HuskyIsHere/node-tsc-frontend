import { memo, useState, useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import axios from "axios";
import "../../../assets/Node.css";

const KnnNode = ({ isConnectable, id, data }: NodeProps) => {
    const [postData, setPostData] = useState({
        "node-type": "KNN",
        "id": id,
        "name": "Knn",
        "kwargs": {
            "n_neighbors": 5
        }
    });

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
    }, [id, postData, data]);

    function showParameter(): void {

    }


    return (
        <div className="custom-node__input" onClick={showParameter}>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>
            <div className="handler-label">
                <p>DATA</p>
            </div>
            <div>
                <p>K-Nearest Neighbors Node</p>
            </div>
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable}/>
            <div className="handler-label">
                <p>MODEL</p>
            </div>
        </div>
    );
};

export default memo(KnnNode);