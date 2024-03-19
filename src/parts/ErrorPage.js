import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({
  title = "404 NOT FOUND",
  body = "Looks like the page you are trying to find is not available",
}) {
  return (
    <section className="">
      <div className="container mx-auto min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full md:w-4/12 text-center">
            <img src="/images/content/notfound.svg" alt="Page not found" />
            <h2 className="text-3xl font-semibold mt-10 mb-6">{title}</h2>
            <p className="text-lg mb-12">{body}</p>
            <Link
              to="/"
              className="text-gray-900 bg-red-200 focus:outline-none w-full py-3 rounded-full text-lg focus:text-black transition-all duration-200 px-8 cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
