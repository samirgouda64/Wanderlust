import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useDebounce } from "use-debounce";
import { authDataContext } from "../../Context/AuthContext";

const AdminListingTable = ({ selectedNotificationId, setSelectedNotificationId }) => {

  const { serverUrl } = useContext(authDataContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [status, setStatus] = useState("pending");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch Listings
  const fetchListings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        serverUrl +
          `/api/admin/listings?page=${page}&limit=${limit}&search=${debouncedSearch}&status=${status}`,
        {
          withCredentials: true,
        },
      );

      setData(res.data.listings);

      setTotalPages(res.data.totalPages);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [page, debouncedSearch, status, limit]);

  // Approve Hotel
  const approveHotel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want approve the listing ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f43f5e",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            serverUrl + `/api/admin/approve-listing/${id}`,
            {},
            {
              withCredentials: true,
            },
          );

          fetchListings();

          setOpenModal(false);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // Reject Hotel
  const rejectHotel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want Reject the listing ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f43f5e",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!rejectReason) {
            return alert("Please enter rejection reason");
          }

          await axios.put(
            serverUrl + `/api/admin/reject-listing/${id}`,
            {
              rejectReason,
            },
            {
              withCredentials: true,
            },
          );

          fetchListings();

          setOpenModal(false);

          setShowRejectInput(false);

          setRejectReason("");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    if (selectedNotificationId && data.length > 0) {
      const hotel = data.find((item) => item._id === selectedNotificationId);

      if (hotel) {
        setSelectedHotel(hotel);
        setOpenModal(true);
        setSelectedNotificationId(null);
      }
    }
  }, [selectedNotificationId, data]);

  // Table Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Hotel Name",
      },

      {
        accessorKey: "city",
        header: "City",
      },

      {
        accessorKey: "category",
        header: "Category",
      },

      {
        accessorKey: "rent",
        header: "Price / Night",

        cell: ({ row }) => `₹${row.original.rent}`,
      },

      {
        accessorKey: "host",
        header: "Host",

        cell: ({ row }) => row.original.host?.name,
      },

      {
        accessorKey: "status",
        header: "Status",

        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                status === "approved"
                  ? "bg-green-100 text-green-700"
                  : status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status}
            </span>
          );
        },
      },

      {
        header: "Action",

        cell: ({ row }) => (
          <button
            onClick={() => {
              setSelectedHotel(row.original);
              setOpenModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
          >
            View
          </button>
        ),
      },
    ],
    [],
  );

  // React Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 bg-[#edf2fb] min-h-screen">
      {/* Breadcrumb */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <ol className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded shadow-sm">
            <li className="flex items-center gap-2">
              🏨
              <span>Hotel Listing Management</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded shadow border">
        {/* Tabs */}
        <div className="border-b">
          <ul className="flex flex-wrap">
            {/* Pending */}
            <li>
              <button
                onClick={() => {
                  setActiveTab("pending");
                  setStatus("pending");
                  setPage(1);
                }}
                className={`px-6 py-3 font-medium border-r
                ${
                  activeTab === "pending"
                    ? "bg-white text-black"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                Pending Listings
              </button>
            </li>

            {/* Approved */}
            <li>
              <button
                onClick={() => {
                  setActiveTab("approved");
                  setStatus("approved");
                  setPage(1);
                }}
                className={`px-6 py-3 font-medium border-r
                ${
                  activeTab === "approved"
                    ? "bg-white text-black"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                Approved Listings
              </button>
            </li>

            {/* Rejected */}
            <li>
              <button
                onClick={() => {
                  setActiveTab("rejected");
                  setStatus("rejected");
                  setPage(1);
                }}
                className={`px-6 py-3 font-medium
                ${
                  activeTab === "rejected"
                    ? "bg-white text-black"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                Rejected Listings
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          <div className="border border-blue-500 rounded overflow-hidden">
            {/* Panel Header */}
            <div className="bg-blue-600 text-white px-5 py-3 font-semibold text-lg capitalize">
              {activeTab} Hotel Listings
            </div>

            {/* Panel Body */}
            <div className="p-5">
              {/* Top Controls */}
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-5">
                {/* Left */}
                <div className="text-gray-700">
                  Showing 1 to {data.length} of {data.length} hotel listings
                </div>

                {/* Center */}
                <div className="flex items-center gap-2">
                  <span>Show</span>

                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="10">10</option>

                    <option value="25">25</option>

                    <option value="50">50</option>
                  </select>

                  <span>entries</span>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2">
                  <label>Search:</label>

                  <input
                    type="text"
                    placeholder="Search hotel..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  {/* Header */}
                  <thead className="bg-blue-500 text-white">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        <th className="border px-4 py-3 text-center">Sl No.</th>

                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="border px-4 py-3 text-center font-semibold"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  {/* Body */}
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8">
                          Loading...
                        </td>
                      </tr>
                    ) : data.length > 0 ? (
                      table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          {/* Serial */}
                          <td className="border px-4 py-3 text-center">
                            {(page - 1) * limit + index + 1}
                          </td>

                          {/* Cells */}
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="border px-4 py-3 text-center"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-8 text-gray-500"
                        >
                          No Hotel Listings Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center mt-5">
                <div className="flex items-center">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="border border-gray-300 px-4 py-2 bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button className="bg-blue-600 text-white px-4 py-2 border border-blue-600">
                    {page}
                  </button>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="border border-gray-300 px-4 py-2 bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {openModal && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Hotel Details
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <img
                  src={selectedHotel.image1?.url}
                  alt=""
                  className="w-full h-64 object-cover rounded-lg border"
                />

                <img
                  src={selectedHotel.image2?.url}
                  alt=""
                  className="w-full h-64 object-cover rounded-lg border"
                />

                <img
                  src={selectedHotel.image3?.url}
                  alt=""
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 mb-1">Hotel Name</p>

                  <h3 className="text-xl font-semibold">
                    {selectedHotel.title}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">City</p>

                  <h3 className="text-lg font-medium">{selectedHotel.city}</h3>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Landmark</p>

                  <h3 className="text-lg font-medium">
                    {selectedHotel.landMark}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Category</p>

                  <h3 className="text-lg font-medium">
                    {selectedHotel.category}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Rent Per Night</p>

                  <h3 className="text-lg font-medium text-green-600">
                    ₹{selectedHotel.rent}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Status</p>

                  <h3 className="text-lg font-medium capitalize">
                    {selectedHotel.status}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-gray-500 mb-2">Description</p>

                <p className="text-gray-700 leading-7">
                  {selectedHotel.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8">
                {/* Reject Reason */}
                {showRejectInput && (
                  <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-700">
                      Reason For Rejection
                    </label>

                    <textarea
                      rows={4}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Write reason for rejecting this hotel..."
                      className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                  {/* Pending Buttons */}
                  {selectedHotel.status === "pending" && (
                    <>
                      {!showRejectInput && (
                        <>
                          {/* Approve */}
                          <button
                            onClick={() => approveHotel(selectedHotel._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                          >
                            Approve Hotel
                          </button>

                          {/* Reject */}
                          <button
                            onClick={() => setShowRejectInput(true)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                          >
                            Reject Hotel
                          </button>
                        </>
                      )}

                      {showRejectInput && (
                        <button
                          onClick={() => rejectHotel(selectedHotel._id)}
                          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                          Submit Rejection
                        </button>
                      )}
                    </>
                  )}

                  {/* Close */}
                  <button
                    onClick={() => {
                      setOpenModal(false);
                      setShowRejectInput(false);
                      setRejectReason("");
                    }}
                    className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListingTable;
