import { memo, useContext, useEffect } from "react"
import Plot from "react-plotly.js";

const ShapeletVisualize = (nodeVisualize) => {
    const visualize = nodeVisualize.nodeVisualize

    var data = new Array()

    const shapelets = visualize["shapelets"]
    const scores = visualize["scores"]
    const labels = visualize["labels"]

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

    return (
        <div>
            <h1>Discovered Shapelets</h1>
            <Plot
                data={data}
                layout={layout}
            />
        </div>
    )
}

export default ShapeletVisualize;