import { useState, useRef } from "react";
import { useParkContext } from "../../hooks/useParkContext";
import ParkCard from "../cards/ParkCard";
import SecondaryButton from "../common/SecondaryButton";
import SearchBar from "./SearchBar";
import { getFullStateNames } from "../../utils/stateNames";

const ParkList = () => {
  const { parks, loading, error } = useParkContext();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const listRef = useRef<HTMLUListElement | null>(null);

  // Scroll to top of park list
  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const parksPerPage = 9;

  if (loading) return <div>Loading parks...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter parks by name or state code or state name
  const filteredParks = parks.filter((park) => {
    const searchQuery = search.toLowerCase();

    const parkNameMatch = park.fullName.toLowerCase().includes(searchQuery);

    const stateCodeMatch = park.states
      .split(",")
      .map((code) => code.trim().toLowerCase())
      .some((code) => code === searchQuery);

    const stateNameMatch = getFullStateNames(park.states)
      .map((name) => name.toLowerCase())
      .some((name) => name.includes(searchQuery));

    return parkNameMatch || stateCodeMatch || stateNameMatch;
  });

  // Count the parks shown on specific paginations
  const indexOfLast = currentPage * parksPerPage;
  const indexOfFirst = indexOfLast - parksPerPage;
  const currentParks = filteredParks.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredParks.length / parksPerPage);

  // Search form functions
  const handleSearch = () => {
    setSearch(query);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setQuery("");
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-0">
      {/* Park search form */}
      <div className="w-full mx-auto flex justify-center p-0 sm:p-2">
        <SearchBar
          query={query}
          setQuery={(value) => {
            setQuery(value);
            if (value === "") setSearch("");
          }}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>

      {/* Park List */}
      {filteredParks.length > 0 ? (
        <>
          <ul
            ref={listRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 
            lg:gap-1 mt-8 mb-6"
          >
            {currentParks.map((park) => (
              <li key={park.id}>
                <ParkCard park={park} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div
              className="flex flex-wrap justify-center items-center gap-2 
            mb-6"
            >
              <SecondaryButton
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.max(p - 1, 1));
                  scrollToList();
                }}
                disabled={currentPage === 1}
              >
                Prev
              </SecondaryButton>

              {/* Pagination numbers */}
              <div className="hidden md:flex gap-2">
                {[...Array(totalPages).keys()].map((i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        scrollToList();
                      }}
                      className={`px-3 py-1 rounded-lg hover:cursor-pointer ${
                        currentPage === page
                          ? " text-black underline underline-offset-2"
                          : `bg-transparent hover:underline 
                          hover:underline-offset-2`
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <SecondaryButton
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.min(p + 1, totalPages));
                  scrollToList();
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </SecondaryButton>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 mb-6 flex flex-col items-center justify-center">
          <p className="mb-6">No parks found for "{query}"</p>
          <SecondaryButton type="button" onClick={handleClear}>
            Clear search
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default ParkList;
