import clsx from "clsx";
import { useMemo, useState } from "react";
export const FilterFacetedDropdown = ({
  items,
  value,
  multiple,
  label,
  searchInputName,
  setValue,
  removeValue,
}: {
  items: {
    value: string;
    count: number;
  }[];
  multiple: boolean;
  value: string[];
  label: string;
  searchInputName: string;
  setValue: (value: string) => void;
  removeValue: (value: string) => void;
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    setFilteredItems(
      items.filter((item) =>
        item.value.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      )
    );
  };
  const getSelectedItems = () => {
    const selectedItems = value.slice(0, 3).map((item) => {
      return {
        value: item,
        deletable: true,
      };
    });
    if (value.length > 3) {
      selectedItems.push({
        value: `+${value.length - 3}`,
        deletable: false,
      });
    }
    return selectedItems;
  };

  const selectedItems = getSelectedItems();

  return (
    <div>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-sm m-1">
          {label}
          {selectedItems.length > 0 &&
            selectedItems.map((item) => (
              <div className="badge badge-neutral gap-2" key={item.value}>
                {item.value}
                {item.deletable && (
                  <span onClick={() => removeValue(item.value)} className="w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </span>
                )}
              </div>
            ))}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 space-y-1 shadow bg-base-100 rounded-box w-52"
        >
          {items.map((item) => (
            <li
              key={item.value}
              onClick={(e) => {
                setValue(item.value);
              }}
            >
              <div
                className={clsx("flex space-x-2", {
                  active: !multiple && item.value === value[0],
                })}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    name={item.value}
                    value={item.value}
                    checked={value.includes(item.value)}
                    onChange={() => {}}
                  />
                )}
                <div>
                  {item.value} ({item.count})
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
