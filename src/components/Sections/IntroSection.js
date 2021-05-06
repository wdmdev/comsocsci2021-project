import React from "react";

class IntroSection extends React.Component {

    render () {
        return (
            <>
                <div className="container mx-auto items-center flex flex-wrap">
                <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                    <div className="pt-32 sm:pt-0">
                    <h2 className="font-semibold text-4xl text-blueGray-600">
                        Harry Potter Network Analysis
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                        We have created a network analysis of the original 7 Harry Potter books and combined them
                        with a network analysis of 
                        the <a className="text-blueGray-700 hover:text-blueGray-500" href="https://www.reddit.com/r/harrypotter/" target="_blank">r/harrypotter</a> 
                        subreddit. Scroll down the page to see what we found or take a look at the Jupyter Notebook to get 
                        behind the scenes of the more technical stuff.
                    </p>
                    <div className="mt-12">
                        <a
                        href={require("assets/files/notebook.zip").default}
                        download = "HP_network_notebook.zip"
                        className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                        >
                        Download Notebook
                        </a>
                        <a
                        href="https://github.com/wdmdev/comsocsci2021-project"
                        className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                        target="_blank"
                        >
                        Github Code
                        </a>
                    </div>
                    </div>
                </div>
                </div>

                <img
                className="rounded-lg absolute shadow b-auto right-0 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
                src={require("assets/img/HP_houses.jpg").default}
                style={{marginTop: '-4%', marginRight: '4%', width: '700px'}}
                alt="Harry Potter Hogwarts Houses Cartoon"
                />
            </>
        )
    }
}

export default IntroSection;