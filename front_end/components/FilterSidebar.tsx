"use client"

import { Star } from "lucide-react"

interface ActiveFilters {
  priceRange: number
  starRating: string[]
  roomType: string[]
  amenities: string[]
}

interface FilterSidebarProps {
  activeFilters: ActiveFilters
  setActiveFilters: (filters: ActiveFilters) => void
}

export default function FilterSidebar({ activeFilters, setActiveFilters }: FilterSidebarProps) {
  const handlePriceChange = (value: number) => {
    setActiveFilters({
      ...activeFilters,
      priceRange: value,
    })
  }

  const handleCheckboxChange = (category: keyof Omit<ActiveFilters, "priceRange">, value: string) => {
    const currentValues = activeFilters[category]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value]

    setActiveFilters({
      ...activeFilters,
      [category]: newValues,
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({
      priceRange: 250,
      starRating: [],
      roomType: [],
      amenities: [],
    })
  }

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <aside className="lg:w-1/4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Filters</h2>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Price Range</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="500"
              value={activeFilters.priceRange}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>$0</span>
              <span>
                ${activeFilters.priceRange}
                {activeFilters.priceRange === 500 ? "+" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Star Rating</h3>
          <div className="space-y-2">
            {[
              { value: "5", label: "5 Stars", stars: 5 },
              { value: "4+", label: "4+ Stars", stars: 4 },
              { value: "3+", label: "3+ Stars", stars: 3 },
            ].map((rating) => (
              <label key={rating.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.starRating.includes(rating.value)}
                  onChange={() => handleCheckboxChange("starRating", rating.value)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <div className="flex">{renderStars(rating.stars)}</div>
                  <span className="ml-2 text-sm">{rating.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Room Type */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Room Type</h3>
          <div className="space-y-2">
            {["Single", "Double", "Deluxe", "Suite"].map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.roomType.includes(type)}
                  onChange={() => handleCheckboxChange("roomType", type)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Amenities</h3>
          <div className="space-y-2">
            {["WiFi", "Swimming Pool", "Air Conditioning", "Gym", "Parking", "Restaurant", "Pet Friendly"].map(
              (amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.amenities.includes(amenity)}
                    onChange={() => handleCheckboxChange("amenities", amenity)}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearAllFilters}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  )
}
