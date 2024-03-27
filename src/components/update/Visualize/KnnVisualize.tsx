import Plot from "react-plotly.js";
import ClassificationReport from "./VizComponents/ClassificationReport";
import FocusButton from "./VizComponents/FocusButton";

const KnnVisualize = (nodeVisualize) => {

    const visualizeReport = nodeVisualize.nodeVisualize["scores"]
    const visualizeKnn = nodeVisualize.nodeVisualize["knn"]

    const numberOfTimeseries = visualizeKnn["timeseries"][0].length

    var selectedShapelet1 = 0
    var selectedShapelet2 = 1

    function updateKnnPlotData() {
        const rawX = visualizeKnn["timeseries"].map(arr => arr[selectedShapelet1])
        const rawY = visualizeKnn["timeseries"].map(arr => arr[selectedShapelet2])
        const labels = visualizeKnn["labels"]
        const preds = visualizeKnn["predicts"]
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

        const uniqueLabels = Array.from(new Set(labels)).sort()
        console.log("uniqueLabel", uniqueLabels)

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
                mode: "markers",
                type: "scatter",
                name: `train-${label}`,
                marker: {
                    size: 20,
                    opacity: 0.2,
                    color: colors[count]
                }
            })
            count++;
        })
        
        count = 0
        var predTraces = []
        uniqueLabels.forEach((label, _) => {
            console.log("process", label)
            var x = []
            var y = []
            for(var idx=0; idx<rawX.length; idx++) {
                if(preds[idx] == label) {
                    x.push(rawX[idx])
                    y.push(rawY[idx])
                }
            }
            predTraces.push({
                x: x,
                y: y,
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

    console.log(updateKnnPlotData())

    function updateKnnPlot() {
        console.log("using", selectedShapelet1, selectedShapelet2)

        var plot = document.getElementById("plotKnn")

        var data = updateKnnPlotData()

        console.log(data)

        // rerender again
        Plotly.react(plot, data, { title: "KNN" })
    }

    return (
        <div>
            <h1>k-Nearest Neighbors</h1>

            <div>
                <FocusButton divId="knnPlot" btnText="Scatter Plot" />
                <FocusButton divId="classificationReport" btnText="Report" />
            </div>

            <div id="knnPlot" className="focusable" style={{display: "block"}}>
                <div>
                    <select 
                        defaultValue={0} 
                        onChange={(event) => {
                            selectedShapelet1 = parseInt(event.target.value)
                            updateKnnPlot()
                        }} >
                        { Array.from(Array(numberOfTimeseries).keys()).map((lb, idx) => 
                            <option value={idx} key={idx}>Shapelet {idx}</option>)
                        }
                    </select>
                    <select 
                        defaultValue={1}
                        onChange={(event) => {
                            selectedShapelet2 = parseInt(event.target.value)
                            updateKnnPlot()
                        }}>
                        { Array.from(Array(numberOfTimeseries).keys()).map((lb, idx) => 
                            <option value={idx} key={idx}>Shapelet {idx}</option>)
                        }
                    </select>
                </div>

                <Plot 
                    data={updateKnnPlotData()}
                    divId="plotKnn"
                />
            </div>

            <ClassificationReport report={visualizeReport} className="focusable" />
        </div>
    )
}

export default KnnVisualize;