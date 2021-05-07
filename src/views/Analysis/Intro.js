import React from "react";

class Intro extends React.Component {

    render () {
        return (
            <section className="header relative items-center flex h-screen max-h-860-px">
                <div className="ml-auto mr-auto"
                     style={{width:'70%', marginTop: '-100px'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                     Data Analysis 
                  </h1>
                  
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                    This page contains the main highlights of our analysis of the Harry Potter Network and the
                    user network from r/harrypotter. A deeper dive into the data and code can be found from 
                    downloading the notebooks.
                  </p>
                 </div>
             </section>
        )
    }
}

export default Intro;