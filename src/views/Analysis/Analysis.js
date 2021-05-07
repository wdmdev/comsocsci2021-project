import React from "react";

//Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

//Views
import HPNetwork from "views/Analysis/HPNetwork.js";
import RedditNetwork from "views/Analysis/RedditNetwork.js";

class Analysis extends React.Component {

    render () {
        return (
            <>
                <IndexNavbar/>
                <HPNetwork />
                <RedditNetwork />
            </>
        )
    }
}

export default Analysis;