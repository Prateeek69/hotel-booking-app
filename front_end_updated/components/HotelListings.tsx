"use client"

import { useState, useEffect } from "react"
import HotelCard from "./HotelCard"
import Pagination from "./Pagination"
import { hotelData } from "@/data/hotels"

interface SearchFilters {
  location: string
  checkin: string
  checkout: string
  guests: string
}

interface ActiveFilters {
  priceRange: number
  starRating: string[]
  roomType: string[]
  amenities: string[]
}

interface HotelListingsProps {
  searchFilters: SearchFilters
  activeFilters: ActiveFilters
  currentPage: number
  setCurrentPage: (page: number) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

export default function HotelListings({
  searchFilters,
  activeFilters,
  currentPage,
  setCurrentPage,
  sortBy,
  setSortBy,
}: HotelListingsProps) {
  const [filteredHotels, setFilteredHotels] = useState(hotelData)
  const [isLoading, setIsLoading] = useState(false)

  const hotelsPerPage = 4
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage)
  const startIndex = (currentPage - 1) * hotelsPerPage
  const currentHotels = filteredHotels.slice(startIndex, startIndex + hotelsPerPage)

  useEffect(() => {
    filterAndSortHotels()
  }, [activeFilters, sortBy])

  const filterAndSortHotels = () => {
    setIsLoading(true)

    setTimeout(() => {
      let filtered = [...hotelData]

      // Apply price filter
      filtered = filtered.filter((hotel) => hotel.price <= activeFilters.priceRange)

      // Apply star rating filter
      if (activeFilters.starRating.length > 0) {
        filtered = filtered.filter((hotel) => {
          return activeFilters.starRating.some((rating) => {
            if (rating === "5") return hotel.rating >= 4.8
            if (rating === "4+") return hotel.rating >= 4.0
            if (rating === "3+") return hotel.rating >= 3.0
            return false
          })
        })
      }

      // Apply room type filter
      if (activeFilters.roomType.length > 0) {
        filtered = filtered.filter((hotel) => activeFilters.roomType.some((type) => hotel.roomType.includes(type)))
      }

      // Apply amenities filter
      if (activeFilters.amenities.length > 0) {
        filtered = filtered.filter((hotel) =>
          activeFilters.amenities.every((amenity) => hotel.amenities.includes(amenity)),
        )
      }

      // Apply sorting
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        default:
          // Keep recommended order
          break
      }

      setFilteredHotels(filtered)
      setCurrentPage(1)
      setIsLoading(false)
    }, 500)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  return (
    <section id="hotel-listings" className="lg:w-3/4">
      {/* Results Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Hotels</h2>
        <div className="flex items-center space-x-4 flex-wrap gap-2">
          <span className="text-gray-600 dark:text-gray-400">{filteredHotels.length} properties found</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="recommended">Sort by: Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
      >
        {currentHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {/* No Results */}
      {filteredHotels.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No hotels found matching your criteria.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your filters to see more results.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredHotels.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </section>
  )
}
