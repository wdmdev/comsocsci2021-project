import React from "react";

//Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

class Wordclouds extends React.Component{
    render () {
        return (
            <>
                <IndexNavbar/>
            <div className="container mx-auto py-40 hide-overflow">
              <div className="flex flex-wrap items-center">
                <div className="px-12 md:px-4 mr-auto ml-auto -mt-48"
                    style={{paddingTop: '150px'}}
                >
                 Wordclouds under construction... 
                 </div>
                </div>
                </div>
            </>
        )
    }
}

export default Wordclouds;