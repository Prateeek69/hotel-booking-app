"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Calendar, Users, Search, Loader2 } from "lucide-react"

interface SearchFilters {
  location: string
  checkin: string
  checkout: string
  guests: string
}

interface HeroSectionProps {
  searchFilters: SearchFilters
  setSearchFilters: (filters: SearchFilters) => void
}

export default function HeroSection({ searchFilters, setSearchFilters }: HeroSectionProps) {
  const [isSearching, setIsSearching] = useState(false)

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setSearchFilters({
      ...searchFilters,
      [field]: value,
    })
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchFilters.location.trim()) {
      alert("Please enter a location")
      return
    }

    if (!searchFilters.checkin || !searchFilters.checkout) {
      alert("Please select check-in and check-out dates")
      return
    }

    if (new Date(searchFilters.checkout) <= new Date(searchFilters.checkin)) {
      alert("Check-out date must be after check-in date")
      return
    }

    setIsSearching(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSearching(false)

    // Scroll to results
    document.querySelector("#hotel-listings")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
          <p className="text-lg md:text-xl text-blue-100">Discover amazing hotels at unbeatable prices</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={searchFilters.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchFilters.checkin}
                    onChange={(e) => handleInputChange("checkin", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchFilters.checkout}
                    onChange={(e) => handleInputChange("checkout", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Guests Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={searchFilters.guests}
                    onChange={(e) => handleInputChange("guests", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                    <option>3 Adults</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                <span>{isSearching ? "Searching..." : "Search Hotels"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
