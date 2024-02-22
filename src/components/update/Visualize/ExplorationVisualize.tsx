import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { useRef } from "react";

const ExplorationVisualize = (nodeVisualize) => {

    const visualizeData = nodeVisualize.nodeVisualize["data"]

    console.log(visualizeData)

    var numberOfTimeseries = visualizeData["data"].length
    var colTypes = visualizeData["col_type"]

    // START TABLE COL TYPE
    var colTypeTableRef = useRef()
    var uniqueColTypes = new Set()
    var colTypeTableColumns = [
        { title: "Name", field: "name" },
        { title: "Type", field: "type" },
    ]
    var colTypeTableData = []
    colTypes.forEach((ct, idx) => {
        colTypeTableData.push({
            name: ct[0],
            type: ct[1],
        })
        uniqueColTypes.add(ct[1])
    })
    console.log(uniqueColTypes)
    // END TABLE COL TYPE

    function hideTable(divId) {
        const table = document.getElementById(divId)
        if (table.style.display === "none") {
            table.style.display = "block"
        } else {
            table.style.display = "none"
        }
    }

    return (
        <div>
            <h1>Exploration</h1>
        
            <div>Total number of timeseries: {numberOfTimeseries}</div>

            <div>
                <button onClick={() => hideTable("colTypeTable")}>
                    Column Types
                </button>
            </div>

            <div id="colTypeTable">
                <div className="tableActionBar">
                <label>Column Type: </label>
                <select onChange={(event) => {
                    const opt = event.target.value

                    if (opt != 'all') {
                        colTypeTableRef.current.setFilter("type", "=", opt)
                    } else {
                        colTypeTableRef.current.clearFilter()
                    }
                }}>                    
                    <option value="all">all</option>
                    { Array.from(uniqueColTypes).map((lb, idx) => <option value={lb} key={lb}>{lb}</option>)}
                </select>
                </div>
                <ReactTabulator 
                    onRef={(r) => (colTypeTableRef = r)}
                    data = {colTypeTableData}
                    columns={colTypeTableColumns}
                    layout={"fitdata"}
                />
            </div>
        </div>
    )
}

export default ExplorationVisualize;