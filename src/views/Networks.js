import React from "react";

// Components
import HPNetwork from "components/Networks/HPNetwork.js";

class InteractiveSection extends React.Component {

    render() {
        return (
            <div className="container mx-auto py-40 hide-overflow">
              <div className="flex flex-wrap items-center">
                <div className="px-12 md:px-4 mr-auto ml-auto -mt-48 pt-20">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i className="fas fa-sitemap text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal"> The Character Network </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                        We have created a network using <a className="text-blueGray-700 hover:text-blueGray-500" href="https://pyvis.readthedocs.io/en/latest/" target="_blank">pyvis</a>. 
                        The network shows the Harry Potter character network. <br/>
                        Each node is a character with the color of their respective Hogwarts House. 
                        The edges are colored according to the sentiment in how the characters communicate with each other.
                        So green edges means positive communication between the characters, probably good friends, while red edges means... well they're not exactly friends.
                  </p>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                    {/* Pyvis Harry Potter Character Network */}
                    <HPNetwork network='assets/networks/HPNetwork.js' id='HPNetwork'/> 
                    <blockquote className="relative p-8 mb-4" >
                      <h4 className="text-xl font-bold text-white">
                        Explore the character network of Harry Potter - Click on the graph to interact!
                      </h4>
                      <p className="text-md font-light mt-2 text-white">
                        Hover over edges and nodes to see their attributes. <br/>
                        You can filter out nodes and edges by selecting and deleting them. (Click or Ctrl + Click for multiselect)<br/> 
                        Click around pull the nodes and investigate the network of Harry Potter! <br/>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default InteractiveSection;