import ReactFlow from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import dagre from '@dagrejs/dagre';
import Plot from "react-plotly.js";
import FocusButton from './VizComponents/FocusButton';


const DecisionTreeVisualize = (nodeVisualize) => {

    const visualizeTree = nodeVisualize.nodeVisualize["tree_rules"]
    const visualizeShapelet = nodeVisualize.nodeVisualize["shapelet_transformation"]
    const visualizeReport = nodeVisualize.nodeVisualize["score"]
    console.log(visualizeReport)

    const nodeWidth = 172;
    const nodeHeight = 36;

    // graph layouts
    const dagreGraph = new dagre.graphlib.Graph().setGraph({});
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    //{"node_id": 0, "depth": 0, "values": [[24.0, 26.0]], "impurity": 0.4992, "left": 1, "right": 2, "feature": 1, "threshold": 0.15141870081424713}
    visualizeTree["tree_nodes"].forEach((node, idx) => {
        dagreGraph.setNode(node["node_id"], {
            label: node["node_id"], width: nodeWidth, height: nodeHeight
        })
    });
    visualizeTree["tree_nodes"].forEach((node, idx) => {
        if (node["left"] && node["right"]) {
            dagreGraph.setEdge(
                node["node_id"], node["left"], {label: "left"}
            )
            dagreGraph.setEdge(
                node["node_id"], node["right"], {label: "right"}
            )
        }
    })

    dagre.layout(dagreGraph);

    // react flow
    const initialNodes = [];
    dagreGraph.nodes().forEach(function(v) {
        const node = dagreGraph.node(v);
        const nodeId = node["label"]
        const nodeData = visualizeTree["tree_nodes"][nodeId]
        const label = `shapelet: ${nodeData["feature"]} impurity: ${Number(nodeData["impurity"]).toFixed(4)}`
        initialNodes.push({
            id: nodeId.toString(),
            position: { 
                x: node["x"], 
                y: node["y"],
            },
            data: { label: label },
            node_data: nodeData
        })
    });

    const initialEdges = [];
    visualizeTree["tree_nodes"].forEach((node, idx) => {
        if (node["left"] && node["right"]) {
            initialEdges.push({
                id: `e-r-${idx}`, source: node["node_id"].toString(), target: node["right"].toString(), data: {label: "right"}
            })
            initialEdges.push({
                id: `e-l-${idx}`, source: node["node_id"].toString(), target: node["left"].toString(), data: {label: "left"}
            })
        }
    })

    // START EXTENDED NODE INFO
    // node onClick function
    var extendedNodeInfoMode = null
    const onNodeClick = (event, object) => {
        const nodeData = object.node_data
        extendedNodeInfoMode = 1

        const div = document.getElementById("extendedNodeInfo")
        const divGraph = div.childNodes[0]
        const divInfo = div.childNodes[1]

        div.style.display = 'block'

        if (nodeData["feature"] != null) {
            divGraph.style.display = "block"

            var sl = visualizeShapelet["shapelets"][nodeData["feature"]]
            var shapeletData = {
                x: Array.from(Array.from(Array(sl.length).keys())),
                y: sl,
                mode: "lines",
                name: "shapelet"
            }
            console.log(shapeletData)

            var plot = document.getElementById("plot")
            Plotly.react(plot, [shapeletData], {
                title: "Shapelet"
            })

        } else {
            divGraph.style["display"] = "none"
        }
        
        divInfo.innerHTML = JSON.stringify(nodeData)
    }

    // config default rendering style
    const initStyleTreeRules = {
        display: "block"
    }
    const initStyleClassificationReport = {
        display: "none"
    }

    return (
        <div>
            <h1>Decision Tree</h1>

            <div>
                <FocusButton divId="treeRules" btnText="Tree Rules" />
                <FocusButton divId="classificationReport" btnText="Report" />
            </div>

            <div id="treeRules" className='focusable' style={initStyleTreeRules}>
                <div style={{ width: '100vw', height: '40vh' }}>
                    <ReactFlow 
                        nodes={initialNodes} 
                        edges={initialEdges}
                        onNodeClick={onNodeClick}
                    />
                </div>
            
                {/* Extended node info */}
                <div id='extendedNodeInfo' style={ {display: 'None'} }>
                    <div>
                        <Plot 
                            data={[]}
                            layout={ {title: 'Shapelet'} }
                            divId="plot"
                        />
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <div id='classificationReport' className='focusable' style={initStyleClassificationReport}>
                <div id='report'>
                    Classification Report
                    {JSON.stringify(visualizeReport["report"])}
                </div>

                <div id='confusionMatrix'>
                    Confusion Matrix
                    {JSON.stringify(visualizeReport["confusion_matrix"])}
                </div>
            </div>
            
        </div>
    );
}

export default DecisionTreeVisualize;