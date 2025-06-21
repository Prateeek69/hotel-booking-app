"use client"

import { useState } from "react"
import { MapPin, Star, Heart, Wifi, Car, Utensils, Dumbbell, Waves, Mountain } from "lucide-react"

interface Hotel {
  id: number
  name: string
  location: string
  rating: number
  price: number
  originalPrice?: number
  discount?: string
  badge?: string
  roomType: string[]
  amenities: string[]
  image: string
  isSoldOut?: boolean
}

interface HotelCardProps {
  hotel: Hotel
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const handleViewDetails = () => {
    console.log(`Viewing details for: ${hotel.name}`)
    alert(`Viewing details for ${hotel.name}`)
  }

  const handleBookNow = () => {
    if (hotel.isSoldOut) return
    console.log(`Booking: ${hotel.name}`)
    alert(`Booking ${hotel.name}...`)
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      case "restaurant":
        return <Utensils className="w-4 h-4" />
      case "gym":
        return <Dumbbell className="w-4 h-4" />
      case "swimming pool":
        return <Waves className="w-4 h-4" />
      default:
        return <Mountain className="w-4 h-4" />
    }
  }

  const renderStars = () => {
    const fullStars = Math.floor(hotel.rating)
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < fullStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <article
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ${hotel.isSoldOut ? "opacity-75" : ""}`}
    >
      <div className="relative">
        <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />

        {/* Badges */}
        {hotel.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            {hotel.discount}
          </div>
        )}

        {hotel.badge && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            {hotel.badge}
          </div>
        )}

        {/* Sold Out Overlay */}
        {hotel.isSoldOut && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">SOLD OUT</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{hotel.name}</h3>
          <div className="flex items-center">
            <div className="flex">{renderStars()}</div>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{hotel.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {hotel.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.roomType.map((type, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            {hotel.amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} title={amenity}>
                {getAmenityIcon(amenity)}
              </div>
            ))}
          </div>
          <div className="text-right">
            <div
              className={`text-2xl font-bold ${hotel.isSoldOut ? "text-gray-400 dark:text-gray-500" : "text-blue-600 dark:text-blue-400"}`}
            >
              ${hotel.price}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">per night</div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleViewDetails}
            disabled={hotel.isSoldOut}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              hotel.isSoldOut
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            View Details
          </button>
          <button
            onClick={handleBookNow}
            disabled={hotel.isSoldOut}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              hotel.isSoldOut
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {hotel.isSoldOut ? "Sold Out" : "Book Now"}
          </button>
        </div>
      </div>
    </article>
  )
}
