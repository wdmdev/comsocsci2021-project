import React from "react";
import { Link } from "react-router-dom";

class InteractiveSection extends React.Component {

    render () {
        return (
          <>
           <div className="justify-center text-center flex flex-wrap mt-24">
              <div id="interactive" className="w-full md:w-6/12 px-12 md:px-4" style={{marginTop: '-250px'}}>
                <h2 className="font-semibold text-4xl">Insights and Interactive Demos</h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
                  We have gathered insights from the analysis plus some interactive networks for you to enjoy. <br/>
                  Take the demos we made for you and start playing around to learn more about the data!
                </p>
              </div>
            </div>

            <div className="container mx-auto">
              <div className="justify-center flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4  -mt-24">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-4/12 px-4">
                      <h5 className="text-xl font-semibold pb-4 text-center">
                       Plots and Stats 
                      </h5>
                      <Link to="/plotstats">
                        <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                          <img
                            alt="..."
                            className="align-middle border-none max-w-full h-auto rounded-lg"
                            src={require("assets/img/login.jpg").default}
                          />
                        </div>
                      </Link>
                    </div>

                    <div className="w-full lg:w-4/12 px-4">
                      <h5 className="text-xl font-semibold pb-4 text-center">
                        Wordclouds
                      </h5>
                      <Link to="/networks">
                        <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                          <img
                            alt="..."
                            className="align-middle border-none max-w-full h-auto rounded-lg"
                            src={require("assets/img/profile.jpg").default}
                          />
                        </div>
                      </Link>
                    </div>

                    <div className="w-full lg:w-4/12 px-4">
                      <h5 className="text-xl font-semibold pb-4 text-center">
                        Networks
                      </h5>
                      <Link to="/wordclouds">
                        <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                          <img
                            alt="..."
                            className="align-middle border-none max-w-full h-auto rounded-lg"
                            src={require("assets/img/landing.jpg").default}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
    }
}

export default InteractiveSection;