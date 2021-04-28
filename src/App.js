import './App.css';
import React from 'react';
import JupViewer from './components/JupViewer'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <br/>
        <h1> 
          02467 - Computational Social Science 2021 <br/>
          Technical University of Denmark
        </h1>
        <br/>
        <h1>
          Harry Potter Network Analysis
        </h1>
        <JupViewer file="https://raw.githubusercontent.com/wdmdev/comsocsci2021-project/main/notebook.ipynb" />
      </div>
    )
  }
}


export default App;
