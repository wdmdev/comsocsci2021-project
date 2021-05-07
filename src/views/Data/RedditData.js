import React from "react";

//Components
import Plotly from "components/Plots/Plotly.js";

class RedditData extends React.Component {

    render () {
        return (
            <>
            <section className="header relative pt-16 items-center flex h-screen max-h-860-px"
                    style={{marginTop: '100px'}}
            >
                <div className="ml-auto mr-auto mt-48"
                     style={{width:'70%'}}
                >
                  <h1 className="text-5xl mb-2 font-semibold leading-normal" style={{textAlign:'center'}} >
                      Reddit User Data
                  </h1>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify', marginBottom: '50px'}}
                  >
                    We have gathered an overview of the features we have chosen to extract from the r/harrypotter 
                    subreddit. Also we have made a division of the users by their respective r/harrypotter Hogwarts Houses.
                    We had to use the r/harrypotter subreddit, as the subreddits for the specific Hogwarts Houses are private.
                  </p>

                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Features
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                      We have extracted all posts/submissions on the r/harrypotter in the time periode
                      1st of January 2020 to 5th of May 2021, which gave a total of 7675 posts.
                      We wanted to investigate dedicated users, as we deemed them representative of their Hogwarts House,
                      and also most likly to be influenced by their Hogwarts House through their high involvement in the forum.
                      From this we chose the top 100 most popular users, defined as the ones with the most comments
                      on their posts. This gave us the following distribution of users among Hogwarts houses
                  </p>

                  <Plotly json={require("assets/plots/redditusers-by-house.json")} />

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
                    style={{textAlign:'justify'}}
                  >
                      We then looked at other reddit forums where these users were also active with posting and commenting.
                      From this we chose the top 20 reddit forums for each r/harrypotter Hogwarts House. These we defined
                      as the 20 reddit forums where the most popular users from each Hogwarts House had posted the most. 
                      This left us with a lot of text data from posts and comments for each Hogwarts House. This we cleaned
                     , mostly jusft for stop words, and used for the analysis.
                  </p>

                </div>
            </section>
            </>
        )
    }
}

export default RedditData;