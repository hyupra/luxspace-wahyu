import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Congratulation from "../parts/success/success";
import Header from "../parts/Header";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import Document from "../parts/Document";

export default function Congrats() {
  return (
    <Document>
      <Header />
      <Breadcrumb
        list={[
          { url: "/", name: "Home" },
          { url: "/success", name: "Success Checkout" },
        ]}
      />
      <Congratulation />
      <Sitemap />
      <Footer />
    </Document>
  );
}
