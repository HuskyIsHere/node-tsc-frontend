import Plot from "react-plotly.js";
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'

const ShapeletVisualize = (nodeVisualize) => {
    const visualize = nodeVisualize.nodeVisualize["shapelet_transformation"]

    var data = new Array()

    const shapelets = visualize["shapelets"]
    const scores = visualize["scores"]
    const labels = visualize["labels"]
    const criterion = visualize["criterion"]

    // graph
    const uniqueLabels = [...new Set(labels)]
    shapelets.forEach((sl, idx) => {
        // console.log("this is len", sl.length)
        data.push({
            x: Array.from(Array.from(Array(sl.length).keys())),
            y: sl,
            // type: 'line',
            mode: 'lines',
            name: `Shapelet ${idx} (label: ${labels[idx]})`
        })
    })
    var layout = {
        title: 'Shapelets',
    }

    // score table
    var columns = [
        { title: "Name", field: "name" },
        { title: "Score", field: "score"},
    ]
    var tableData = []
    scores.forEach((score, idx) => {
        tableData.push({
            id: idx,
            name: `Shapelet ${idx}`,
            score: score,
        })
    });

    return (
        <div>
            <h1>Discovered Shapelets</h1>

            <div>
            <label htmlFor="shapeletIndex">Label: </label>
            <select name="shapeletIndex" id="labelFilter">
                <option value="all">all</option>
                {uniqueLabels.map((v: string) => {
                    return (<option value={String(v)}>{v}</option>)
                })}
            </select>
            </div>

            <Plot
                data={data}
                layout={layout}
            />

            <ReactTabulator
                data={tableData}
                columns={columns}
            />
        </div>
    )
}

export default ShapeletVisualize;