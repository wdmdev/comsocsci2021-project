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
                      <h3 className="text-3xl mb-2 font-semibold leading-normal"> Word Clouds </h3>
                      <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                          Take your time and explore the word clouds created from Harry Potter Hogwarts Houses and
                          Reddit users in Hogwarts Houses from the r/harrypotter subreddit.
                      </p>

                      <h3 className="text-2xl mb-2 font-semibold leading-normal"
                            style={{textAlign: 'center'}}
                      > 
                      Harry Potter Hogwarts Houses </h3>

                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg"
                      >

                        <img
                        className="rounded-lg block ml-auto mr-auto"
                        alt="Word clouds harry potter houses"
                        src={require("assets/img/hp-wordclouds-houses.png").default} 
                        />
                      </div>

                        <h3 className="text-2xl mb-2 font-semibold leading-normal"
                              style={{textAlign: 'center'}}
                        > 
                        Reddit r/harrypotter Hogwarts Houses </h3>

                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg"
                        >

                          <img
                          className="rounded-lg block ml-auto mr-auto"
                          alt="Word clouds reddit hogwarts houses"
                          src={require("assets/img/reddit-wordclouds-houses.png").default} 
                          />

                      </div>
                   </div>
                </div>
             </div>
            </>
        )
    }
}

export default Wordclouds;