document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle")
  const nav = document.querySelector(".nav")

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true"
      this.setAttribute("aria-expanded", !isExpanded)
      nav.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        mobileNavToggle.setAttribute("aria-expanded", "false")
      }

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = targetPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission (prevent default for demo)
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // In a real application, you would send this data to a server
      console.log("Form submitted:", { name, email, message })

      // Show success message (for demo purposes)
      alert("Thank you for your message")

      // Reset form
      contactForm.reset()
    })
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(".section-header, .project-card, .skill-item")

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  revealElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Check on load
  window.addEventListener("load", checkReveal)

  // Check on scroll
  window.addEventListener("scroll", checkReveal)
})
