import React from "react";

//Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

//Views
import Intro from "views/Analysis/Intro.js";
import HPNetwork from "views/Analysis/HPNetwork.js";
import RedditNetwork from "views/Analysis/RedditNetwork.js";
import Comparison from "views/Analysis/Comparison.js";

class Analysis extends React.Component {

    render () {
        return (
            <>
                <IndexNavbar/>
                <Intro/>
                <HPNetwork />
                <RedditNetwork />
                <Comparison />
            </>
        )
    }
}

export default Analysis;