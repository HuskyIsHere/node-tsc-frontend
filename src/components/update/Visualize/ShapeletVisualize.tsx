import { memo } from "react"
import Plot from "react-plotly.js";

const ShapeletVisualize = ({
    shapelets,
    labels,
    scores
}) => {
    var n_shapelets = shapelets.lenght

    var data = new Array()
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
    console.log("this is new data", data)

    var layout = {
        title: 'Shapelets',
    }

    return (
        <div>
            <h1>Discovered Shapelets</h1>
            {/* <div>{shapelets}</div>
            <div>{labels}</div>
            <div>{scores}</div> */}
            <Plot
                data={data}
                layout={layout}
            />
        </div>
    )
}

export default ShapeletVisualize;