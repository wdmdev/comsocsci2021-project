import React from "react";

class DataSection extends React.Component {

    render () {
        return (
            <div id="data" className="container mx-auto overflow-hidden pb-20">
              <div className="flex flex-wrap items-center">
                <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                      Data
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                    Every element that you need in a product comes built in as a
                    component. All components fit perfectly with each other and can
                    have different colours.
                  </p>
                  <div className="block pb-6">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Buttons
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Inputs
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Labels
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Menus
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Navbars
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Pagination
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Progressbars
                    </span>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                      Typography
                    </span>
                  </div>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index"
                    target="_blank"
                    className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
                  >
                    View All{" "}
                    <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                  </a>
                </div>
                {/*Images*/}
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
                  <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                    <img
                      alt="..."
                      src={require("assets/img/component-btn.png").default}
                      className="w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 left-145-px -top-29-px"
                    />
                    <img
                      alt="..."
                      src={require("assets/img/component-profile-card.png").default}
                      className="w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                    />
                    <img
                      alt="..."
                      src={require("assets/img/component-info-card.png").default}
                      className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px -top-225-px left-40-px z-2"
                    />
                    <img
                      alt="..."
                      src={require("assets/img/component-info-2.png").default}
                      className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                    />
                    <img
                      alt="..."
                      src={require("assets/img/component-menu.png").default}
                      className="w-full align-middle rounded absolute shadow-lg max-w-580-px -left-20-px top-210-px"
                    />
                    <img
                      alt="..."
                      src={require("assets/img/component-btn-pink.png").default}
                      className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                    />
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default DataSection;