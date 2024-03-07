import ReactFlow from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import dagre from '@dagrejs/dagre';


const DecisionTreeVisualize = (nodeVisualize) => {

    const visualizeTree = nodeVisualize.nodeVisualize["tree_rules"]
    const visualizeShapelet = nodeVisualize.nodeVisualize["shapelet_transformation"]

    console.log(visualizeTree)

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
        const node_id = node["label"]
        initialNodes.push({
            id: node_id.toString(),
            position: { 
                x: node["x"], 
                y: node["y"],
            },
            data: { label: JSON.stringify(visualizeTree["tree_nodes"][node_id]) },
        })
    });
    console.log("init", initialNodes);

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
    console.log("init", initialEdges);

    return (
        <div>
            <h1>Decision Tree</h1>
            <div style={{ width: '100vw', height: '100vh' }}>
                <ReactFlow nodes={initialNodes} edges={initialEdges} />
            </div>
            <div>{JSON.stringify(visualizeTree["tree_nodes"])}</div>
        </div>
    );
}

export default DecisionTreeVisualize;