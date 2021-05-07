import React from "react";

//Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DataSources from "views/Data/DataSources.js";
import HarryPotterData from "views/Data/HarryPotterData";
import RedditData from "views/Data/RedditData.js";

class Data extends React.Component {

    render () {
        return (
            <>
                <IndexNavbar/>
                <DataSources/>
                <section id="features" className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
                    <HarryPotterData/>
                    <RedditData/>
                </section>
            </>
        )
    }
}

export default Data;