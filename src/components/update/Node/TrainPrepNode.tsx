import { memo, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import axios from 'axios';
import '../../../assets/Node.css';

const TrainPrepNode = ({ isConnectable, id, data }: NodeProps) => {
    useEffect(() => {
        const autoPost = async () => {
            const postData = {
                "node-type": "PREP",
                "id": id,
                "name": "TrainPrep",
                "kwargs": {
                    "instructions": [
                        ["set_role", "target", "target"],
                        ["change_type", "target", "int"]
                    ]
                },
            };

            try {
                const response = await axios.post('http://127.0.0.1:5000/project/node', postData);
                console.log('Post successful:', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        };

        if (data.action === false) {
            data.action = true;
            autoPost();
        }
    }, [id, data, isConnectable]);

    return (
        <div className="custom-node__input">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div>
                <p>TrainPrep Node</p>
            </div>
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </div>
    );
};

export default memo(TrainPrepNode);
