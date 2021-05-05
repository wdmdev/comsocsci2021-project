import React from "react";

class GithubStarSection extends React.Component {

    render () {
        return (
            <>
                <div
                  className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
                  style={{ transform: "translateZ(0)" }}
                >
                  <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="text-blueGray-200 fill-current"
                      points="2560 0 2560 100 0 100"
                    ></polygon>
                  </svg>
                </div>

                <div className="container mx-auto">
                  <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
                    <div className="w-full text-center lg:w-8/12">
                      <p className="text-4xl text-center">
                        <span role="img" aria-label="love">
                          😍
                        </span>
                      </p>
                      <h3 className="font-semibold text-3xl">
                        Do you love this project?
                      </h3>
                      <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                        Cause if you do, we would greatly appreciate your support. <br/>
                        Hit the button below to give this project a star on Github!
                      </p>
                      <div className="sm:block flex flex-col mt-10">
                        <a
                          href="https://github.com/wdmdev/comsocsci2021-project"
                          target="_blank"
                          className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                        >
                          <i className="fab fa-github text-lg mr-1"></i>
                          <span>Help With a Star</span>
                        </a>
                      </div>
                      <div className="text-center mt-16"></div>
                    </div>
                  </div>
                </div>
            </>
        )
    }
}

export default GithubStarSection;