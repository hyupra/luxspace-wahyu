import React from "react";
import Client from "../parts/Client";
import Footer from "../parts/Footer";
import Header from "../parts/Header";
import Hero from "../parts/Hero";
import BrowseRoom from "../parts/Home/BrowseRoom";
import JustArrived from "../parts/Home/JustArrived";
import Sitemap from "../parts/Sitemap";
import Document from "../parts/Document";

export default function HomePage() {
  return (
    <Document>
      <Header theme="light" position="absolute" />
      <Hero />
      <BrowseRoom />
      <JustArrived />
      <Client />
      <Sitemap />
      <Footer />
    </Document>
  );
}
