import React from "react";

class HPNetwork extends React.Component {

    render () {
        return (
            <>
            <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      The Harry Potter Network
                  </h1>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                      So at this stage we have preprocessed the data. This has left us with a collection of characters
                      that we have extracted from the Harry Potter books, their Hogwarts Houses, and a mapping between 
                      these characters, that tells us if they have interacted in the text and if so what they said 
                      to each other. This data we can use to create a network of the characters where each
                      characters will be a node in the network with the attributes <em>name</em> and <em>house</em>.
                      And there will be edges between each node if an interaction have been found between them in the text.
                      <br/><br/>
                      Now first of all we want to test how well the Hogwarts Houses are actually defined 
                      from the network we have created. If the network can clearly be devided into groups/communities
                      that match the actual Hogwarts Houses this can strengthen our belief that the Harry Potter characters
                      do actually interact in a community fashion according to their houses.<br/>
                      The split is done using the <a className="text-blueGray-700 hover:text-blueGray-500" href="https://www.hp-lexicon.org/characters/#notable_characters" 
                      target="_blank">Louvain algorithm </a>. Here the optimal outcome would be that the split creates for 
                      communities, which consists of only characters from one specific Hogwarts House. In that case each of 
                      our splits would actually represent a Hogwarts House, and so the houses could likely be said to 
                      be very well defined through the interactions of the characters. 
                      Of course the reality is always a little more "muddy" as you can see in the figure below.
                  </p>

                  <img
                  className="rounded-lg block ml-auto mr-auto"
                  alt="Louvain heat map"
                  src={require("assets/img/louvainHeatMap.png").default} 
                  />
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                      So what we see is, that the splits are not perfect... at all. But, there are actually some
                      interesting things to notice. First the Louvain actually created five splits indicating 
                      that more communities exists than just the Hogwarts Houses, which makes sense, since 
                      the characters interact between their houses.  Secondly, it seems that Slytherin clearly 
                      constitutes the largest portion of community split 4 and that they are not "mingling" 
                      so much with the other community splits. Which taking the story's description of "Slytheriners" 
                      sounds quite reasonable. Now community 0 looks a lot like a mainly Gryffindor group of characters 
                      and could support a Gryffindor community in the interactions of the characters.
                      Community 1 is a bit more mixed, but looks like a very "Hufflepuff friendly" gathering. While community
                      2 is is likely the main Ravenclaw group, but still very mixed with other houses. Now split 3 looks
                      a lot like "the odd one out" with low Hogwarts House percent for all houses. An idea could be that this 
                      split represents a group of relatively very few characters from different houses that often work together.
                      This could for instance be the case with <a className="text-blueGray-700 hover:text-blueGray-500" 
                      href="https://en.wikipedia.org/wiki/Order_of_the_Phoenix_(fictional_organisation)#Members_of_the_Order"
                      target="_blank">'The Order of the Phoenix'</a>... Anyways it looks like we can, at least vaguely, 
                      identify similarities in the splits and the actual hogwarts houses. And say that 
                      the Hogwarts House seems, to some degree, to be defined by the characters network. 
                      Again a more technical perspective using modularity and a random network simulation 
                      can be found in the notebooks. 
                  </p>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                      Now we want to look a little closer at the Hogwarts Houses and the words each house uses.
                      For this we did a <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf" target="_blank"
                      >Term Frequency Inverse Document Frequency(TF-IDF)</a> analysis. Which is a fancy way of saying
                      that we found out how important/special the words used by each Hogwarts House were and used that to
                      select the words which, according to the TF-IDF, provides the most information about each Hogwarts House.
                      From these selected words we created the word clouds below.
                  </p>

                  

                </div>
            </section>
        </>
      )
    }
}

export default HPNetwork;
