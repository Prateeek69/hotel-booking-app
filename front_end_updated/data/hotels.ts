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
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Miami Beach, Florida",
    rating: 4.8,
    price: 299,
    roomType: ["Suite"],
    amenities: ["WiFi", "Parking", "Restaurant", "Swimming Pool"],
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=200&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 4,
    name: "City Center Hotel",
    location: "Chicago, Illinois",
    rating: 3.9,
    price: 89,
    roomType: ["Single"],
    amenities: ["WiFi", "Parking", "Restaurant"],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=200&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 6,
    name: "Business Hotel",
    location: "Seattle, Washington",
    rating: 4.1,
    price: 120,
    roomType: ["Single", "Double"],
    amenities: ["WiFi", "Parking", "Restaurant", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 7,
    name: "Boutique Inn",
    location: "Portland, Oregon",
    rating: 4.6,
    price: 175,
    roomType: ["Deluxe"],
    amenities: ["WiFi", "Restaurant", "Pet Friendly"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=200&fit=crop&crop=center",
  },
  {
    id: 8,
    name: "Riverside Hotel",
    location: "Austin, Texas",
    rating: 4.3,
    price: 95,
    roomType: ["Single", "Double"],
    amenities: ["WiFi", "Parking", "Swimming Pool", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=200&fit=crop&crop=center",
  },
]
