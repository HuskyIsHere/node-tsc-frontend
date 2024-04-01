import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { dialog } from 'electron';
import axios from "axios";
import "../../../assets/Node.css";

const InputFileNode = ({ isConnectable, id }: NodeProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("TrainInput");

  const handleOpenDialog = async () => {
    try {
      const result = await window.electron.dialog.showOpenDialog(/* Add dialog options if needed */);
      console.log("Selected files:", result.filePaths);
      localStorage.setItem(selectedOption, result.filePaths)
    } catch (error) {
      console.error("Error opening dialog:", error);
    }
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div id={`input-${id}`} className="custom-node__file">
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="TrainInput">TrainInput</option>
        <option value="TestInput">TestInput</option>
      </select>
      <button onClick={handleOpenDialog}>Choose File</button>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(InputFileNode);
