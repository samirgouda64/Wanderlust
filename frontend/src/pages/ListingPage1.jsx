import React, { useContext } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage1() {
  let navigate = useNavigate();

  let {
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
  } = useContext(listingDataContext);

  const [imageNames, setImageNames] = React.useState({
    image1: "",
    image2: "",
    image3: "",
  });


  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
    setImageNames((p) => ({ ...p, image1: file.name }));
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
    setImageNames((p) => ({ ...p, image2: file.name }));
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
    setImageNames((p) => ({ ...p, image3: file.name }));
  };

return (
  <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-white to-pink-50 flex items-center justify-center relative">
    
    {/* BACK */}
    <div
      className="w-[40px] h-[40px] bg-white/80 backdrop-blur hover:bg-white cursor-pointer absolute top-4 left-4 rounded-full flex items-center justify-center shadow-lg transition"
      onClick={() => navigate("/")}
    >
      <FaArrowLeftLong className="w-[16px] h-[16px] text-red-500" />
    </div>

    {/* FORM */}
    <form
      className="max-w-[750px] w-[92%] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col gap-4 mt-16 border border-white/40"
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/listingpage2");
      }}
    >
      {/* SECTION */}
      <div className="text-red-400 text-[15px] uppercase tracking-widest text-center">
        SetUp Your Home
      </div>

      {/* TITLE */}
      <div className="flex flex-col gap-1 group">
        <label className="text-gray-600 text-[14px]">Title</label>
        <input
          type="text"
          className="h-[38px] border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition group-hover:border-red-300"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title of the Place..."
        />
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-1 group">
        <label className="text-gray-600 text-[14px]">Description</label>
        <textarea
          className="h-[60px] border rounded-lg px-3 py-1 text-[14px] focus:ring-2 focus:ring-red-300 outline-none resize-none transition group-hover:border-red-300"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Tell what makes your place special..."
        />
      </div>

      {/* SECTION */}
      <div className="text-gray-400 text-[12px] uppercase tracking-widest">
        Upload Images
      </div>

      {/* IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: "Image1", key: "image1", handler: handleImage1 },
          { label: "Image2", key: "image2", handler: handleImage2 },
          { label: "Image3", key: "image3", handler: handleImage3 },
        ].map((img, i) => (
          <label
            key={i}
            className={`flex flex-col items-center justify-center gap-1 h-[70px] border-2 rounded-xl cursor-pointer transition text-center
            ${imageNames[img.key]
              ? "border-green-400 bg-green-50"
              : "border-dashed hover:border-red-400 hover:bg-red-50"}`}
          >
            <span className="text-[12px] text-gray-500">{img.label}</span>

            <span
              className={`text-[11px] w-[90%] truncate ${
                imageNames[img.key] ? "text-green-700" : "text-red-400"
              }`}
            >
              {imageNames[img.key] || "Click to upload"}
            </span>

            <input
              type="file"
              className="hidden"
              required
              onChange={img.handler}
            />
          </label>
        ))}
      </div>


      {/* SECTION */}
      <div className="text-gray-400 text-[12px] uppercase tracking-widest">
        Location & Pricing
      </div>

      {/* RENT / CITY / LANDMARK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1 group">
          <label className="text-gray-600 text-[14px]">Rent</label>
          <input
            type="number"
            className="h-[38px] border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition group-hover:border-red-300"
            required
            onChange={(e) => setRent(e.target.value)}
            value={rent}
            placeholder="₹ Rent.."
          />
        </div>

        <div className="flex flex-col gap-1 group">
          <label className="text-gray-600 text-[14px]">City</label>
          <input
            type="text"
            className="h-[38px] border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition group-hover:border-red-300"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="City..."
          />
        </div>

        <div className="flex flex-col gap-1 group">
          <label className="text-gray-600 text-[14px]">Landmark</label>
          <input
            type="text"
            className="h-[38px] border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition group-hover:border-red-300"
            required
            onChange={(e) => setLandMark(e.target.value)}
            value={landMark}
            placeholder="Land Mark..."
          />
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end mt-3">
        <button className="w-[150px] py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[15px] rounded-xl hover:shadow-xl hover:scale-[1.03] transition font-medium tracking-wide">
          Next →
        </button>
      </div>

    </form>
  </div>
);


}

export default ListingPage1;
