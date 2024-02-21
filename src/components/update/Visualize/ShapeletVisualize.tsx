import Plot from "react-plotly.js";
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { useState } from "react";

const ShapeletVisualize = (nodeVisualize) => {
    console.log(nodeVisualize["nodeVisualize"]);
    
    const visualize = nodeVisualize["nodeVisualize"]

    const [graphData, setGraphData] = useState([])

    var data = new Array()

    const shapelets = visualize["shapelets"]
    const scores = visualize["scores"]
    const labels = visualize["labels"]
    const criterion = visualize["criterion"]

    // BEGIN GRAPH
    const uniqueLabels = [...new Set(labels)]
    shapelets.forEach((sl, idx) => {
        // console.log("this is len", sl.length)
        data.push({
            x: Array.from(Array.from(Array(sl.length).keys())),
            y: sl,
            // type: 'line',
            mode: 'lines',
            name: `Shapelet ${idx} (class: ${labels[idx]})`,
            showlegend: true
        })
    })
    var layout = {
        title: 'Shapelets',
    }
    // END GRAPH

    // BEGIN TABLE
    var columns = [
        { title: "Name", field: "name" },
        { title: `Score ${criterion}`, field: "score" },
        { 
            title: "Class", field: "class",
            headerFilter: "input",
            headerFilterOptions: {initial: "2"}
        },
    ]
    var tableData = []
    scores.forEach((score, idx) => {
        tableData.push({
            id: idx,
            name: `Shapelet ${idx}`,
            score: score,
            class: labels[idx],
        })
    });
    // END TABLE

    function dataFiltering(filter) {
        console.log("data filtering...")
    }

    function dataFiltered(filters, rows) {
        const filteredRows = rows.map((r) => r._row.data)
        console.log("data filtered...", filteredRows[0])    

        const selectedIndices = []
        filteredRows.forEach((s, idx) => {
            selectedIndices.push(s.id)
        })
        
        var plot = document.getElementById("plot")
        plot.data.forEach((s, idx) => {
            if (!selectedIndices.includes(idx)) {
                s.visible = false
            } else {
                s.visible = true
            }
        })
        Plotly.react(plot, data, layout)
    }

    function rowClick(e, row) {
        var plot = document.getElementById("plot")
        plot.data.forEach((s, idx) => {
            s.visible = true
        })
        Plotly.react(plot, data, layout)
    }

    function rowDblClick(e, row) {
        var rowData = row._row.data
        var plot = document.getElementById("plot")
        plot.data.forEach((s, idx) => {
            console.log(idx, s, rowData.id)
            if (idx != rowData.id) {
                s.visible = false
            } else {
                s.visible = true
            }
        })
        Plotly.react(plot, data, layout)
    }

    return (
        <div>
            <h1>Discovered Shapelets</h1>

            <Plot
                data={data}
                layout={layout}
                divId="plot"
            />

            <ReactTabulator     
                data={tableData}
                columns={columns}
                layout={"fitData"}
                events={{
                    dataFiltering: dataFiltering,
                    dataFiltered: dataFiltered,
                    rowClick: rowClick,
                    rowDblClick: rowDblClick,
                }}
            />
        </div>
    )
}

export default ShapeletVisualize;