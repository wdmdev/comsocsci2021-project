import React from "react";

//Components
import Plotly from "components/Plots/Plotly.js";


class Features extends React.Component {

    render () {
        return (
            <>
            <section id="features" className="header relative pt-16 items-center flex h-screen max-h-860-px">
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Features
                  </h1>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                    We have gathered an overview of the properties and features of each data set after preprocessing.
                  </p>

                  <h3 className="text-2xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Harry Potter Books
                  </h3>
                  <Plotly json={require("assets/plots/characters-by-house.json")}/>

                </div>
            </section>
            </>
        )
    }
}

export default Features;