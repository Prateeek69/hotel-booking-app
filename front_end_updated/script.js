// Import Lucide icons library
import lucide from "lucide"

// Initialize Lucide icons when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")

      // Update button icon
      const icon = mobileMenuButton.querySelector("[data-lucide]")
      if (mobileMenu.classList.contains("active")) {
        icon.setAttribute("data-lucide", "x")
      } else {
        icon.setAttribute("data-lucide", "menu")
      }

      // Recreate icons after changing
      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove("active")

        // Reset button icon
        const icon = mobileMenuButton.querySelector("[data-lucide]")
        icon.setAttribute("data-lucide", "menu")

        if (typeof lucide !== "undefined") {
          lucide.createIcons()
        }
      }
    })
  }

  // Search functionality
  const searchBtn = document.querySelector(".search-btn")
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Get form values
      const location = document.querySelector('input[placeholder="Where are you going?"]').value
      const checkin = document.querySelector('input[type="date"]:first-of-type').value
      const checkout = document.querySelector('input[type="date"]:last-of-type').value
      const guests = document.querySelector("select").value

      // Simple validation
      if (!location.trim()) {
        alert("Please enter a location")
        return
      }

      if (!checkin || !checkout) {
        alert("Please select check-in and check-out dates")
        return
      }

      // Check if check-out is after check-in
      if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date")
        return
      }

      // Simulate search (in real app, this would make an API call)
      console.log("Searching for hotels...", {
        location,
        checkin,
        checkout,
        guests,
      })

      // Show loading state
      const originalText = searchBtn.innerHTML
      searchBtn.innerHTML =
        '<i data-lucide="loader-2" style="width: 20px; height: 20px; animation: spin 1s linear infinite;"></i><span>Searching...</span>'
      searchBtn.disabled = true

      // Simulate API delay
      setTimeout(() => {
        searchBtn.innerHTML = originalText
        searchBtn.disabled = false
        if (typeof lucide !== "undefined") {
          lucide.createIcons()
        }

        // Scroll to results
        document.querySelector(".listings").scrollIntoView({
          behavior: "smooth",
        })
      }, 2000)
    })
  }

  // Filter functionality
  const filterCheckboxes = document.querySelectorAll(".filter-checkbox")
  const clearFiltersBtn = document.querySelector(".clear-filters-btn")

  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateResults()
    })
  })

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      filterCheckboxes.forEach((checkbox) => {
        checkbox.checked = false
      })

      // Reset price range
      const priceRange = document.querySelector(".price-range")
      if (priceRange) {
        priceRange.value = 250
      }

      updateResults()
    })
  }

  // Price range functionality
  const priceRange = document.querySelector(".price-range")
  if (priceRange) {
    priceRange.addEventListener("input", () => {
      updatePriceLabels()
      updateResults()
    })

    updatePriceLabels() // Initialize labels
  }

  function updatePriceLabels() {
    const priceRange = document.querySelector(".price-range")
    const priceLabels = document.querySelector(".price-labels")

    if (priceRange && priceLabels) {
      const value = priceRange.value
      priceLabels.innerHTML = `
                <span>$0</span>
                <span>$${value}${value == 500 ? "+" : ""}</span>
            `
    }
  }

  function updateResults() {
    // In a real application, this would filter the hotel results
    // For now, we'll just log the active filters
    const activeFilters = []

    filterCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const label = checkbox.parentElement.querySelector(".filter-option-label")
        if (label) {
          activeFilters.push(label.textContent)
        }
      }
    })

    const priceRange = document.querySelector(".price-range")
    if (priceRange) {
      activeFilters.push(`Price: $0-$${priceRange.value}`)
    }

    console.log("Active filters:", activeFilters)

    // Update results count (simulated)
    const resultsCount = document.querySelector(".results-count")
    if (resultsCount) {
      const count = Math.max(1, Math.floor(Math.random() * 1000))
      resultsCount.textContent = `${count} properties found`
    }
  }

  // Hotel card interactions
  const hotelCards = document.querySelectorAll(".hotel-card:not(.sold-out)")

  hotelCards.forEach((card) => {
    // Favorite button functionality
    const favoriteBtn = card.querySelector(".hotel-favorite")
    if (favoriteBtn) {
      favoriteBtn.addEventListener("click", (e) => {
        e.stopPropagation()

        const heartIcon = favoriteBtn.querySelector('[data-lucide="heart"]')
        const isFavorited = heartIcon.style.fill === "currentcolor"

        if (isFavorited) {
          heartIcon.style.fill = ""
          heartIcon.style.color = ""
        } else {
          heartIcon.style.fill = "currentcolor"
          heartIcon.style.color = "#ef4444"
        }
      })
    }

    // View Details button
    const viewDetailsBtn = card.querySelector(".btn-secondary")
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", () => {
        const hotelName = card.querySelector(".hotel-name").textContent
        console.log(`Viewing details for: ${hotelName}`)
        // In a real app, this would navigate to hotel details page
        alert(`Viewing details for ${hotelName}`)
      })
    }

    // Book Now button
    const bookNowBtn = card.querySelector(".btn-primary-action")
    if (bookNowBtn) {
      bookNowBtn.addEventListener("click", () => {
        const hotelName = card.querySelector(".hotel-name").textContent
        console.log(`Booking: ${hotelName}`)
        // In a real app, this would open booking modal or navigate to booking page
        alert(`Booking ${hotelName}...`)
      })
    }
  })

  // Pagination functionality
  const paginationBtns = document.querySelectorAll(".pagination-btn:not([disabled])")

  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.textContent.trim() && !isNaN(btn.textContent.trim())) {
        // Remove active class from all buttons
        document.querySelectorAll(".pagination-btn").forEach((b) => {
          b.classList.remove("active")
        })

        // Add active class to clicked button
        btn.classList.add("active")

        // Scroll to top of results
        document.querySelector(".listings-title").scrollIntoView({
          behavior: "smooth",
        })

        console.log(`Navigating to page ${btn.textContent}`)
      }
    })
  })

  // Sort functionality
  const sortSelect = document.querySelector(".sort-select")
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const sortValue = this.value
      console.log(`Sorting by: ${sortValue}`)

      // In a real app, this would re-sort the hotel results
      // For now, we'll just simulate a loading state
      const hotelGrid = document.querySelector(".hotel-grid")
      if (hotelGrid) {
        hotelGrid.style.opacity = "0.5"

        setTimeout(() => {
          hotelGrid.style.opacity = "1"
          console.log("Results sorted")
        }, 1000)
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Add loading animation for images
  const hotelImages = document.querySelectorAll(".hotel-image")
  hotelImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=200&width=400&text=Image+Not+Found"
    })
  })

  // Add CSS animation for spinning loader
  const style = document.createElement("style")
  style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `
  document.head.appendChild(style)

  // Initialize tooltips for amenity icons
  const amenityIcons = document.querySelectorAll(".hotel-amenities i")
  amenityIcons.forEach((icon) => {
    const iconName = icon.getAttribute("data-lucide")
    let tooltipText = ""

    switch (iconName) {
      case "wifi":
        tooltipText = "Free WiFi"
        break
      case "car":
        tooltipText = "Parking Available"
        break
      case "utensils":
        tooltipText = "Restaurant"
        break
      case "dumbbell":
        tooltipText = "Fitness Center"
        break
      case "waves":
        tooltipText = "Swimming Pool"
        break
      case "mountain":
        tooltipText = "Mountain View"
        break
      default:
        tooltipText = "Amenity"
    }

    icon.title = tooltipText
  })

  // Add keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")

      const icon = mobileMenuButton.querySelector("[data-lucide]")
      icon.setAttribute("data-lucide", "menu")

      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
    }

    // Enter key on search button
    if (e.key === "Enter" && document.activeElement === searchBtn) {
      searchBtn.click()
    }
  })

  // Add intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe hotel cards for animation
  hotelCards.forEach((card) => {
    observer.observe(card)
  })

  console.log("Hotel booking app initialized successfully!")
})

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString))
}

// Export functions for potential use in other modules
window.HotelBookingApp = {
  formatCurrency,
  formatDate,
}
