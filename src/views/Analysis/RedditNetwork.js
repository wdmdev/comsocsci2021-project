import React from "react";

class RedditNetwork extends React.Component {

    render () {
        return (
            <>
            <section id="reddit" className="header relative items-center">
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%', marginTop: '800px'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      The r/harrypotter Reddit Network
                  </h1>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  ></p>
                </div>
            </section>
        </>
      )
    }
}

export default RedditNetwork;