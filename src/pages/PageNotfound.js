import React from "react";
import ErrorPage from "../parts/ErrorPage";
import Footer from "../parts/Footer";
import Header from "../parts/Header";
import Sitemap from "../parts/Sitemap";
import Document from "../parts/Document";

export default function Notfound() {
  return (
    <Document>
      <Header />
      <ErrorPage />
      <Sitemap />
      <Footer />
    </Document>
  );
}
