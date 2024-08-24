import { $searchParams } from "@frontend/src/store/search_params";
import { RouterOutputs } from "@frontend/src/utils/trpc";
import { useStore } from "@nanostores/react";
import clsx from "clsx";
import { useMemo } from "react";

export default function ManufacturersPagination({
  categorySlug,
  paginationMeta,
}: {
  categorySlug?: string;
  paginationMeta: RouterOutputs["manufacturers"]["publicList"]["meta"];
}) {
  const {
    currentPage,
    pageCount,
    isLastPage,
    isFirstPage,
    nextPage,
    previousPage,
  } = paginationMeta;
  const pages = Array.from(Array(pageCount).keys()).map((page) => page + 1);
  const searchParams = useStore($searchParams);
  let computedSearchParams = "";
  if (typeof window !== "undefined") {
    computedSearchParams = window.location.search;
  } else if (searchParams) {
    computedSearchParams = searchParams;
  }

  let prevPageUrl = `/manufacturer/categories/${categorySlug}/page-${previousPage}/${computedSearchParams}`;
  if (previousPage === 1) {
    prevPageUrl = `/manufacturer/categories/${categorySlug}/${computedSearchParams}`;
  }
  return (
    <div className="join mx-auto">
      {!isFirstPage && (
        <a href={prevPageUrl} className="join-item btn btn-md">
          Previous
        </a>
      )}
      {pages.map((page) => {
        const isActive = currentPage === page;
        let pageUrl = `/manufacturer/categories/${categorySlug}/page-${page}/${computedSearchParams}`;
        if (page === 1) {
          pageUrl = `/manufacturer/categories/${categorySlug}/${computedSearchParams}`;
        }
        return (
          <a
            href={pageUrl}
            className={clsx("join-item btn btn-md", {
              "btn-active": isActive,
            })}
            key={page}
          >
            {page}
          </a>
        );
      })}
      {!isLastPage && (
        <a
          href={`/manufacturer/categories/${categorySlug}/page-${nextPage}/${computedSearchParams}`}
          className="join-item btn btn-md"
        >
          Next
        </a>
      )}
    </div>
  );
}
