"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import SpeciesList from "@/components/SpeciesList";
import Pagination from "@/components/Pagination";
import { Species, SpeciesResponse } from "../types";

export default function Home() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    fetchSpecies();
  }, [currentPage, searchTerm]);

  const fetchSpecies = async () => {
    try {
      let response;

      if (searchTerm) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/species?Keyword=${searchTerm}&PageNumber=${currentPage}&PageSize=10`
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/species?PageNumber=${currentPage}&PageSize=10`
        );
      }

      const data: SpeciesResponse = await response.json();
      setSpecies(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <SpeciesList
          species={species}
          isLoggedIn={isLoggedIn}
          onDelete={fetchSpecies}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
