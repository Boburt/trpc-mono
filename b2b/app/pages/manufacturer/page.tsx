import React from "react";
import ManufacturerComponent from "@/components/manufacturer/Manufacturer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manafacturer",
};
const ManufacturerPage = () => {
  return (
    <div>
      <ManufacturerComponent />
    </div>
  );
};
export default ManufacturerPage;
