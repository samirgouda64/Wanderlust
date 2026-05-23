import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/wanderlust_logo.png";

import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu, GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot, MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";

import axios from "axios";
import { toast } from "react-toastify";

function Nav() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);

  const { userData, setUserData } = useContext(userDataContext);

  const {
    listingData,
    setNewListData,
    searchData,
    handleSearch,
    handleViewCard,
  } = useContext(listingDataContext);

  const [showpopup, setShowpopup] = useState(false);
  const [cate, setCate] = useState("");
  const [input, setInput] = useState("");

  // CATEGORY SHOW/HIDE
  const [showCategory, setShowCategory] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const popupRef = useRef(null);

  // Logout
  const handleLogOut = async () => {
    try {
      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true },
      );

      setUserData(null);

      toast.success("Logout Successful");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Category Filter
  const handleCategory = (category) => {
    setCate(category);

    if (category === "trending") {
      setNewListData(listingData);
    } else {
      setNewListData(listingData.filter((list) => list.category === category));
    }
  };

  // Search
  useEffect(() => {
    handleSearch(input);
  }, [input]);

  // Search Card Click
  const handleClick = (id) => {
    handleViewCard(id);
    setInput("");
  };

  // Outside click close popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowpopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // HIDE CATEGORY ON SCROLL DOWN
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowCategory(false);
      } else {
        setShowCategory(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      {/* TOP NAVBAR */}
      <div className="h-[80px] flex items-center justify-between px-4 md:px-10 border-b border-gray-200 bg-white">
        {/* LOGO */}
        <div
          className="cursor-pointer flex items-center"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[120px] h-[100px] object-contain"
          />
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex relative z-[9999]">
          <div
            className="
              w-[420px]
              h-[45px]
              bg-gradient-to-r
              from-white
              to-gray-50
              border
              border-gray-300
              rounded-full
              shadow-md
              hover:shadow-lg
              transition-all
              duration-300
              flex
              items-center
              px-4
              py-2.5
            "
          >
            <FiSearch className="text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Anywhere | Any Location | Any City"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="
                flex-1
                outline-none
                bg-transparent
                px-4
                text-sm
                text-gray-700
              "
            />

            <button
              className="
                bg-gradient-to-r
                from-pink-500
                to-orange-500
                hover:from-pink-600
                hover:to-orange-600
                transition-all
                text-white
                p-2.5
                rounded-full
                shadow-md
                hover:shadow-lg
              "
            >
              <FiSearch className="text-sm" />
            </button>
          </div>

          {/* SEARCH RESULTS */}
          {searchData?.length > 0 && input !== "" && (
            <div
              className="
                absolute
                top-[110%]
                left-0
                w-full
                bg-white
                rounded-2xl
                shadow-2xl
                border
                border-gray-200
                overflow-hidden
                max-h-[400px]
                overflow-y-auto
                z-[9999]
              "
            >
              {searchData.map((search) => (
                <div
                  key={search._id}
                  onClick={() => handleClick(search._id)}
                  className="
                    px-5
                    py-4
                    hover:bg-gradient-to-r
                    hover:from-pink-50
                    hover:to-orange-50
                    cursor-pointer
                    border-b
                    last:border-none
                    transition-colors
                    duration-200
                  "
                >
                  <h2 className="font-semibold text-gray-900">
                    {search.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {search.landMark}, {search.city}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 relative" ref={popupRef}>
          {/* LIST HOME */}
          <button
            onClick={() => {
              if (!userData) {
                toast.error("Please Login First");

                setTimeout(() => {
                  navigate("/login");
                }, 1000);

                return;
              }

              navigate("/listingpage1");
            }}
            className="
              hidden
              md:block
              px-6
              py-3
              rounded-full
              hover:bg-gradient-to-r
              hover:from-pink-50
              hover:to-orange-50
              transition-all
              font-semibold
              text-gray-700
              hover:text-pink-600
            "
          >
            🏠 List Your Home
          </button>

          {/* PROFILE BUTTON */}
          <button
            onClick={() => setShowpopup((prev) => !prev)}
            className="
              border
              border-gray-300
              rounded-full
              px-4
              py-2
              flex
              items-center
              gap-3
              hover:shadow-md
              transition-all
              bg-white
              hover:border-pink-300
            "
          >
            <GiHamburgerMenu className="text-lg text-gray-600" />

            {userData ? (
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-gradient-to-br
                  from-pink-500
                  to-orange-500
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                "
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            ) : (
              <CgProfile className="text-2xl text-gray-500" />
            )}
          </button>

          {/* DROPDOWN */}
          {showpopup && (
            <div
              className="
                absolute
                top-[120%]
                right-0
                w-[240px]
                bg-white
                rounded-2xl
                shadow-2xl
                border
                border-gray-200
                overflow-hidden
                z-[9999]
              "
            >
              {!userData ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setShowpopup(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-5
                    py-4
                    hover:bg-gradient-to-r
                    hover:from-pink-50
                    hover:to-orange-50
                    font-semibold
                    text-gray-900
                  "
                >
                  🔐 Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLogOut();
                    setShowpopup(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-5
                    py-4
                    hover:bg-gradient-to-r
                    hover:from-red-50
                    hover:to-pink-50
                    font-semibold
                    text-gray-900
                  "
                >
                  🚪 Logout
                </button>
              )}
              <div className="border-t border-gray-200"></div>
              <button
                onClick={() => {
                  if (!userData) {
                    toast.error("PleaseLogin First");
                    setTimeout(() => {
                      navigate("/login");
                    }, 1000);
                    return;
                  }
                  navigate("/listingpage1");
                  setShowpopup(false);
                }}
                className=" w-full text-left px-5 py-4 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 transition-colors duration-200 text-gray-900 "
              >
                📝 List your Home
              </button>
              <button
                onClick={() => {
                  if (!userData) {
                    toast.error("Please Login First");
                    setTimeout(() => {
                      navigate("/login");
                    }, 1000);
                    return;
                  }
                  navigate("/mylisting");
                  setShowpopup(false);
                }}
                className=" w-full text-left px-5 py-4 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 transition-colors duration-200 text-gray-900 "
              >
                {" "}
                🏠 My Listings
              </button>
              <button
                onClick={() => {
                  if (!userData) {
                    toast.error("Please Login First");
                    setTimeout(() => {
                      navigate("/login");
                    }, 1000);
                    return;
                  }
                  navigate("/mybooking");
                  setShowpopup(false);
                }}
                className=" w-full text-left px-5 py-4 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 transition-colors duration-200 text-gray-900 "
              >
                🎫 My Bookings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="px-4 pb-4 md:hidden bg-white">
        <div
          className="
            bg-gradient-to-r
            from-white
            to-gray-50
            border
            border-gray-300
            rounded-full
            shadow-md
            flex
            items-center
            px-4
            py-2.5
          "
        >
          <FiSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search destinations"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1
              outline-none
              px-3
              text-sm
              bg-transparent
              text-gray-700
            "
          />

          <button
            className="
              bg-gradient-to-r
              from-pink-500
              to-orange-500
              text-white
              p-2.5
              rounded-full
            "
          >
            <FiSearch className="text-sm" />
          </button>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div
        className={`
          flex
          items-center
          justify-center
          gap-6
          overflow-x-auto
          px-6
          scrollbar-hide
          bg-gradient-to-r
          from-white
          via-white
          to-gray-50
          border-b
          border-gray-100
          transition-all
          duration-300
          ${
            showCategory
              ? "py-0 opacity-100 translate-y-0"
              : "py-0 opacity-0 -translate-y-full h-0 overflow-hidden"
          }
        `}
      >
        {[
          {
            name: "trending",
            icon: <MdWhatshot className="text-2xl" />,
            label: "Trending",
          },
          {
            name: "villa",
            icon: <GiFamilyHouse className="text-2xl" />,
            label: "Villa",
          },
          {
            name: "farmHouse",
            icon: <FaTreeCity className="text-2xl" />,
            label: "Farm House",
          },
          {
            name: "poolHouse",
            icon: <MdOutlinePool className="text-2xl" />,
            label: "Pool House",
          },
          {
            name: "rooms",
            icon: <MdBedroomParent className="text-2xl" />,
            label: "Rooms",
          },
          {
            name: "flat",
            icon: <BiBuildingHouse className="text-2xl" />,
            label: "Flat",
          },
          {
            name: "pg",
            icon: <IoBedOutline className="text-2xl" />,
            label: "PG",
          },
          {
            name: "cabin",
            icon: <GiWoodCabin className="text-2xl" />,
            label: "Cabins",
          },
          {
            name: "shops",
            icon: <SiHomeassistantcommunitystore className="text-2xl" />,
            label: "Shops",
          },
        ].map((item) => (
          <div
            key={item.name}
            onClick={() => handleCategory(item.name)}
            className={`
              flex
              flex-col
              items-center
              min-w-fit
              cursor-pointer
              transition-all
              duration-300
              py-3
              px-2
              rounded-lg
              hover:bg-gray-100
              ${
                cate === item.name
                  ? "bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 border-b-2 border-pink-500"
                  : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
              }
            `}
          >
            {item.icon}

            <span className="text-xs mt-1 whitespace-nowrap font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nav;
