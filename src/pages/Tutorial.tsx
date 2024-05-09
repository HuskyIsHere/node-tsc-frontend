import React, { useState, useEffect } from "react";
import "../assets/Tutorial.css";
import overview1 from "../assets/img/overview1.png";
import inputFileNode from "../assets/img/node/InputFileNode.png";
import inputNode from "../assets/img/node/InputNode.png";
import inputNodeConfig from "../assets/img/config/InputNodeConfig.png";
import prepNode from "../assets/img/node/PrepNode.png";
import prepNodeConfig from "../assets/img/config/PrepNodeConfig.png";
import applyModelNode from "../assets/img/node/ApplyModelNode.png";
import applyTransformerNode from "../assets/img/node/ApplyTransformerNode.png";
import shapeletTransformNode from "../assets/img/node/ShapeletTransformNode.png";
import shapeletTransformNodeConfig from "../assets/img/config/ShapeletTransformNodeConfig.png";
import decisionTreeNode from "../assets/img/node/DecisionTreeNode.png";
import decisionTreeNodeConfig from "../assets/img/config/DecisionTreeNodeConfig.png";
import knnNode from "../assets/img/node/KnnNode.png";
import knnNodeConfig from "../assets/img/config/KnnNodeConfig.png";

const showState = ["info", "overview", "node"];

