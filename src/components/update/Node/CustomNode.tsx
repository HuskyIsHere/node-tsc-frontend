import { memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";

const CustomNode = ({
  data,
  isConnectable,
}: NodeProps) => {

  const handleClick = () => {
    console.log('Button Clicked!');
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      {data?.label}
    </>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
