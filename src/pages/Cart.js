import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Checkout from "../parts/Cart/Checkout";
import Shipping from "../parts/Cart/Shipping";
import Footer from "../parts/Footer";
import Header from "../parts/Header";
import Sitemap from "../parts/Sitemap";
import Document from "../parts/Document";

export default function Cart() {
  return (
    <Document>
      <Header theme="dark" />
      <Breadcrumb
        list={[
          { url: "/", name: "Home" },
          { url: "/cart", name: "Shopping Cart" },
        ]}
      />

      <section className="md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex -mx-4 flex-wrap">
            <Checkout />
            <Shipping />
          </div>
        </div>
      </section>

      <Sitemap />
      <Footer />
    </Document>
  );
}
