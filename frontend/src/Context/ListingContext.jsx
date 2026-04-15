import React, { useEffect } from "react";
import { useContext } from "react";
import { useState, createContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const listingDataContext = createContext();

function ListingContext({ children }) {
  let navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landMark, setLandMark] = useState("");
  let [category, setCategory] = useState("");
  let [adding, setAdding] = useState(false);
  let [updating, setUpdating] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [newListData, setNewListData] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let [searchData, setSearchData] = useState([]);

  const [loading, setLoading] = useState(true);

  let { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    const fetchAllListings = async () => {
      setLoading(true);
      await getListing();
      setLoading(false);
    };

    fetchAllListings();
  }, []);

  const handleAddListing = async () => {
    setAdding(true);

    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landMark);
      formData.append("category", category);

      let result = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
      });
      setAdding(false);
      // console.log(result);
      navigate("/");
      toast.success("AddListing Successfully");
      setTitle("");
      setDescription("");
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandMark("");
      setCategory("");
    } catch (error) {
      setAdding(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true },
      );
      // console.log(result)
      setCardDetails(result.data);
      navigate("/viewcard");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSearch = async (data) => {
  //   try {
  //     let result = await axios.get(
  //       serverUrl + `/api/listing/search?query=${data}`);
  //       setSearchData(result.data);
  //   } catch (error) {
  //     setSearchData(null)
  //     console.log(error);
  //   }
  // }

  const handleSearch = async (data) => {
    if (!data || !data.trim()) {
      setSearchData([]);
      return;
    }

    try {
      let result = await axios.get(
        serverUrl + `/api/listing/search?query=${data.trim()}`,
      );
      setSearchData(result.data);
    } catch (error) {
      setSearchData([]);
      console.log(error);
    }
  };

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAllListings = async () => {
      setLoading(true);
      await getListing();
      setLoading(false);
    };

    fetchAllListings();
  }, [adding, updating, deleting]);

  let value = {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landMark,
    setLandMark,
    category,
    setCategory,
    handleAddListing,
    adding,
    setAdding,
    listingData,
    setListingData,
    getListing,
    newListData,
    setNewListData,
    handleViewCard,
    cardDetails,
    setCardDetails,
    updating,
    setUpdating,
    deleting,
    setDeleting,
    handleSearch,
    searchData,
    setSearchData,
    loading,
    setLoading,
  };
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
}

export default ListingContext;
