import React, { DragEvent } from 'react';
import "../../assets/SideBar.css"

const DndPanel: React.FC = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'InputFileNode')} draggable>
        InputFile Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'InputNode')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'PrepNode')} draggable>
        Prep Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'ApplyModelNode')} draggable>
        Apply Model Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'ApplyTransformerNode')} draggable>
        Apply Transformer Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'ShapeletTransformNode')} draggable>
        Shapelet Transform Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'DecisionTreeNode')} draggable>
        Decision Tree Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'KnnNode')} draggable>
        KNN Node
      </div>
    </aside>
  );
};

export default DndPanel;
