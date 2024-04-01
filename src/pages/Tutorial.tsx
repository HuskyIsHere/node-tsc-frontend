import React, { useState, useEffect } from 'react';
import "../assets/Tutorial.css";
import overview1 from '../assets/img/overview1.png';
import inputFileNode from '../assets/img/node/InputFileNode.png'
import inputNode from '../assets/img/node/InputNode.png'
import inputNodeConfig from '../assets/img/config/InputNodeConfig.png'
import prepNode from '../assets/img/node/PrepNode.png'
import prepNodeConfig from '../assets/img/config/PrepNodeConfig.png'
import applyModelNode from '../assets/img/node/ApplyModelNode.png'
import applyTransformerNode from '../assets/img/node/ApplyTransformerNode.png';
import shapeletTransformNode from '../assets/img/node/ShapeletTransformNode.png';
import shapeletTransformNodeConfig from '../assets/img/config/ShapeletTransformNodeConfig.png';
import decisionTreeNode from '../assets/img/node/DecisionTreeNode.png';
import decisionTreeNodeConfig from '../assets/img/config/DecisionTreeNodeConfig.png';
import knnNode from '../assets/img/node/KnnNode.png';
import knnNodeConfig from '../assets/img/config/KnnNodeConfig.png';

const showState = ["info", "overview", "node"]

