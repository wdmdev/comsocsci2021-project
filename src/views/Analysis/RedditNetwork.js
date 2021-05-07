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
                  >
                      If we go through a similar process as above, but for the r/harrypotter Reddit users 
                      we can again perfor the community splits. This time the Louvain algorithm only 
                      splits in three communities. In the heat map below, we can see that the communities
                      are very mixed across the users' Hogwarts Houses. So the users interact quite a lot in
                      groups not defined by their associated house.
                  </p>

                  <img
                  className="rounded-lg block ml-auto mr-auto"
                  alt="Louvain heat map reddit users"
                  src={require("assets/img/reddit-louvainHeatMap.png").default} 
                  />

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                      And we, evaluate them and extract important words 
                      for the users associated with the different Hogwarts Houses. If we look at the word clouds for
                      the same houses as with the Harry Potter characters we get the figure below. The
                      rest of the reddit user word clouds can also be seen from the demo page section. 
                      And yes, they are shaped as Hogwarts House shields, just for your enjoyment!
                  </p>

                  <img
                  className="rounded-lg block ml-auto mr-auto"
                  alt="Word clouds reddit users"
                  src={require("assets/img/two-reddit-wordclouds.png").default} 
                  />
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                    This time the difference in communication is not that clear. This could be due to many things from the 
                    word selection to the extraction of user interactions and to not understanding the internal
                    language of the r/harrypotter community well enough. Or it could simply be, that the reddit users actually
                    speaks with another sentiment to each other that the characters in the books.
                 </p>
                </div>
            </section>
        </>
      )
    }
}

export default RedditNetwork;