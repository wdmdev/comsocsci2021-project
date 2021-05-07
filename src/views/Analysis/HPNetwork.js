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
                  ></p>
                </div>
            </section>
        </>
      )
    }
}

export default HPNetwork;
