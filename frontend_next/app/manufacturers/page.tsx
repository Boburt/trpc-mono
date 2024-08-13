import React, { Suspense } from "react";
import { ManufacturerFilterSort } from "./ManufacturerFilterSort";
// import { ManufacturerList } from "./ManufacturerList";

export default function ManufacturersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manufacturers</h1>
      <ManufacturerFilterSort />
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ManufacturerList />
      </Suspense> */}
    </div>
  );
}
