import React from "react";
import { useDrag } from "react-dnd";
import '../../assets/Node.css';

interface NodeBlockProps {
  id?: number;
  name: string;
  inColumn2?: boolean;
  onDelete?: () => void;
}

export const NodeBlock: React.FC<NodeBlockProps> = ({ id, name, inColumn2, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "string",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="box" ref={drag}>
      {id && <p>ID: {id}</p>}
      <p>Name: {name}</p>
      {inColumn2 && onDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};
