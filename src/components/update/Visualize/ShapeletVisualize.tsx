import Plot from "react-plotly.js";
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { useRef } from "react";

const ShapeletVisualize = (nodeVisualize) => {
    const visualize = nodeVisualize.nodeVisualize["shapelet_transformation"]

    var tableRef = useRef();

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
        { title: `Score (${criterion})`, field: "score" },
        { 
            title: "Label", field: "label",
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
            label: labels[idx],
        })
    });
    // END TABLE

    // BEGIN TABLE EVENTS
    function dataFiltered(filters, rows) {
        const filteredRows = rows.map((r) => r._row.data)

        const selectedIndices = []
        filteredRows.forEach((s, idx) => {
            selectedIndices.push(s.id)
        })

        if (tableRef.current) {
            tableRef.current.deselectRow() // deselect all row
        }

        showTraces(selectedIndices)
    }

    function rowSelectionChanged(data, rows, selected, deselected) {
        const selectedIndices = []

        if (data.length == 0) {
            // if there is no selected row show all active traces
            tableRef.current.getData('active').forEach(d => {
                selectedIndices.push(d.id)
            })
        } else {
            // else show all selected rows
            data.forEach(d => {
                selectedIndices.push(d.id)
            });
        }
        showTraces(selectedIndices)
    }

    function deselectAllRows() {
        tableRef.current.deselectRow()
    }
    // END TABLE EVENTS

    // Utility functions
    function showTraces(selectedIndices=[]) {
        // hide all specified trace and show the rest
        var plot = document.getElementById("plot")

        // show all traces
        if (selectedIndices.length == 0) {
            plot.data.forEach((s, idx) => {
                s.visible = true
            })
            Plotly.react(plot, data, layout)
            return
        }

        // show specific 
        plot.data.forEach((s, idx) => {
            if (selectedIndices.includes(idx)) {
                s.visible = true
            } else {
                s.visible = false
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

            <div id="tableActionBar">
                <button onClick={deselectAllRows}>Deselect All</button>
            </div>

            <ReactTabulator 
                onRef={(r) => (tableRef = r)}
                data={tableData}
                columns={columns}
                layout={"fitData"}
                options={{
                    selectable: true
                }}
                events={{
                    dataFiltered: dataFiltered,
                    rowSelectionChanged: rowSelectionChanged,
                }}
            />
        </div>
    )
}

export default ShapeletVisualize;