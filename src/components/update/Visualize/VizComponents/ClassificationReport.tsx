import Plot from "react-plotly.js";
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from "react-tabulator"

const ClassificationReport = (props) => {
    const confusion_matrix = props.report.confusion_matrix
    const report = props.report.report
    const className = props.className || "focusable"
    const initStyle = props.initStyle || {
        display: "none"
    }

    console.log(report)

    // START TABLE: REPORT
    var reportClassificationAcc = report.accuracy
    var reportTableColumns = [
        { title: "", field: "name" },
        { title: "Precision", field: "precision"},
        { title: "Recall", field: "recall"},
        { title: "F1", field: "f1"},
        { title: "Number of Samples", field: "support"},
    ]
    var reportTableData = []
    Object.entries(report).forEach(entry => {
        const [key, info] = entry
        if (key != "accuracy") {
            console.log("report", key, info)
            reportTableData.push({
                name: key,
                precision: info["precision"],
                recall: info["recall"],
                f1: info["f1-score"],
                support: info["support"],
            })
        }
    })
    // END TABLE: REPORT

    // START PLOT: CONFUSION MATRIX
    var colorscaleValue = [
        [0, '#FFFFFF'],
        [1, '#003980']
    ];
    var labels = confusion_matrix.labels.map((x) => 'label: '+x.toString())
    console.log(confusion_matrix.heatmap)
    var reportData = [
        {
            x: labels,
            y: labels,
            z: confusion_matrix.heatmap,
            type: 'heatmap',
            colorscale: colorscaleValue,
        }
    ];
    var reportPlotLayout = {
        title: "Confusion Matrix",
        yaxis: {
            title: "True",
            autorange: "reversed",
        },
        xaxis: {
            title: "Pred",
        }
    }

    // TODO: Add number annotation
    
    // END PLOT: CONFUSION MATRIX

    return (
        <div id="classificationReport" className={className} style={initStyle}>
            <div style={{ display: 'flex' }}>
                {confusion_matrix &&
                <div style={{ flex: '1' }}>
                    <Plot 
                        data={reportData}
                        layout={reportPlotLayout}
                        divId="plotConfusionMatrix"
                    />
                </div>
                }
                <div style={{ flex: '0.05' }}></div> {/* Margin container */}
                {report && 
                <div style={{ flex: '1', marginRight: '10px' }}>
                    <div style={{ color: 'white' }}><h2>Accuracy: {reportClassificationAcc}</h2></div>
                    <ReactTabulator
                        data={reportTableData}
                        columns={reportTableColumns}
                        layout={"fitData"}
                        options={{
                            layout: "fitColumns",
                            resizableColumns: true,
                        }}
                    />
                </div>
                }
            </div>
        </div>
    )
}

export default ClassificationReport;