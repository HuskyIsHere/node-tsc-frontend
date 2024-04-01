import ReactFlow from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import dagre from '@dagrejs/dagre';
import Plot from "react-plotly.js";
import FocusButton from './VizComponents/FocusButton';
import ClassificationReport from './VizComponents/ClassificationReport';
import { ReactTabulator } from 'react-tabulator';


const DecisionTreeVisualize = (props) => {

    const visualizeTree = props.props["tree_rules"]
    const visualizeShapelet = props.props["shapelet_transformation"]
    const visualizeReport = props.props["score"]
    const predictedLabels = props.props["predicted_labels"]
    const actualLabels = props.props["actual_labels"]

    console.log("labels", predictedLabels, actualLabels)

    const nodeWidth = 172;
    const nodeHeight = 100;

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
        const values = nodeData["values"][0]
        const feature = nodeData["feature"]
        var label = "" // TODO: change label renderer to be multiple lines
        if (feature != null) {
            label = `
                Shapelet-${nodeData["feature"]} <= ${Number(nodeData["threshold"]).toFixed(4)}
                <br />
                Impurity: ${Number(nodeData["impurity"]).toFixed(4)}
                `
        } else {
            label = `
                Predict Label: ${values.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)+1}
                <br />
                Impurity: ${Number(nodeData["impurity"]).toFixed(4)}
                `
        }

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

        div.style.display = 'block'

        if (nodeData["feature"] != null) {
            divGraph.style.display = "block"

            var idx = nodeData["feature"]

            const arrayRange = (start, stop) =>
                Array.from(
                    { length: (stop - start)},
                    (_, index) => start + index
            );

            var sl = visualizeShapelet["shapelets"][idx]
            var ts = visualizeShapelet["timeseries"][idx]
            var indices = visualizeShapelet["indices"][idx]

            console.log("data", sl, ts, indices)
            var shapeletData = [
                {
                    x: Array.from(Array.from(Array(ts.length).keys())),
                    y: ts,
                    mode: "lines",
                    name: "timeseries",
                    hoverinfo: 'skip',
                },
                {
                    x: arrayRange(indices[1], indices[2]),
                    y: sl,
                    mode: 'lines',
                    name: 'shapelet',
                    hoverinfo: 'skip',
                }
            ]
            console.log(shapeletData)

            var plot = document.getElementById("plot")
            Plotly.react(plot, shapeletData, {
                title: `Shapelet ${idx}`,
                shapes: [
                    {
                        type: 'rect',
                        xref: 'x',
                        yref: 'paper',
                        x0: indices[1],
                        y0: 0,
                        x1: indices[2]-1,
                        y1: 1,
                        fillcolor: '#d3d3d3',
                            opacity: 0.2,
                            line: {
                                width: 0
                            },
                    },
                ]
            })

        } else {
            divGraph.style["display"] = "none"
        }
    }
    // END EXTENDED NODE INFO

    // START: PREDICT TABLE
    var predictTableColumns = [
        { title: "Index", field: "index" },
        { title: "Actial Label", field: "actual"},
        { title: "Predict Label", field: "predict"},
    ]
    var predictTableData = []
    for(var idx=0; idx<predictedLabels.length; idx++) {
        predictTableData.push({
            index: idx,
            actual: actualLabels[idx],
            predict: predictedLabels[idx]
        })
    }
    console.log(predictTableColumns, predictTableData)
    // END: PREDICT TABLE

    // config default rendering style
    const initStyleTreeRules = {
        display: "block"
    }
    const initStyleClassificationReport = {
        display: "none"
    }
    const initPredictTable = {
        display: "none"
    }

    return (
        <div>
            <h1>Decision Tree</h1>

            <div>
                <FocusButton divId="treeRules" btnText="Tree Rules" />
                <FocusButton divId="classificationReport" btnText="Report" />
                <FocusButton divId="predictedLabels" btnText="Predict" />
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
                </div>
            </div>

            <ClassificationReport report={visualizeReport} className="focusable" />
            
            <div id='predictedLabels' className='focusable' style={ initPredictTable }>
                <div>
                    <ReactTabulator 
                        data={predictTableData}
                        columns={predictTableColumns}
                        layout={"fitData"}
                    />
                </div>
            </div>
        </div>
    );
}

export default DecisionTreeVisualize;