export const Tutorial: React.FC = () => {

	const [show, setShow] = useState(showState[0]);

	function handleShowState(index: number) {
		setShow(showState[index]);
	}

	function renderIntroParagraph() {
		return(
		<div>
			<div className='paragraph'>
				<h2>About Node TSC</h2>
				<p>
					In machine learning, classification involves sorting data into specific categories.
					Time Series Classification (TSC) applies this concept to time series data.
					This data, which shows how values change over time, is used to categorize events or phenomena.
					TSC finds applications in various fields like disaster monitoring, medical diagnosis, and financial analysis.
				</p>
				<p>
					Interpreting machine learning models can be challenging.
					Black box models like neural networks provide accurate results but lack transparency.
					Interpretable models, on the other hand, offer explanations for their decisions, aiding understanding and trust.
				</p>
				<p>
					To introduce TSC, start with a visual and explanatory tool.
					This tool should simplify the TSC process, making it accessible to beginners. 
					Shapelet-based TSC is particularly easy to interpret. 
					Shapelets are patterns in time series data that help classify them. 
					By transforming time series data into tabular format using shapelets, 
					we can apply familiar classification algorithms like decision trees or support vector machines.
				</p>
				<p>
					We propose a shapelet-based, low-code solution for TSC. 
					This beginner-friendly tool aims to demystify TSC, 
					encouraging exploration and understanding of time series concepts.
				</p>
			</div>
		</div>
		);
	}

	function renderOverview() {
		return(
			<div>
				<div className='paragraph'>
					<h2>Feature Overview</h2>
					<p>This is a very basic example of a Node TSC Application. 
						The Navigation Bar is on the first (1),
						the Side Bar is on the second (2),
						the Drop Zone is on the third (3),
						the Node Configuration Zone is on the fourth (4), 
						and the Control Button Zone is on the fifth (5).</p>
						<img src={overview1} alt="Overview 1" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/>
						<h3><i>Navigation Bar (1)</i></h3>
					<p>The navigation Bar contain 2 buttons Home, and Tutorial.
						The Home button will navigate you to the main home page of Node TSC. 
						The Tutorial button will popup the tutorial window of the Node TSC.
					</p>
					<h3><i>Side Bar (2)</i></h3>
					<p>The Side Bar contain the nodes for dragging into the Drop Zone (3). This side bar contain 8 nodes.
						<ol type="1">
							<li>Input File Node</li>
							<li>Input Node</li>
							<li>Preparation Node</li>
							<li>Apply Model Node</li>
							<li>Apply Transformer Node</li>
							<li>Shapelet Transform Node</li>
							<li>Decision Tree Node</li>
							<li>KNN Node</li>
							</ol>
					</p>
					<h3><i>Drop Zone (3)</i></h3>
					<p>This Zone allows you to build a new node by dragging it
						from the Side Bar (2) and dropping it in this zone. 
						You can change the location of a node by dragging it about this zone, 
						and you can delete it by clicking on it and using the backspace key on your keyboard.
					</p>
					<h3><i>Node Configuration Zone (4)</i></h3>
					<p>When you click on the node, the node configuration
						appears in this zone and allows you to change the node's parameters and highlight on the current node that clicked.
						After finish the configuration, you must click on the Update button in Control Button Zone (5) to update the node.
					</p>
					<h3><i>Control Button Zone (5)</i></h3>
					<p>This Zone contain 4 buttons, Update, Execute, Reset Project, 
						and Visulization. The Visulization will only be append only the whole project has been execute completely.
						<ol type="1">
							<li>Update: Update the new configurations on Node Configuration Zone (4)</li>
							<li>Execute: Execute the Flow on Drop Zone (3)</li>
							<li>Reset Project: Delete all nodes and edges</li>
							<li>Visualization: Visualize the clicked node on the Flow. To use this feature, first click on the node you wish to view until it is highlighted, then use this button to visualize.</li>
						</ol>
					</p>
				</div>
			</div>
		);
	}

	function renderNodeInfo() {
		return(
			<div>
				<div className='paragraph'>
					<h2>Node Overview</h2>
					<p>Create your own nodes by dragging them from the Side Bar to the Drop Zone. 
						Each node has a function designed specifically for Time Series Classification. 
						Each node will have a node label and a connection point to connect to another node.
						Some nodes may be able to configure certain parameters, while others may not.
					</p>
					<h3><i>Input File Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={inputFileNode} alt="InputFileNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									<i>Node Detail</i>
									<p>The "inputFileNode" is a node that opens a dialog box by clicking on "Choose File" button, allowing you to pick a file from their local system. 
										It features a drop-down option for selecting the "TrainInput" or "TestInput" file type.
									</p>
									<i>Node Connection Point</i>
									<p>
										The "Output Connection Point" of this node will passing the data from the file that has been choose from the dialog box.
									</p>
								</td>
							</tr>
						</tbody>
					</table>
					<hr/>
					<h3><i>Input Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={inputNode} alt="InputNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									<p>The "TrainInput" node is an input component configured to handle input operations.
									This node is designed to process data inputs from the specified ARFF file.
									facilitating further operations or analyses.</p>
								</td>
							</tr>
							<tr>
								<td><img src={inputNodeConfig} alt="InputNodeConfig" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									The "TrainInput" node has a configuration zone designed with a drop-down feature allowing users to select between "TrainInput" and "TestInput". 
									Equipped with this drop-down functionality, 
									users can seamlessly toggle between different file types for input purposes.
								</td>
							</tr>
						</tbody>
					</table>
					<hr/>
					<h3><i>Preparation Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={prepNode} alt="PrepNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									The "TrainPrep" node is configured with specific preprocessing instructions aimed at preparing training data for further analysis or modeling.
								</td>
							</tr>
							<tr>
								<td><img src={prepNodeConfig} alt="PrepNodeConfig" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>The "TrainPrep" node has a configuration zone designed with a drop-down feature allowing users to select between "TrainPrep" and "TestPrep".
								the instructions include setting the role of a specified attribute on a "Set Role" field, followed by a data type on a "Change Type" field.
								</td>
							</tr>
						</tbody>
					</table>
					<hr/>
					<h3><i>Apply Model Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={applyModelNode} alt="ApplyModelNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									This node
								</td>
							</tr>
						</tbody>
					</table>
					<hr/>
					<h3><i>Apply Transformer Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={applyTransformerNode} alt="ApplyTransformerNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									This node
								</td>
							</tr>
						</tbody>
					</table>
					<hr/>
					<h3><i>Shapelet Transform Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={shapeletTransformNode} alt="ShapeletTransformNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									The "ShapeletTransform" Node will extracts the most discriminative shapelets from a data set of time series. 
								</td>
							</tr>
							<tr>
								<td><img src={shapeletTransformNodeConfig} alt="ShapeletTransformNodeConfig" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>Row 2, Cell 2</td>
							</tr>
						</tbody>
					</table>
					<hr/>
					<h3><i>Decision Tree Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={decisionTreeNode} alt="DecisionTreeNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									This node
								</td>
							</tr>
							<tr>
								<td><img src={decisionTreeNodeConfig} alt="DecisionTreeNodeConfig" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>Row 2, Cell 2</td>
							</tr>
						</tbody>
					</table>
					<hr/>
					<h3><i>K-Nearest Neighbor Node</i></h3>
					<table>
						<thead>
							<tr>
								<th><h3>Node Information</h3></th>
								<th><h3>Description</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><img src={knnNode} alt="KnnNode" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>
									This node
								</td>
							</tr>
							<tr>
								<td><img src={knnNodeConfig} alt="KnnNodeConfig" style={{ maxWidth: '100%', height: 'auto', border: '2px solid white'  }}/></td>
								<td>Row 2, Cell 2</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	return(
		<div>
			<h1>Node TSC</h1>
			<div className='button-group'>
				<button onClick={() => handleShowState(0)}>About Node TSC</button>
				<button onClick={() => handleShowState(1)}>Overview</button>
				<button onClick={() => handleShowState(2)}>Node Info</button>
			</div>
			<hr />
			{show === showState[0] ? (
    		renderIntroParagraph()
			) : show === showState[1] ? (
				renderOverview()
			) : (
				renderNodeInfo()
			)}
		</div>
	);

}
