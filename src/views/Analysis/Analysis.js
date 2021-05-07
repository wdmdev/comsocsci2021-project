import React from "react";

//Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

//Views
import Intro from "views/Analysis/Intro.js";
import HPNetwork from "views/Analysis/HPNetwork.js";
import RedditNetwork from "views/Analysis/RedditNetwork.js";

class Analysis extends React.Component {

    render () {
        return (
            <>
                <IndexNavbar/>
                <Intro/>
                <HPNetwork />
                <RedditNetwork />
            </>
        )
    }
}

export default Analysis;