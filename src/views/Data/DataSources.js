import React from "react";

class DataSources extends React.Component {

    render () {
        return (
            <section id="datasources" className="header relative items-center flex h-screen max-h-860-px">
                <div className="ml-auto mr-auto"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Data Sources
                  </h1>

                  {/*Data Source Downloads*/}
                  <div className="container mx-auto"
                        style={{marginTop: '150px'}}
                  >
                    <div className="justify-center flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4  -mt-24">
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-4/12 px-4">
                            <h5 className="text-xl font-semibold pb-4 text-center">
                                Harry Potter Data
                            </h5>
                            <a src="*" download="hp-data.zip">
                              <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                <img
                                  alt="..."
                                  className="align-middle border-none max-w-full h-auto rounded-lg"
                                  src={require("assets/img/harry-potter-books.jpg").default}
                                  style={{height: '200px'}}
                                />
                              </div>
                            </a>
                          </div>

                          <div className="w-full lg:w-4/12 px-4">
                            <h5 className="text-xl font-semibold pb-4 text-center">
                              Reddit Data
                            </h5>
                            <a src="*" download="reddit-data.zip">
                              <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                <img
                                  alt="..."
                                  className="align-middle border-none max-w-full h-auto rounded-lg"
                                  src={require("assets/img/redditdata.png").default}
                                  style={{height: '200px'}}
                                />
                              </div>
                            </a>
                          </div>

                          <div className="w-full lg:w-4/12 px-4">
                            <h5 className="text-xl font-semibold pb-4 text-center">
                                All Data
                            </h5>
                            <a src="*" download="all-data.zip">
                              <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                <img
                                  alt="..."
                                  className="align-middle border-none max-w-full h-auto rounded-lg"
                                  src={require("assets/img/combined-data.jpg").default}
                                  style={{height: '200px'}}
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/*Description*/}
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                      We have mainly worked with  two types of data. Raw text data from the 
                      Harry Potter books and more structured user data from the r/harrypotter subreddit.
                      We have had to clean the text data from the Harry Potter books and do some preprocessing 
                      to be able to create a network of the characters and analyze the sentiment in their communication. The Reddit user data
                      was a bit more structured, but we still had to clean the text in the user posts and we had to limit our
                      data extraction to a specific time interval to make the data extration possible. <br/>
                      Therefore, to save you from this terribly time comsuming process, we have provided the preprocessed data for you to download.
                      The data is available above and you can select parts of the data or just grab the whole thing to play around with.
                      If you want to learn about the data, before you download, read the sections about the data features and the preprocessing below.
                  </p>
                </div>
            </section>
        )
    }
}

export default DataSources;