import Plot from "react-plotly.js";
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { useRef } from "react";
import FocusButton from "./VizComponents/FocusButton";

const ShapeletVisualize = (nodeVisualize) => {

    const arrayRange = (start, stop) =>
        Array.from(
            { length: (stop - start)},
            (_, index) => start + index
    );

    const visualize = nodeVisualize.nodeVisualize["shapelet_transformation"]

    var tableRef = useRef();

    var data = new Array() // shapelets
    var dataTimeSeries = new Object() // object of time series

    const shapelets = visualize["shapelets"]
    const scores = visualize["scores"]
    const labels = visualize["labels"]
    const criterion = visualize["criterion"]
    const timeseries = visualize["timeseries"]
    const timeseriesLabels = visualize["timeseries_labels"]
    const indices = visualize["indices"]
    const distances = visualize["transformed_data"]

    // BEGIN GRAPH
    const uniqueLabels = [...new Set(labels)]
    shapelets.forEach((sl, idx) => {
        data.push({
            x: Array.from(Array.from(Array(sl.length).keys())),
            y: sl,
            // type: 'line',
            mode: 'lines',
            name: `Shapelet ${idx} (label: ${labels[idx]})`,
            showlegend: true
        })
    })

    const numberOfShapelets = data.length
    for (var i=0; i<numberOfShapelets; i++) {
        var idx = indices[i]
        var ts = timeseries[i]
        dataTimeSeries[i] = [{
            x:  Array.from(Array.from(Array(ts.length).keys())),
            y: ts,
            mode: 'lines',
            name: "timeseries",
            hoverinfo: 'skip',
        }, {
            x: arrayRange(idx[1], idx[2]),
            y: shapelets[i],
            mode: 'lines',
            name: 'shapelet',
            hoverinfo: 'skip',
        }]
    }

    var layout = {
        title: 'Discovered Shapelets',
    }
    // END GRAPH

    // BEGIN TABLE
    var columns = [
        { title: "Name", field: "name" },
        { title: `Score (${criterion})`, field: "score" },
        { title: "Label", field: "label" },
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

            showTraces(selectedIndices)
        } else {
            // else show all selected rows
            data.forEach(d => {
                selectedIndices.push(d.id)
            });

            if (selectedIndices.length == 1) {
                // show a single timeseries with shapelet location
                var plot = document.getElementById("plot")

                var idx = selectedIndices[0]

                Plotly.react(plot, dataTimeSeries[idx], { 
                    title: `Shapelet ${idx} (label: ${labels[idx]})`,
                    shapes: [
                        {
                            type: 'rect',
                            // x-reference is assigned to the x-values
                            xref: 'x',
                            // y-reference is assigned to the plot paper [0,1]
                            yref: 'paper',
                            x0: indices[idx][1],
                            y0: 0,
                            x1: indices[idx][2]-1,
                            y1: 1,
                            fillcolor: '#d3d3d3',
                            opacity: 0.2,
                            line: {
                                width: 0
                            }
                        },
                    ]
                })
            } else {
                showTraces(selectedIndices)
            }
        }
    }

    function onLabelSelected(event) {
        const opt = event.target.value
        
        if (opt != 'all') {
            tableRef.current.setFilter("label", "=", opt)
        } else {
            tableRef.current.clearFilter()
        }
    }

    function deselectAllRows() {
        tableRef.current.deselectRow()
    }
    // END TABLE EVENTS

    // Utility functions
    function showTraces(selectedIndices=[]) {
        // hide all specified trace and show the rest
        var plot = document.getElementById("plot")
        Plotly.react(plot, data, layout) // refresh all data in case of single time series case

        // show all traces
        if (selectedIndices.length == 0) {
            plot.data.forEach((s, idx) => {
                s.visible = true
            })
        } else {
            // show specific 
            plot.data.forEach((s, idx) => {
                if (selectedIndices.includes(idx)) {
                    s.visible = true
                } else {
                    s.visible = false
                }
            })
        }
        Plotly.react(plot, data, layout) // rerender again
    }

    // START: DISTANCE TABLE
    var distanceTableColumns = [{ title: "Index", field: "index" }]
    Array.apply(null, Array(shapelets.length)).map((x, i) => { 
        distanceTableColumns.push(
            { title: `Shapelet ${i}`, field: `shapelet-${i}`}
        ) 
    })
    distanceTableColumns.push({
        title: "Label", field: 'label'
    })
    var distanceTableData = Array.apply(null, Array(distances.length)).map((x, i) => {
        var obj = { index: i }
        for (var k=0; k<shapelets.length; k++) {
            obj[`shapelet-${k}`] = distances[i][k]
        }
        obj['label'] = timeseriesLabels[i]
        return obj
    })
    console.log("label", labels)
    // END: DISTANCE TABLE

    // config default rendering style
    const initStyleDiscoveredShapelets = {
        display: "block"
    }
    const initStyleDistanceTable = {
        display: "none"
    }

    return (
        <div>
            <h1>Discovered Shapelets</h1>

            <div>
                <FocusButton divId="discoveredShapelets" btnText="Discovered Shapelets" />
                <FocusButton divId="distanceTable" btnText="Distance" />
            </div>

            <div id="discoveredShapelets" className="focusable" style={initStyleDiscoveredShapelets}>
                <Plot
                    data={data}
                    layout={layout}
                    divId="plot"
                />

                <div className="tableActionBar">
                    <label>Label: </label>
                    <select onChange={onLabelSelected}>                    
                        <option value="all">all</option>
                        { uniqueLabels.map((lb, idx) => <option value={lb} key={lb}>{lb}</option>)}
                    </select>
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

            <div id="distanceTable" className="focusable" style={initStyleDistanceTable}>
                <div>
                    <ReactTabulator 
                        data={distanceTableData}
                        columns={distanceTableColumns}
                        layout={"fitdata"}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default ShapeletVisualize;