"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import FilterSidebar from "@/components/FilterSidebar"
import HotelListings from "@/components/HotelListings"
import Footer from "@/components/Footer"

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    checkin: "",
    checkout: "",
    guests: "1 Adult",
  })

  const [activeFilters, setActiveFilters] = useState({
    priceRange: 250,
    starRating: [],
    roomType: [],
    amenities: [],
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("recommended")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <HeroSection searchFilters={searchFilters} setSearchFilters={setSearchFilters} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

          <HotelListings
            searchFilters={searchFilters}
            activeFilters={activeFilters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
