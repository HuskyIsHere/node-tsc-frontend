import ClassificationReport from "./VizComponents/ClassificationReport";
import FocusButton from "./VizComponents/FocusButton";

const KnnVisualize = (nodeVisualize) => {

    const visualizeReport = nodeVisualize.nodeVisualize["scores"]

    return (
        <div>
            <h1>KNN</h1>

            <div>
                <FocusButton divId="knnBoundary" btnText="Decision Boundary" />
                <FocusButton divId="classificationReport" btnText="Report" />
            </div>

            <div id="knnBoundary">
                <h2>Decision Boundary</h2>
            </div>

            <ClassificationReport report={visualizeReport} className="focusable" />
        </div>
    )
}

export default KnnVisualize;