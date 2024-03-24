import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../assets/Config.css';
import { BrowserWindow, app } from 'electron';

interface ConfigProps {
  data: any; 
}

export const Config: React.FC<ConfigProps> = ({ data }) => {
	let [disableVisualizeButton, setDisableVisualizeButton] = useState(true)
	const [nodeConfig, setNodeConfig] = useState<any[]>([]);
	const [updateData, setUpdateData] = useState<any>();
  const prepOptions = [
    { label: 'TestPrep', value: 'TestPrep' },
    { label: 'TrainPrep', value: 'TrainPrep' }
  ];

	const inputOptions = [
    { label: 'TestInput', value: 'TestInput' },
    { label: 'TrainInput', value: 'TrainInput' }
  ];

	const updateForm = {
		InputNode: {
			"id": "",
			"name": "",
			"kwargs": {
					"source": "",
					"source_type": "arff"
			}
		},
		PrepNode: {
			"id": "",
			"name": "",
			"kwargs": {
					"instructions": []
			}
		},
		DecisionTreeNode: {
			"id": "",
			"name": "DecisionTree",
			"kwargs": {
					"max_depth": 2
			}
		},
		ShapeletTransformNode: {
			"id": "",
			"name": "ShapeletTransform",
			"kwargs": {
					"n_shapelets":5, 
					"window_sizes":[18],
					"sort":true,
					"random_state":0,
					"n_jobs":-1,
					"remove_similar":true
			}
		}
	}

	useEffect(() => {		
    // Initialize node config when data.type changes
    if (data?.type && updateForm[data.type]) {
			console.log(data);
			setUpdateData(data);
      const node = updateForm[data.type];
      setNodeConfig(Object.entries(node.kwargs).map(([key, value]) => ({
        key,
        value
      })));
    }
  }, [data]);

	function updateConfig(): void {
		console.log(updateData);
		
		
		const autoUpdate = async () => {

			try {
					const response = await axios.put(
							"http://127.0.0.1:5000/project/node",
							updateData
					);
					console.log("Update node successful:", response.data);
					if (response.status === 200) {
						setDisableVisualizeButton(true);
					}
			} catch (error) {
					console.error("Error posting data:", error);
			}
			};

			autoUpdate();
	}

	async function handleExecute() {
		try {
			const response = await axios.get('http://127.0.0.1:5000/project/execute');
			console.log('Response:', response.data);
			if (response.status === 200) {
				setDisableVisualizeButton(false);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	async function handleVisualization() {
		console.log("onClick handleVisualization")
		console.log(`selected node ${data?.id} type: ${data?.type}`)
		sessionStorage.setItem("nodeType", data?.type)
		sessionStorage.setItem("nodeId", data?.id)
		window.open('/visualize', '_blank', 'width=200,height=200')
	}

	function renderKwargsInputNode() {
		return(
			<div> 
				<h3>Input Node</h3>
				<select value={updateData?.name} 
				onChange={(e) => {
					const newValue = e.target.value;
					setUpdateData(prevData => ({
							...prevData,
							name: newValue
					}));
				}}>
					<option value="">Select an option</option>
					{inputOptions.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		)
	}

	function renderKwargsPrepNode() {
		return(
		<div className='kwagrs-style'> 
			<h3>Prep Node</h3>
			<select 
				value={updateData?.name} 
				onChange={(e) => {
					const newValue = e.target.value;
					setUpdateData(prevData => ({
							...prevData,
							name: newValue
					}));
				}}>
				<option value="">Select an option</option>
				{prepOptions.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<div className="input-container">
				<label>Set Role:</label>
				<input
					type="text"
					value={updateData?.kwargs?.instructions?.[0]?.[2]}
					onChange={(e) => setUpdateData(prevData => ({ ...prevData, kwargs: { ...prevData.kwargs, instructions: [[prevData.kwargs.instructions[0][0], prevData.kwargs.instructions[0][1], e.target.value], prevData.kwargs.instructions[1]] } }))}
			
				/>
			</div>
			<div className="input-container">
				<label>Change Type:</label>
				<input
					type="text"
					value={updateData?.kwargs?.instructions?.[1]?.[2]}
					onChange={(e) => setUpdateData(prevData => ({ ...prevData, kwargs: { ...prevData.kwargs, instructions: [prevData.kwargs.instructions[0], [prevData.kwargs.instructions[1][0], prevData.kwargs.instructions[1][1], e.target.value]] } }))}
				/>
			</div>
		</div>)
	}

	function renderKwargsApplyModel() {
		return(
		<div> 
			<h3>Apply Model Node</h3>
		</div>)
	}

	function renderKwargsShapeletTransform(){
		return(
			<div className='kwagrs-style'> 
				<h3>Shapelet Transform Node</h3>
				<div className="input-container">
					<label>Numbers of Shapelets:</label>
					<input
						type="number"
						value={updateData?.kwargs?.["n_shapelets"]}
						onChange={(e) => setUpdateData(prevData => ({ ...prevData, kwargs: { ...prevData.kwargs, n_shapelets: parseInt(e.target.value) }}))}
					/>
				</div>
				<div className="input-container">
					<label>Sizes of Window:</label>
					<input
						className='resize'
						type="number"
						value={updateData?.kwargs?.["window_sizes"]?.[0]}
						onChange={(e) => {
								const newValue = e.target.value;
								setUpdateData(prevData => ({
										...prevData,
										kwargs: {
												...prevData.kwargs,
												window_sizes: [
													parseInt(newValue),
													...prevData.kwargs.window_sizes.slice(1)]
										}
								}));
						}}
					/>
					<input
						className='resize'
						type="number"
						value={updateData?.kwargs?.["window_sizes"]?.[1]}
						onChange={(e) => {
								const newValue = e.target.value;
								setUpdateData(prevData => ({
										...prevData,
										kwargs: {
												...prevData.kwargs,
												window_sizes: [
														prevData.kwargs.window_sizes[0], 
														parseInt(newValue),
														...prevData.kwargs.window_sizes.slice(2) 
												]
										}
								}));
						}}
					/>
				</div>
				<div className="input-container">
					<label>Sort:</label>
					<select id="sort-boolean-select" 
					value={updateData?.kwargs?.["sort"]}
					onChange={(e) => {
						const newValue = e.target.value === "true";
						setUpdateData(prevData => ({
								...prevData,
								kwargs: {
									...prevData.kwargs,
									sort: newValue
							}
						}));
					}}>
					<option value="true">True</option>
					<option value="false">False</option>
				</select>

				</div>
				<div className="input-container">
					<label>Numbers of Random State:</label>
					<input 
							type="number" 
							value={updateData?.kwargs?.["random_state"]} 
							onChange={(e) => {
									const newValue = e.target.value;
									setUpdateData(prevData => ({
											...prevData,
											kwargs: {
													...prevData.kwargs,
													random_state: parseInt(newValue) 
											}
									}));
							}}
					/>
				</div>
				<div className="input-container">
					<label>Numbers of Jobs:</label>
					<input 
							type="number" 
							value={updateData?.kwargs?.["n_jobs"]} 
							onChange={(e) => {
									const newValue = e.target.value;
									setUpdateData(prevData => ({
											...prevData,
											kwargs: {
													...prevData.kwargs,
													n_jobs: parseInt(newValue) 
											}
									}));
							}}
							min="-Infinity"
					/>
				</div>
				<div className="input-container">
					<label>Remove the Similar:</label>
					<select 
						id="sort-boolean-select"
						value={updateData?.kwargs?.["remove_similar"]}
						onChange={(e) => {
								const newValue = e.target.value === "true";
								setUpdateData(prevData => ({
										...prevData,
										kwargs: {
												...prevData.kwargs,
												remove_similar: newValue
										}
								}));
						}}
					>
						<option value="true">True</option>
						<option value="false">False</option>
					</select>
				</div>
			</div>)
	}

	function renderKwargsDecisionTree(){
		return(
			<div className='kwagrs-style'> 
				<h3>Decision Tree Node</h3>
				<div className="input-container">
					<label>Numbers of Max Depths:</label>
					<input
						type="number"
						value={updateData?.kwargs?.["max_depth"]}
						onChange={(e) => {
							const newValue = e.target.value;
							setUpdateData(prevData => ({
									...prevData,
									kwargs: {
											...prevData.kwargs,
											max_depth: parseInt(newValue) 
									}
							}));
					}}
					/>
				</div>
			</div>
		)
	}

	function renderKwargs() {
		return (
			<div className='kwargs-box'>
					{data?.type === "PrepNode" ? (
							<div> 
								{renderKwargsPrepNode()}
							</div>
					) : data?.type === "InputNode" ? (
							<div> 
								{renderKwargsInputNode()}
							</div>
					) : data?.type === "ApplyModelNode" ? (
						<div> 
							{renderKwargsApplyModel()}
						</div>
					) : data?.type === "ShapeletTransformNode" ? (
						<div> 
							{renderKwargsShapeletTransform()}
						</div>
					) : data?.type === "DecisionTreeNode" ? (
						<div> 
							{renderKwargsDecisionTree()}
						</div>
					) : (
						<h3>Please Select Node</h3>
					)}
			</div>
		);
	}

	return (
    <div className='panel'>
			{updateData && renderKwargs()}
			<button onClick={updateConfig}>Update</button>
			<button onClick={handleExecute}>Execute</button>
			{!disableVisualizeButton && (
				<button onClick={handleVisualization}>Visualize</button>
			)}
    </div>
  );
};
