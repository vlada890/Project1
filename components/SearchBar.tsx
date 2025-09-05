"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchCompany from "./SearchCompany";

const SearchBar = ({
  setCompany,
  setLocation,
}: {
  setCompany?: (company: string) => void;
  setLocation?: (location: string) => void;
}) => {
  const [company, setCompanyState] = useState("");
  const [location, setLocationState] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (company.trim() === "" && location.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(location.toLowerCase(), company.toLowerCase());
  };

  const updateSearchParams = (location: string, company: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (company) {
      searchParams.set("company", company);
    } else {
      searchParams.delete("company");
    }

    if (location) {
      searchParams.set("location", location);
    } else {
      searchParams.delete("location");
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  // Inner button component
  const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button
      type="submit"
      className={`-ml-3 z-10 ${otherClasses}`}
    >
      <Image
        src="/magnifying-glass.svg"
        alt="search icon"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );

  return (
    <form onSubmit={handleSearch} className="searchbar">
      {/* Company search */}
      <div className="searchbar__item">
        <SearchCompany
          company={company}
          setCompany={setCompanyState}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      {/* Location search */}
      <div className="searchbar__item">
        <Image
          src="/map-pin.svg"
          alt="location icon"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocationState(e.target.value)}
          placeholder="Location..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
