import React, { DragEvent } from 'react';

const DndPanel: React.FC = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Input')} draggable>
        InputFile Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'TrainInput')} draggable>
        TrainInput Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'TestInput')} draggable>
        TestInput Node
      </div>
    </aside>
  );
};

export default DndPanel;
