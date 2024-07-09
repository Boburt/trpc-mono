import FilterToolbar from "./filter-toolbar";
import ProductRequestsTable from "./product-requests-table";

export default function ProfileProductsRequests() {
  return (
    <div>
      <h1>Profile Products Requests</h1>
      <FilterToolbar />
      <ProductRequestsTable />
    </div>
  );
}
