import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AdminListingTable from "./AdminListingTable.jsx";

const ListingsPage = () => {

  const { selectedNotificationId, setSelectedNotificationId } = useOutletContext();

  return (
    <AdminListingTable
      selectedNotificationId={selectedNotificationId}
      setSelectedNotificationId={setSelectedNotificationId}
    />
  );
};

export default ListingsPage;