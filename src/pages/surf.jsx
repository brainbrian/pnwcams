import * as React from "react";

import Category from "../components/Category";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { links, locations } from "../data/surf.json";

const SurfPage = () => (
  <>
    <Header />
    <main className="main-content">
      <Category links={links} locations={locations} />
    </main>
    <Footer />
  </>
);

export default SurfPage;
