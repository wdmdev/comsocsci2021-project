import React from "react";

class AnalysisSection extends React.Component {

    render () {
        return (
            <div id="analysis" className="container mx-auto overflow-hidden pb-40">
              <div className="flex flex-wrap items-center pt-20">
                <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
                  <div className="justify-center flex flex-wrap relative">
                    <div className="my-4 w-full lg:w-6/12 px-4">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScC-mrmWTTq-he2P9gQnuBt0asNqnq_QFzKdlle808gRcBTqg/viewform"
                        target="_blank"
                      >
                        <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                          <img
                            alt="Gryffindor shield"
                            className="shadow-md rounded-full max-w-full mx-auto p-2 bg-white"
                            src={require("assets/img/gryffindor.jpg").default}
                            style={{maxWidth:'100px'}}
                          />
                          <p className="text-lg text-white mt-4 font-semibold">
                            Gryffindor
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeCreFaPXobPjiNT2sh8qnWSgGcDUtHHisBYiAqi7QbZhDFeQ/viewform"
                        target="_blank"
                      >
                        <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                          <img
                            alt="..."
                            className="shadow-md rounded-full max-w-full mx-auto p-2 bg-white"
                            src={require("assets/img/ravenclaw.jpg").default}
                            style={{maxWidth:'100px'}}
                          />
                          <p className="text-lg text-white mt-4 font-semibold">
                            Ravenclaw
                          </p>
                        </div>
                      </a>
                    </div>
                    <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdH8ws4HF2RM2BQt_7pDtzXsNV7NivqTz2BCtIQrfYREzg9gg/viewform"
                        target="_blank"
                      >
                        <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                          <img
                            alt="..."
                            className="shadow-md rounded-full max-w-full mx-auto p-2 bg-white"
                            src={require("assets/img/hufflepuff.jpg").default}
                            style={{maxWidth:'100px'}}
                          />
                          <p className="text-lg text-white mt-4 font-semibold">
                            Hufflepuff
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfK7uJ8xm9QFO6DbvTBuxXNyXqmNMKeeOsPnyVX5nf-cIHGSA/viewform?c=0&w=1"
                        target="_blank"
                      >
                        <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                          <img
                            alt="..."
                            className="shadow-md rounded-full max-w-full mx-auto p-2 bg-white"
                            src={require("assets/img/slytherin.jpg").default}
                            style={{maxWidth:'100px'}}
                          />
                          <p className="text-lg text-white mt-4 font-semibold">
                            Slytherin
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i className="fas fa-drafting-compass text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Data Analysis
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                    In order to analyze the Harry Potter characters and r/harrypotter subreddit users, 
                    and to be able to compare them, we created a network for each using 
                    the <a className="text-blueGray-700 hover:text-blueGray-500" href="https://networkx.org/documentation/latest/index.html" target="_blank">networkx</a> python library.
                    The character network was based on interactions between Harry Potter characters and the reddit network was based on posts/comments 
                    between reddit users in the r/harrypotter subreddit forum.
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                    We then splitted the networks using modularity, which the interested reader can find more about in the notebooks. 
                    From this we looked at how our splits matched against the actual Hogwarts Houses of the characters and redditers.
                    Finally we looked at the words used by characters and reddit users from the different Hogwarts Houses 
                    and what feelings the words described. From this we were able to make a comparison of how the  
                    Hogwarts Houses in Harry Potter talk about each other and how the reddit Hogwarts Houses talk about each other.

                  </p>
                  <div className="block pb-6">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      NxNetwork
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Modularity
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      TF-IDF
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Louvain
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Sentiment Analysis
                    </span>
                  </div>
                  <a
                    href="/analysis"
                    className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
                  >
                    Read More{" "}
                    <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                  </a>
                </div>
              </div>
            </div>
        )
    }
}

export default AnalysisSection;