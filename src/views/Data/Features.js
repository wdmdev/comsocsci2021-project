import React from "react";

//Components
import Plotly from "components/Plots/Plotly.js";


class Features extends React.Component {

    render () {
        return (
            <>
            <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Features
                  </h1>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                    We have gathered an overview of the properties and features of each data set after preprocessing. 
                    This information is more general in regards to the data volume, and what features we have used from the
                    the Reddit data. To get a little deeper view into our work with the data, go to the Analysis section.
                  </p>

                  <h3 className="text-2xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Harry Potter Books
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                    The raw text of the seven Harry Potter books is comprised of around 1,084,170 words.
                    The number of unique words in the books is close to 103,000. The books have around
                    60,000 sentences with an average sentence length of around 15 to 22 words. This information 
                    is gathered from the <a className="text-blueGray-700 hover:text-blueGray-500" 
                                        href="https://github.com/khushmeeet/potter-nlp" 
                                        target="_blank"> Github download page</a> of the book text data.
                    After webscraping hp-lexicon.org we got the characters seen in the bar chart below.
                  </p>

                  <Plotly json={require("assets/plots/characters-by-house.json")} />

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                      The distribution among houses was quite okay, but many of these characters were not particularly important, or only rarely mentioned in the books.
                      Therefore we selected a smaller set of characters, who frequently occurs in the books, from the list 
                      of <a className="text-blueGray-700 hover:text-blueGray-500" href="https://www.hp-lexicon.org/characters/#notable_characters" target="_blank"> Notable Characters</a> on hp-lexicon.
                      These characters are the onces we focus on in the analysis section.
                  </p>

                </div>
            </section>
            </>
        )
    }
}

export default Features;