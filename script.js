// Preloader Fade Out
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
    preloader.style.display = "none";
  }, 500); // Allow fade out animation to complete
});

// Smooth Scrolling and Active Nav Link Highlight
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });

    // Close mobile menu after click
    const navLinks = document.querySelector(".nav-links");
    const mobileMenu = document.querySelector(".mobile-menu");
    if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("active");
    }
    });
});

// Highlight Active Nav Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
            pageYOffset >= sectionTop - (document.querySelector("header").offsetHeight + 50) &&
            pageYOffset < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Animate on Scroll (fade-in)
function animateOnScroll() {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("resize", animateOnScroll);
animateOnScroll(); // Run once on load

// Header Hide on Scroll Down
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }
    lastScrollTop = scrollTop;
});

// Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
        const submitBtn = document.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.style.background = "linear-gradient(45deg, #4ecdc4, #44a08d)";
        submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = "Message Sent!";
        submitBtn.style.background = "linear-gradient(45deg, #2ecc71, #27ae60)";
        setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "var(--gradient-main)";
        submitBtn.disabled = false;
        document.getElementById("contactForm").reset();
        }, 2000);
    }, 1500);
    } else {
        alert("Please fill in all fields!");
    }
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinksUL = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
    navLinksUL.classList.toggle("active");
    mobileMenu.classList.toggle("active");
});

// Typing Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";
    return new Promise((resolve) => {
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            resolve();
        }
    }
    type();
    });
} 

window.addEventListener("load", async () => {
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");

    await typeWriter(heroTitle, "Full-Stack Developer", 80);
    await typeWriter(heroSubtitle, "Creating amazing digital experiences with modern web technologies", 50);
});

// Parallax Effect (Hero Shapes)
const heroSection = document.querySelector(".hero");
const parallaxShapes = heroSection.querySelectorAll(".shape");

heroSection.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;

    parallaxShapes.forEach((element, index) => {
    const speed = (index + 1) * 0.1;
    element.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${x * 0.05}deg)`;
    });
});

// Service Card Hover Effect
document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
});

// Testimonial Slider
const testimonialSlider = document.getElementById("testimonial-slider");
const testimonialCards = testimonialSlider.querySelectorAll(".testimonial-card");
const testimonialNavigation = document.getElementById("testimonial-navigation");
let currentTestimonial = 0;

function createNavigationDots() {
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("nav-dot");
        dot.addEventListener("click", () => showTestimonial(index));
        testimonialNavigation.appendChild(dot);
    });
}

function showTestimonial(index) {
    testimonialCards.forEach((card) => {
        card.classList.remove("active");
        card.style.position = "absolute";
        card.style.opacity = "0";
        card.style.transform = "translateX(50px)";
    });

    testimonialNavigation.querySelectorAll(".nav-dot").forEach((dot) => {
        dot.classList.remove("active");
    });

    testimonialCards[index].classList.add("active");
    testimonialCards[index].style.position = "relative";
    testimonialNavigation.children[index].classList.add("active");

    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

let testimonialInterval = setInterval(nextTestimonial, 7000);

testimonialNavigation.addEventListener("click", () => {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 7000);
});

createNavigationDots();
showTestimonial(0);

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
    backToTopButton.style.display = "block";
    } else {
    backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth",
    });
});