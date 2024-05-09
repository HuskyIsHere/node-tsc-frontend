import DecisionTreeVisualize from "./DecisionTreeVisualize";
import KnnVisualize from "./KnnVisualize";
import ShapeletVisualize from "./ShapeletVisualize";

const ApplyVisualize = (props) => {

    const model = props.props["model"]
    const sent_props = props.props

    return (
        <div>
            <div>
                <h1>Apply: "{model["name"]}"</h1>
            </div>

            { model["type"] == "ShapeletTransformNode" && 
                <ShapeletVisualize props={sent_props} />
            }
            { model["type"] == "DecisionTreeNode" && 
                <DecisionTreeVisualize props={sent_props} />
            }
            { model["type"] == "KnnNode" && 
                <KnnVisualize props={sent_props} />
            }
        </div>
    )
}

export default ApplyVisualize;
