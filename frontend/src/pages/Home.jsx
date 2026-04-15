import React, { useContext } from "react";
import Nav from "../Component/Nav";
import { listingDataContext } from "../Context/ListingContext";
import Card from "../Component/Card";
import CardSkeleton from "../Component/CardSkeleton";

function Home() {
  let { listingData, setListingData, newListData, loading } =
    useContext(listingDataContext);
  const isLoading = !newListData || newListData.length === 0;

  return (
    <div>
      <Nav />
      <div className="w-[100vw] h-[40vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]">
        {loading
          ? Array(8)
              .fill()
              .map((_, i) => <CardSkeleton key={i} />)
          : newListData.map((list) => (
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
    </div>
  );
}

export default Home;
