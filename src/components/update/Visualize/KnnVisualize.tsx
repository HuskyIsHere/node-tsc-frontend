import Plot from "react-plotly.js";
import ClassificationReport from "./VizComponents/ClassificationReport";
import FocusButton from "./VizComponents/FocusButton";
import { ReactTabulator } from 'react-tabulator';
declare const Plotly: any;

const KnnVisualize = (props) => {

    const visualizeReport = props.props["score"]
    const visualizeKnn = props.props["knn"]
    const timeseries = props.props["timeseries"]
    const predictedLabels = props.props["predicted_labels"]
    const actualLabels = props.props["actual_labels"]

    const numberOfTimeseries = visualizeKnn["timeseries"][0].length

    var selectedShapelet1 = 0
    var selectedShapelet2 = 1
    var trainMarkerSize = 50

    function updateKnnPlotData() {
        const colors = [
            '#1f77b4',  // muted blue
            '#ff7f0e',  // safety orange
            '#2ca02c',  // cooked asparagus green
            '#d62728',  // brick red
            '#9467bd',  // muted purple
            '#8c564b',  // chestnut brown
            '#e377c2',  // raspberry yogurt pink
            '#7f7f7f',  // middle gray
            '#bcbd22',  // curry yellow-green
            '#17becf'   // blue-teal
        ]
        var count = 0

        const labels = visualizeKnn["labels"]
        const uniqueLabels = Array.from(new Set(labels)).sort()
        console.log("uniqueLabel", uniqueLabels)

        const rawX = visualizeKnn["timeseries"].map(arr => arr[selectedShapelet1])
        const rawY = visualizeKnn["timeseries"].map(arr => arr[selectedShapelet2])
        const preds = visualizeKnn["predicts"]
        var trainTraces = []
        uniqueLabels.forEach((label, _) => {
            console.log("process", label)
            var x = []
            var y = []
            for(var idx=0; idx<rawX.length; idx++) {
                if(labels[idx] == label) {
                    x.push(rawX[idx])
                    y.push(rawY[idx])
                }
            }
            trainTraces.push({
                x: x,
                y: y,
                hoverinfo: 'skip', // disable hover for this trace
                mode: "markers",
                type: "scatter",
                name: `train-${label}`,
                marker: {
                    size: trainMarkerSize,
                    opacity: 0.1,
                    color: colors[count]
                }
            })
            count++;
        })
        

        // use predict label
        const rawXPred = timeseries.map(arr => arr[selectedShapelet1])
        const rawYPred = timeseries.map(arr => arr[selectedShapelet2])
        console.log("length", rawXPred.length)

        count = 0
        var predTraces = []
        uniqueLabels.forEach((label, _) => {
            console.log("process", label)
            var x = []
            var y = []
            var text = []
            for(var idx=0; idx<rawXPred.length; idx++) {
                if(predictedLabels[idx] == label) {
                    x.push(rawXPred[idx])
                    y.push(rawYPred[idx])
                    text.push(`index: ${idx}<br />pred: ${predictedLabels[idx]}<br />true: ${actualLabels[idx]}`)
                }
            }
            predTraces.push({
                x: x,
                y: y,
                text: text,
                mode: "markers",
                type: "scatter",
                name: `predict-${label}`,
                marker: {
                    color: colors[count]
                }
            })
            count++;
        })
        count = 0

        return trainTraces.concat(predTraces)
    }

    function updateKnnPlotLayout() {
        return {
            title: "Shapelet Distances",
            xaxis: {
                title: `Shapelet ${selectedShapelet1}`,
            },
            yaxis: {
                title: `Shapelet ${selectedShapelet2}`,
            },
        }
    }


    function updateKnnPlot() {
        // update plot
        var plot = document.getElementById("plotKnn")
        var data = updateKnnPlotData()
        var layout = updateKnnPlotLayout()
        // rerender again
        Plotly.react(plot, data, layout)
    }

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

    return (
        <div>
            <h1>k-Nearest Neighbors</h1>

            <div>
                <FocusButton divId="knnPlot" btnText="Scatter Plot" />
                <FocusButton divId="classificationReport" btnText="Report" />
                <FocusButton divId="predictedLabels" btnText="Predict" />
            </div>

            <div id="knnPlot" className="focusable" style={{display: "block"}}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1' }}>
                        <Plot 
                            data={updateKnnPlotData()}
                            layout={updateKnnPlotLayout()}
                            divId="plotKnn"
                        />
                    </div>
                    <div style={{ flex: '0.05' }}></div> {/* Margin container */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                        <label>x: </label>
                        <select 
                            defaultValue={0} 
                            onChange={(event) => {
                                selectedShapelet1 = parseInt(event.target.value)
                                updateKnnPlot()
                            }} >
                            {Array.from(Array(numberOfTimeseries).keys()).map((lb, idx) => 
                                <option value={idx} key={idx}>Shapelet {idx}</option>)
                            }
                        </select>
                        <label>y: </label>
                        <select 
                            defaultValue={1}
                            onChange={(event) => {
                                selectedShapelet2 = parseInt(event.target.value)
                                updateKnnPlot()
                            }}>
                            {Array.from(Array(numberOfTimeseries).keys()).map((lb, idx) => 
                                <option value={idx} key={idx}>Shapelet {idx}</option>)
                            }
                        </select>
                        <label>marker size: </label>
                        <input 
                            id="markerSizeSlider"
                            type="range" 
                            min="0"
                            max="100"
                            onChange={(event) => {
                                trainMarkerSize = parseInt(event.target.value)
                                updateKnnPlot()
                            }}
                        />
                    </div>
                </div>
            </div>

            <ClassificationReport report={visualizeReport} className="focusable" />
        
            <div id='predictedLabels' className='focusable' style={{display: "none"}}>
                <div>
                    <ReactTabulator 
                        data={predictTableData}
                        columns={predictTableColumns}
                        layout={"fitData"}
                        options={{
                            layout: "fitColumns",
                            resizableColumns: true,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default KnnVisualize;