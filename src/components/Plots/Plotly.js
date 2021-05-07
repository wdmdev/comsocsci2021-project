import React from "react";
import Plot from "react-plotly.js";

class Plotly extends React.Component {
  render() {
    return (
      <Plot
        data={this.props.json.data}
        layout={this.props.json.layout}
        style={{alignContent: 'center'}}
      />
    );
  }
}

export default Plotly;