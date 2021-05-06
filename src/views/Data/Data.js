import React from "react";

//Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DataSources from "views/Data/DataSources.js";
import Features from "views/Data/Features.js";
import Preprocessing from "views/Data/Preprocessing.js";

class Data extends React.Component {

    render () {
        return (
            <>
                <IndexNavbar/>
                <DataSources/>
                <Features/>
                <Preprocessing/>
            </>
        )
    }
}

export default Data;