import React from 'react';

//Style
import 'vis-network/styles/vis-network.css';
import "assets/networks/HPNetwork.css";
import drawGraph from 'assets/networks/HPNetwork.js';

class HPNetwork extends React.Component {

    componentDidMount() {
        drawGraph()
    }

    render () {
        return (
            <div className="HPNetwork" ref={el => (this.div = el)}>        
                <div id = {this.props.id}></div>
                {/* Script is inserted here */}
            </div>
        )
    }

}

export default HPNetwork;