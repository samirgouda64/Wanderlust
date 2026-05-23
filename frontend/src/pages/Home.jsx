import React, { useContext } from "react";
import Nav from "../Component/Nav";
import Card from "../Component/Card";
import CardSkeleton from "../Component/CardSkeleton";

import { listingDataContext } from "../Context/ListingContext";

function Home() {
  const { newListData, loading } = useContext(listingDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Nav />

      {/* Main Content */}
      <div className="px-5 md:px-10 lg:px-14 pt-[220px] md:pt-[170px] py-8">
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-4
            mb-12
          "
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 bg-gradient-to-b from-pink-500 to-orange-500 rounded-full"></div>
              <h2 className="text-4xl md:text-3xl font-bold text-gray-900">
                Popular Stays
              </h2>
            </div>
            <p className="text-gray-600 ml-5 text-md">
              Handpicked stays loved by travelers worldwide
            </p>
          </div>

          <button
            className="
              bg-gradient-to-r
              from-pink-500
              to-orange-500
              text-white
              font-semibold
              px-6
              py-2
              rounded-full
              shadow-lg
              hover:shadow-xl
              hover:scale-105
              transition-all
              duration-300
              w-fit
            "
          >
            View All →
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            xl:grid-cols-6
            gap-6
            md:gap-8
          "
        >
          {loading
            ? Array(10)
                .fill()
                .map((_, i) => <CardSkeleton key={i} />)
            : newListData?.map((list) => (
                <Card
                  key={list._id}
                  title={list.title}
                  landMark={list.landMark}
                  city={list.city}
                  image1={list.image1}
                  image2={list.image2}
                  image3={list.image3}
                  rent={list.rent}
                  id={list._id}
                  ratings={list.ratings}
                  isBooked={list.isBooked}
                  host={list.host}
                />
              ))}
        </div>

        {!loading && newListData?.length === 0 && (
          <div
            className="
              col-span-full
              w-full
              flex
              flex-col
              items-center
              justify-center
              py-32
              bg-gradient-to-br from-gray-50 to-gray-100
              rounded-3xl
              border-2 border-dashed border-gray-300
            "
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="empty"
              className="w-32 opacity-60 mb-4"
            />

            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              No Listings Found
            </h2>

            <p className="text-gray-600 mt-3 text-center text-lg max-w-md">
              Try another category or search for a different location
            </p>
          </div>
        )}
      </div>

      <footer
        className="
          mt-20
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
          text-white
          px-6
          md:px-12
          py-16
          border-t
          border-gray-700
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-12
            mb-12
          "
        >
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
              WanderLust
            </h2>

            <p className="text-gray-300 leading-7">
              Discover amazing places to stay around the world. Experience
              luxury, comfort, and unforgettable moments with WanderLust.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Explore</h3>

            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Villas
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Cabins
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Pool Houses
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Trending Stays
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Support</h3>

            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Help Center
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Privacy Policy
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Terms & Conditions
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                Contact Us
              </li>
            </ul>
          </div>
        </div>

        <div
          className="
            border-t
            border-gray-700
            pt-8
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-6
          "
        >
          <p className="text-gray-400 text-sm">
            © 2026 WanderLust, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-8 text-gray-400 text-sm">
            <span className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
              Privacy
            </span>
            <span className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
              Terms
            </span>
            <span className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
              Sitemap
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
