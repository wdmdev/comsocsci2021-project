import React from "react";

class Preprocessing extends React.Component {

    render () {
        return (
            <section id="preprocessing" className="pt-16 items-center flex"
                    style={{marginTop:'100px'}}
            >
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Preprocessing
                  </h1>


                  <h3 className="text-2xl mb-2 font-semibold leading-normal" style={{textAlign:'center', marginTop: '50px'}} >
                      Character Extraction
                  </h3>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                        We used the character names that we selected as search words 
                        to see if we could find them in the chapters of the books, where they appear.
                        Because the characters can be called by different names and nicknames we "normalized" 
                        the names in the book text. We made it so that all names and nicknames are replaced 
                        with the corresponding first name of the character in lower case e.g. 'voldemort' is sometimes called 
                        'voldemort' or 'he-who-must-not-be-names' or 'tom riddle'. We mapped them all to 'voldemort'.
                        After solving the 'nickname challenge' we used information about the characters' Hogwarts Houses, 
                        again scraped from hp-lexicon.org, top map each character with their respective House. The interested
                        reader can find a more in depth explanation of this in the notebooks.
                  </p>

                  <h3 className="text-2xl mb-2 font-semibold leading-normal" style={{textAlign:'center', marginTop: '50px'}} >
                      Finding Character Interactions
                  </h3>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                    To find interactions between characters in a book might seem simple at first, 
                    but to do this automatically... has perhaps been the most cumbersome and discussed subject in 
                    the progress of making this notebook.
                    We have defined an interaction from some character A to another character B as a sentence spoken by A to B.
                    Every chapter of the books is divied into paragraphs in which (with a fairly high certainty) only 1 charater 
                    speaks. By finding this character we have the 'source' of the interaction.
                    This is unfortunately not a trivial task. In many paragraphs the subject is 'he' or 'she'
                    and the 'speaker' has to be inferred from the context. <br/>
                    To tackle this problem we made the following heuristic: If a paragraph includes speech the 
                    first character to be mentioned in the context (outside of the speech) is the source of the interaction.
                    The heuristic is in no way bulletproof but it works most of the way since in the majority of 
                    paragraphs with speech, the speech is followed by 'said A' or 'asked A' etc.
                    Detecting the target is even more troublesome as the target more often than not is not even
                    mentioned in the paragraph. Mostly the target is a person who has just spoken 
                    or is about to speak, thus we made the following heuristic for detecting the 
                    target: The target of an interaction is the source of 1 or more of the previous 2 
                    or preceeding 2 interactions. For the the technical reader we recommend looking into the actual code around
                    descriptions of the notebooks to understand these definitions and how they were implemented. For the 
                    more 'causual reader' we can boil it down to this: Understanding the context of communication is very difficult
                    to program! So some of the interactions that we have found between the Harry Potter characters might be prone to error.
                </p>

                </div>
            </section>
        )
    }
}

export default Preprocessing;