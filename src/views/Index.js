/*eslint-disable*/
import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IntroSection from "components/Sections/IntroSection.js";
import DataSection from "components/Sections/DataSection.js";
import AnalysisSection from "components/Sections/AnalysisSection.js";
import InteractiveSection from "components/Sections/InteractiveSection.js";
import GithubStarSection from "components/Sections/GithubStarSection.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      {/*Intro with download button, github and image*/}
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <IntroSection/>
      </section>

      {/*Section containing the actual information of the project process*/}
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <DataSection/>
        <AnalysisSection/>
      </section>

      {/*Section containing links to interactive pages to try out networks and wordclouds*/}
      <section className="block relative z-1 bg-blueGray-600 pb-40">
        <InteractiveSection/>
      </section>

      {/*Star on Github section*/}
      <section className="pb-16 bg-blueGray-200 relative pt-32" style={{marginTop: '200px'}}>
        <GithubStarSection/>
      </section>

      {/*Contact info, license, and copyright*/}
      <Footer />
    </>
  );
}
