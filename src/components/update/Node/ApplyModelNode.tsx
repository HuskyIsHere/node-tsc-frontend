import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import axios from "axios";
import "../../../assets/Node.css";

const ApplyModelNode = ({ isConnectable, id }: NodeProps) => {

    return(
        <div className="custom-node__input">
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