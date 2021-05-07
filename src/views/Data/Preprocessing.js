import React from "react";

class Preprocessing extends React.Component {

    render () {
        return (
            <section id="preprocessing" className="header relative pt-16 items-center flex h-screen max-h-860-px">
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Preprocessing
                  </h1>


                  <h3 className="text-2xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Character Extraction
                  </h3>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                        We use the character names that we scraped from the web as search words 
                        to see if we can find them in each chapter, where they appear.
                        Because the characters can be called by different names and nicknames we "normalize" 
                        the names in the book text to begin with. We make it so all names and nicknames are replaced 
                        with the corresponding first name of the character in lower case e.g. 'voldemort' is sometimes called 
                        'voldemort' or 'he-who-must-not-be-names' or 'tom riddle'. We map them all to 'voldemort'
                        The Hogwarts Houses of characters dictionary scraped from HP-lex.org is 'reversed' from House to list 
                        of characters to Charater to House in order to map the characters to their houses.
                        Some rather unknown or unimportant characters are making this hard. For instance, Albus Potter is the son of 
                        Harry Potter but he cannot be mapped to neither Albus nor Harry for obvious reasons. 
                        He is simply removed from the network. This is handled in the function get_names.
                        The file books_in_chapters_names are the books split into chapters and nicknames substituted with first names
                  </p>

                  <h3 className="text-2xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Finding Character Interactions
                  </h3>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                    To automatically find interactions between characters in a book seems simple at first 
                    but has perhaps been the most cumbersome and discussed subject in the progress of making this notebook...
                    We have defined an interaction from character A to character B by a sentence spoken by A to B.
                    Every chapter of the books is divied into paragraphs in which (with a high certainty) only 1 charater 
                    speaks. By finding this character we have the 'source' of the interaction.
                    This is unfortunately not a trivial task. In many paragraphs the subject is 'he' or 'she' 
                    refering to some formerly mentioned character or the paragraph is only a 'spoken sentence' 
                    and the 'speaker' has to be inferred from the context.
                    To tackle this problem we made the following heuristic: if a paragraph includes speech the 
                    first character to mentioned in the context (outside of the speech) is the soruce of the interaction
                    The heuristic is in no way bulletproof but it works most of the way since in the majority of 
                    paragraphs with speech, the speech is followed by 'said A' or 'asked A' etc.
                    Detecting the target is even more troublesome as the target more often than not is not 
                    mentioned in the paragraph. Mostly the target is a person who has just spoken 
                    or is about to speak, thus the made the following heuristic for detecting the 
                    target: the target of an interaction is the source of 1 or more of the previous 2 
                    or preceeding 2 interactions. The result if a dictionary of dictonaries interactions 
                    in which interactions[Source][Target] gives all the interactions between Source and Target
                  </p>

                </div>
            </section>
        )
    }
}

export default Preprocessing;