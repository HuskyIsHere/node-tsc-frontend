import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../assets/Config.css';

interface ConfigProps {
  data: any; 
}

export const Config: React.FC<ConfigProps> = ({ data }) => {
	const [nodeConfig, setNodeConfig] = useState<any[]>([]);
	const [selectedName, setSelectedName] = useState<string>('');

  const prepOptions = [
    { label: 'TestPrep', value: 'TestPrep' },
    { label: 'TrainPrep', value: 'TrainPrep' }
  ];

	const inputOptions = [
    { label: 'TestInput', value: 'TestInput' },
    { label: 'TrainInput', value: 'TrainInput' }
  ];


	let trainChoice = [
		{
			label: 'Train Prep',
			nodeType: 'PREP',
			name: 'TrainPrep'
		},
		{
			label: 'Test Prep',
			nodeType: 'PREP',
			name: 'TestPrep'
		},
	]

	let prepChoice = [
		{
		label: 'Train Prep',
		nodeType: 'PREP',
		name: 'TrainPrep'
		},{
		label: 'Test Prep',
		nodeType: 'PREP',
		name: 'TestPrep'
		},]

	const updateForm = {
		InputNode: {
			"id": "",
			"name": "",
			"kwargs": {
					"source": "/home/natch/final/node-tsc/temp_data/GunPoint_TRAIN.arff",
					"source_type": "arff"
			}
		},
		PrepNode: {
			"id": "",
			"name": "",
			"kwargs": {
					"instructions": [
							["set_role", "target", "target"],
							["change_type", "target", "int"]
					]
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
    console.log(data);
    // Initialize node config when data.type changes
    if (data?.type && updateForm[data.type]) {
      const node = updateForm[data.type];
      setNodeConfig(Object.entries(node.kwargs).map(([key, value]) => ({
        key,
        value
      })));
    }
  }, [data]);

  // Handler for updating kwargs value
  const handleKwargsChange = (index: number, value: string) => {
    setNodeConfig(prevConfig => {
      const newConfig = [...prevConfig];
      newConfig[index].value = value;
      return newConfig;
    });
  };

  // Render the kwargs of the selected node type
  const renderKwargs = () => {
    const selectedNode = updateForm[data?.type];
    if (selectedNode) {
      return (
        <div>
          {nodeConfig.map((configItem, index) => (
            <div key={index}>
              <label>{configItem.key}:</label>
              <input
                type="text"
                value={configItem.value}
                onChange={(e) => handleKwargsChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
	
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(event.target.value);		
  };

	function updateConfig(): void {
		const postData = updateForm[data?.type]
		if (data?.type == "PrepNode") {
			postData["name"] = selectedName
			postData["id"] = data?.id
			postData["kwargs"]["instructions"] = nodeConfig;
		} else if (data?.type == "InputNode"){
			postData["name"] = selectedName
			postData["id"] = data?.id
		} else {
			postData["id"] = data?.id
			postData["kwargs"] = nodeConfig
		}

		console.log(postData);
		
		
		const autoUpdate = async () => {

			try {
					const response = await axios.put(
							"http://127.0.0.1:5000/project/node",
							postData
					);
					console.log("Update node successful:", response.data);
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
		} catch (error) {
			console.error('Error:', error);
	}

	}

	return (
    <div className='panel'>
			{data?.type == "PrepNode" ? (
				<div>
				<select value={selectedName} onChange={handleSelectChange}>
					<option value="">Select an option</option>
					{prepOptions.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			): data?.type == "InputNode" ? (
			<div>
				<select value={selectedName} onChange={handleSelectChange}>
					<option value="">Select an option</option>
					{inputOptions.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			) : (<></>)}
      {renderKwargs()}
			<button onClick={updateConfig}>Update</button>
			<button onClick={handleExecute}>Execute</button>
    </div>
  );
};