export const Tutorial: React.FC = () => {
  const [show, setShow] = useState(showState[0]);

  function handleShowState(index: number) {
    setShow(showState[index]);
  }

  function renderIntroParagraph() {
    return (
      <div>
        <div className="paragraph">
          <h2>About Node TSC</h2>
          <p>
            In machine learning, classification involves sorting data into
            specific categories. Time Series Classification (TSC) applies this
            concept to time series data. This data, which shows how values
            change over time, is used to categorize events or phenomena. TSC
            finds applications in various fields like disaster monitoring,
            medical diagnosis, and financial analysis.
          </p>
          <p>
            Interpreting machine learning models can be challenging. Black box
            models like neural networks provide accurate results but lack
            transparency. Interpretable models, on the other hand, offer
            explanations for their decisions, aiding understanding and trust.
          </p>
          <p>
            To introduce TSC, start with a visual and explanatory tool. This
            tool should simplify the TSC process, making it accessible to
            beginners. Shapelet-based TSC is particularly easy to interpret.
            Shapelets are patterns in time series data that help classify them.
            By transforming time series data into tabular format using
            shapelets, we can apply familiar classification algorithms like
            decision trees or support vector machines.
          </p>
          <p>
            We propose a shapelet-based, low-code solution for TSC. This
            beginner-friendly tool aims to demystify TSC, encouraging
            exploration and understanding of time series concepts.
          </p>
        </div>
      </div>
    );
  }

  function renderOverview() {
    return (
      <div>
        <div className="paragraph">
          <h2>Feature Overview</h2>
          <p>
            This is a very basic example of a Node TSC Application. The
            Navigation Bar is on the first (1), the Side Bar is on the second
            (2), the Drop Zone is on the third (3), the Node Configuration Zone
            is on the fourth (4), and the Control Button Zone is on the fifth
            (5).
          </p>
          <img
            src={overview1}
            alt="Overview 1"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "2px solid white",
            }}
          />
          <h3>
            <i>Navigation Bar (1)</i>
          </h3>
          <p>
            The navigation Bar contain 2 buttons Home, and Tutorial. The Home
            button will navigate you to the main home page of Node TSC. The
            Tutorial button will popup the tutorial window of the Node TSC.
          </p>
          <h3>
            <i>Side Bar (2)</i>
          </h3>
          <p>
            The Side Bar contain the nodes for dragging into the Drop Zone (3).
            This side bar contain 8 nodes.
            <ol type="1">
              <li>Input File Node</li>
              <li>Input Node</li>
              <li>Preparation Node</li>
              <li>Apply Model Node</li>
              <li>Apply Transformer Node</li>
              <li>Shapelet Transform Node</li>
              <li>Decision Tree Node</li>
              <li>KNN Node</li>
            </ol>
          </p>
          <h3>
            <i>Drop Zone (3)</i>
          </h3>
          <p>
            This Zone allows you to build a new node by dragging it from the
            Side Bar (2) and dropping it in this zone. You can change the
            location of a node by dragging it about this zone, and you can
            delete it by clicking on it and using the backspace key on your
            keyboard.
          </p>
          <h3>
            <i>Node Configuration Zone (4)</i>
          </h3>
          <p>
            When you click on the node, the node configuration appears in this
            zone and allows you to change the node's parameters and highlight on
            the current node that clicked. After finish the configuration, you
            must click on the Update button in Control Button Zone (5) to update
            the node.
          </p>
          <h3>
            <i>Control Button Zone (5)</i>
          </h3>
          <p>
            This Zone contain 4 buttons, Update, Execute, Reset Project, and
            Visulization. The Visulization will only be append only the whole
            project has been execute completely.
            <ol type="1">
              <li>
                Update: Update the new configurations on Node Configuration Zone
                (4)
              </li>
              <li>Execute: Execute the Flow on Drop Zone (3)</li>
              <li>Reset Project: Delete all nodes and edges</li>
              <li>
                Visualization: Visualize the clicked node on the Flow. To use
                this feature, first click on the node you wish to view until it
                is highlighted, then use this button to visualize.
              </li>
            </ol>
          </p>
        </div>
      </div>
    );
  }

  function renderNodeInfo() {
    return (
      <div>
        <div className="paragraph">
          <h2>Node Overview</h2>
          <p>
            Create your own nodes by dragging them from the Side Bar to the Drop
            Zone. Each node has a function designed specifically for Time Series
            Classification. Each node will have a node label and a connection
            point to connect to another node. Some nodes may be able to
            configure certain parameters, while others may not.
          </p>
          <h3>
            <i>Input File Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "inputFileNode" is a node that opens a dialog box by clicking on
            "Choose File" button, allowing you to pick a file from their local
            system. It features a drop-down option for selecting the
            "TrainInput" or "TestInput" file type.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={inputFileNode}
                    alt="InputFileNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Output Connection Point" of this node will passing the
                    data from the file that has been choose from the dialog box.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>
            <i>Input Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "TrainInput" node is designed to process data inputs from the
            specified ARFF file. facilitating further operations or analyses.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={inputNode}
                    alt="InputNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Input Connection Point" of this node need a data from a
                    specified ARFF file.
                  </p>
                  <p>
                    The "Output Connection Point" of this node will passing
                    process data inputs from the specified ARFF file.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={inputNodeConfig}
                    alt="InputNodeConfig"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Configuration Detail</i>
                  <p>
                    The "InputNode" node has a configuration zone designed with
                    a drop-down feature allowing users to select between
                    "TrainInput" and "TestInput". Equipped with this drop-down
                    functionality, users can seamlessly toggle between different
                    file types for input purposes.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>
            <i>Preparation Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "TrainPrep" node is configured with specific preprocessing
            instructions aimed at preparing training data for further analysis
            or modeling.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={prepNode}
                    alt="PrepNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Input Connection Point" of this node need a data inputs
                    from the specified ARFF file and type of input purposes.
                  </p>
                  <p>
                    The "Output Connection Point" of this node will passing a
                    processed data with a specific instructions.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={prepNodeConfig}
                    alt="PrepNodeConfig"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Configuration Detail</i>
                  <p>
                    The "TrainPrep" node has a configuration zone designed with
                    a drop-down feature allowing users to select between
                    "TrainPrep" and "TestPrep". the instructions include setting
                    the role of a specified attribute on a "Set Role" field,
                    followed by a data type on a "Change Type" field.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>
            <i>Apply Model Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "Apply Model" node is first trained by another Operator, which
            is often a learning algorithm. Afterwards, this model can be applied
            on another node.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={applyModelNode}
                    alt="ApplyModelNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Input Connection Point" (DATA) of this node need a
                    label data that has been processed.
                  </p>
                  <p>
                    The "Input Connection Point" (MODEL) of this node need a
                    trained model.
                  </p>
                  <p>
                    The "Output Connection Point" of this node will passing a
                    processed data.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>
            <i>Apply Transformer Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "Apply Transformer" node is first trained by Shapelet Transform
            Node. Afterwards, this model can be applied on another node.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={applyTransformerNode}
                    alt="ApplyTransformerNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Input Connection Point" (DATA) of this node need a
                    label data that has been processed.
                  </p>
                  <p>
                    The "Input Connection Point" (MODEL) of this node need a
                    trained Shapelet Transform model.
                  </p>
                  <p>
                    The "Output Connection Point" of this node will passing a
                    processed data.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>
            <i>Shapelet Transform Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "ShapeletTransform" Node will extracts the most discriminative
            shapelets from a data set of time series. A shapelet is defined as a
            subset of consecutive points from a time series.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={shapeletTransformNode}
                    alt="ShapeletTransformNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Input Connection Point" of this node need a label data
                    that has been processed.
                  </p>
                  <p>
                    The "Output Connection Point" of this node will passing a
                    data and a trained of Shapelet model.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={shapeletTransformNodeConfig}
                    alt="ShapeletTransformNodeConfig"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Configuration Detail</i>
                  <p>
                    <ul>
                      <li>
                        Number of Shapelet: The number of shapelets to keep.
                      </li>
                      <li>
                        Window Sizes: The sliding window sizes, and also all
                        components, must be integers or floats separated by ",".
                      </li>
                      <li>
                        Criterion: Criterion to perform the selection of the
                        shapelets. ‘mutual_info’ uses the mutual information,
                        while ‘anova’ use the ANOVA F-value.
                      </li>
                      <li>
                        Sort: If True, shapelets are sorted in descending order
                        according to their associated scores. If False, the
                        order is undefined.
                      </li>
                      <li>
                        Remove Similar: If True, self-similar shapelets are
                        removed, keeping only the non-self-similar shapelets
                        with the highest scores. Two shapelets are considered to
                        be self-similar if they are taken from the the same time
                        series and have at least one overlapping index.
                      </li>
                      <li>
                        Seed: Used by the random number generator to control the
                        randomness.
                      </li>
                    </ul>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>
            <i>Decision Tree Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "DecisionTree" Node are a non-parametric supervised learning
            method used for classification and regression. The goal is to create
            a model that predicts the value of a target variable by learning
            simple decision rules inferred from the data features.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={decisionTreeNode}
                    alt="DecisionTreeNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Input Connection Point" of this node need a label data
                    that has been processed.
                  </p>
                  <p>
                    The "Output Connection Point" of this node will passing a
                    trained of Decision Tree model.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={decisionTreeNodeConfig}
                    alt="DecisionTreeNodeConfig"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Configuration Detail</i>
                  <p>
                    <ul>
                      <li>
                        Criterion: The function to measure the quality of a
                        split. Supported criteria are “gini” for the Gini
                        impurity and “log_loss” and “entropy” both for the
                        Shannon information gain.
                      </li>
                      <li>
                        Split: The strategy used to choose the split at each
                        node. Supported strategies are “best” to choose the best
                        split and “random” to choose the best random split.
                      </li>
                      <li>
                        Max Depths: The maximum depth of the tree. If None, then
                        nodes are expanded until all leaves are pure
                      </li>
                      <li>
                        Seed: Used by the random number generator to control the
                        randomness.
                      </li>
                      <li>
                        Minimal Cost-Complexity Pruning: Complexity parameter
                        used for Minimal Cost-Complexity Pruning. The subtree
                        with the largest cost complexity that is smaller than
                        this number will be chosen.
                      </li>
                      <li>
                        Min Impurity Decrease: A node will be split if this
                        split induces a decrease of the impurity greater than or
                        equal to this value.
                      </li>
                    </ul>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>
            <i>K-Nearest Neighbor Node</i>
          </h3>
          <i>Node Detail</i>
          <p>
            The "K-Nearest Neighbor" Node is a type of instance-based learning
            or non-generalizing learning: it does not attempt to construct a
            general internal model, but simply stores instances of the training
            data. Classification is computed from a simple majority vote of the
            nearest neighbors of each point: a query point is assigned the data
            class which has the most representatives within the nearest
            neighbors of the point.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Node Information</h3>
                </th>
                <th>
                  <h3>Description</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={knnNode}
                    alt="KnnNode"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Connection Point</i>
                  <p>
                    The "Input Connection Point" of this node need a label data
                    that has been processed.
                  </p>
                  <p>
                    The "Output Connection Point" of this node will passing a
                    trained of KNN model.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={knnNodeConfig}
                    alt="KnnNodeConfig"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid white",
                    }}
                  />
                </td>
                <td>
                  <i>Node Configuration Detail</i>
                  <p>
                    <ul>
                      <li>
                        Number of Neighbor: Number of neighbors to use by
                        default for kneighbors queries.
                      </li>
                      <li>Algorithm: Used to compute the nearest neighbors.</li>
                      <li>Power Parameter: Used for the Minkowski metric.</li>
                      <li>
                        Weights: A function used in prediction. Possible values
                        ‘uniform’ and ‘distance’.
                      </li>
                    </ul>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Node TSC</h1>
      <div className="button-group">
        <button onClick={() => handleShowState(0)}>About Node TSC</button>
        <button onClick={() => handleShowState(1)}>Overview</button>
        <button onClick={() => handleShowState(2)}>Node Info</button>
      </div>
      <hr />
      {show === showState[0]
        ? renderIntroParagraph()
        : show === showState[1]
        ? renderOverview()
        : renderNodeInfo()}
    </div>
  );
};
