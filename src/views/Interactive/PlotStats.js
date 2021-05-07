import React from "react";

// Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

class PlotStats extends React.Component{

    render () {
        return (
            <>
                <IndexNavbar/>
                <div className="container mx-auto py-40 hide-overflow">
                  <div className="flex flex-wrap items-center">
                    <div className="px-12 md:px-4 mr-auto ml-auto -mt-48"
                        style={{paddingTop: '150px'}}
                    >
                      <h3 className="text-3xl mb-2 font-semibold leading-normal"> Plots and Insights </h3>
                      <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                          Just a couple of extra plots for you to look at and maybe even enjoy.
                      </p>

                      <h3 className="text-2xl mb-2 font-semibold leading-normal"
                              style={{textAlign: 'center', marginTop: '100px'}}
                      > 
                      Harry Potter's Emotions Against Other Characters </h3>
                      <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                          As they were found by our extraction of character interactions through all the seven 
                          Harry Potter books.
                      </p>

                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg"
                      >

                        <img
                        className="rounded-lg block ml-auto mr-auto"
                        alt="Harry Potter Emotions"
                        src={require("assets/img/harry-emotions.png").default} 
                        />
                      </div>

                        <h3 className="text-2xl mb-2 font-semibold leading-normal"
                              style={{textAlign: 'center', marginTop: '100px'}}
                        > 
                        Extracted Happiness Over Time For All Seven Harry Potter Books
                         </h3>

                      <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                          Each book is displayed as a different color starting with book 1 from the left.
                      </p>

                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg"
                        >

                          <img
                          className="rounded-lg block ml-auto mr-auto"
                          alt="Harry Potter Happiness Timeline"
                          src={require("assets/img/happiness-timeline.png").default} 
                          />

                      </div>
                   </div>
                </div>
             </div>
            </>
        )
    }

}

export default PlotStats;