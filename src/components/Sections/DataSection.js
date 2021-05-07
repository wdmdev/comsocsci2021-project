import React from "react";
import {Link} from "react-router-dom";

class DataSection extends React.Component {

    render () {
        return (
            <div id="datasection" className="container mx-auto overflow-hidden pb-20">
              <div className="flex flex-wrap items-center">
                <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                      Data
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                    We have worked on Harry Potter text data provided by a repository on Github and user data from 
                    the <a className="text-blueGray-700 hover:text-blueGray-500" href="https://www.reddit.com/r/harrypotter/" target="_blank">r/harrypotter</a> subreddit 
                    uptained using the <a className="text-blueGray-700 hover:text-blueGray-500" href="https://github.com/pushshift/api" target="_blank">PushShift API</a>. <br/>
                    We also got "help" from 
                    the <a className="text-blueGray-700 hover:text-blueGray-500" href="https://www.hp-lexicon.org/" target="_blank">Harry Potter Lexicon</a> and <a className="text-blueGray-700 hover:text-blueGray-500" href="https://harrypotter.fandom.com/wiki/List_of_chapters_in_the_Harry_Potter_novels" target="_blank">Harry Potter Wiki</a> by 
                    scraping their sites for information about important characters, their Hogwarts Houses and information about the book chapters.
                  </p>
                  <div className="block pb-6">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Raw Text Data
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Reddit User Data
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      PushShift API
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                     Web Scraping 
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Stop Word Cleaning
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Nickname Cleaning
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Character Extraction 
                    </span>
                  </div>
                  <Link
                    to="/data"
                    className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
                  >
                    Read More{" "}
                    <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                  </Link>
                </div>

                {/*Images*/}
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-10">
                  <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <a href="https://www.reddit.com/r/harrypotter/" target="_blank">
                        <img
                          alt="..."
                          src={require("assets/img/redditdata.png").default}
                          className="bg-white w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                          style={{marginTop: '30px'}}
                        />
                        <img
                          alt="..."
                          src={require("assets/img/reddit.svg").default}
                          className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                          style={{marginTop: '-90px', marginLeft: '20px'}}
                        />
                      </a>
                    </div>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <a href="https://github.com/khushmeeet/potter-nlp/tree/master/data" target="_blank">
                        <img
                          alt="..."
                          src={require("assets/img/githubdata.png").default}
                          className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-40-px z-2"
                          style={{marginTop: '-140px'}}
                        />
                        <img
                          alt="..."
                          src={require("assets/img/github-btn.png").default}
                          className="w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 left-145-px"
                          style={{marginTop: '-70px'}}
                        />
                      </a>
                    </div>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <a href="https://www.hp-lexicon.org/" target="_blank">
                        <img
                          alt="Harry Potter Lexicon Website Link"
                          src={require("assets/img/hplexicon.png").default}
                          className="w-full align-middle rounded absolute shadow-lg top-210-px"
                          style={{marginTop: '-180px', marginLeft:'-50px', maxWidth:"280px"}}
                        />
                        <img
                          alt="hplexicon logo"
                          src={require("assets/img/hplexicon-logo.png").default}
                          className="w-full align-middle rounded absolute shadow-lg z-3"
                          style={{marginTop: '90px', marginLeft: '80px', maxWidth: '180px'}}
                        />
                      </a>
                    </div>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <a href="https://harrypotter.fandom.com/wiki/List_of_chapters_in_the_Harry_Potter_novels" target="_blank">
                        <img
                          alt="Harry Potter Fandom Wiki Website Link"
                          src={require("assets/img/harrypotterfandomdata.png").default}
                          className="w-full align-middle rounded absolute shadow-lg top-210-px"
                          style={{marginTop: '-180px', marginLeft:'280px', maxWidth:"280px"}}
                        />
                        <img
                          alt="..."
                          src={require("assets/img/wiki-fandom-logo.webp").default}
                          className="w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 right-0"
                          style={{marginTop: '90px', marginRight: '-75px', maxHeight: '40px'}}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default DataSection;