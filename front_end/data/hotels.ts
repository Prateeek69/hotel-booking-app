export interface Hotel {
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

export const hotelData: Hotel[] = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "Downtown, New York",
    rating: 4.2,
    price: 129,
    originalPrice: 161,
    discount: "20% OFF",
    roomType: ["Deluxe"],
    amenities: ["WiFi", "Parking", "Restaurant", "Gym"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Miami Beach, Florida",
    rating: 4.8,
    price: 299,
    roomType: ["Suite"],
    amenities: ["WiFi", "Parking", "Restaurant", "Swimming Pool"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Aspen, Colorado",
    rating: 4.5,
    price: 189,
    badge: "Best Seller",
    roomType: ["Double"],
    amenities: ["WiFi", "Parking", "Restaurant", "Gym"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    name: "City Center Hotel",
    location: "Chicago, Illinois",
    rating: 3.9,
    price: 89,
    roomType: ["Single"],
    amenities: ["WiFi", "Parking", "Restaurant"],
    image: "/placeholder.svg?height=200&width=400",
    isSoldOut: true,
  },
  {
    id: 5,
    name: "Luxury Resort & Spa",
    location: "Malibu, California",
    rating: 4.9,
    price: 450,
    roomType: ["Suite", "Deluxe"],
    amenities: ["WiFi", "Swimming Pool", "Restaurant", "Gym", "Air Conditioning"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    name: "Business Hotel",
    location: "Seattle, Washington",
    rating: 4.1,
    price: 120,
    roomType: ["Single", "Double"],
    amenities: ["WiFi", "Parking", "Restaurant", "Air Conditioning"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 7,
    name: "Boutique Inn",
    location: "Portland, Oregon",
    rating: 4.6,
    price: 175,
    roomType: ["Deluxe"],
    amenities: ["WiFi", "Restaurant", "Pet Friendly"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 8,
    name: "Riverside Hotel",
    location: "Austin, Texas",
    rating: 4.3,
    price: 95,
    roomType: ["Single", "Double"],
    amenities: ["WiFi", "Parking", "Swimming Pool", "Air Conditioning"],
    image: "/placeholder.svg?height=200&width=400",
  },
]
