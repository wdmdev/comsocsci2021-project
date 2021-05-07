import React from "react";

class Comparison extends React.Component {

    render () {
        return (
            <>
            <section id="comparison" className="header relative items-center">
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Comparing the Hary Potter Character and Reddit User Interaction Emotions 
                  </h1>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                      Of course we cannot stop with the word clouds and the unclarity of how the 
                      characters and reddit users compare in communication. So we found a lexicon of feelings
                      expressed by specific words. And made a plot of the feelings expressed by each Hogwarts House 
                      when interacting with other houses both in Harry Potter and for the Reddit users.
                  </p>

                  <img
                  className="rounded-lg block ml-auto mr-auto"
                  alt="Harry Potter Interaction Emotions Plot"
                  src={require("assets/img/hp-emotions.png").default} 
                  />

                  <img
                  className="rounded-lg block ml-auto mr-auto"
                  alt="Harry Potter Interaction Emotions Plot"
                  src={require("assets/img/reddit-emotions.png").default} 
                  style={{marginTop:'100px'}}
                  />

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                      The plots do not show significant similarities between the emotions of the 
                      Harry Potter characters and the Reddit users. As, could be expected, the Reddit
                      user Hogwarts Houses generally express feelings towards all other houses. This makes sense
                      since we saw from the house-split heat map, that they also interact a lot more across 
                      houses than the fictional Harry Potter characters. <br/>
                      Many things might be said about these plots, but if we only look at the Reddit user
                      Hogwarts Houses, and compare them. It actually looks like they all have very similar 
                      distributions of emotions towards one another. This is of course only from eying the plots without any
                      real hard evidence. But, from this project's fairly limited analysis one conclusion 
                      might be, that the found evidence does not really support that being in a specific 
                      Hogwarts House Reddit community influence you to communicate like the fictional characters
                      of the community you associate yourself with.
                  </p>
                </div>
            </section>
        </>
      )
    }
}

export default Comparison;