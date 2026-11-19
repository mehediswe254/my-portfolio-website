
// 1. Mobile Menu

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {

    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {

        const isOpen = menu.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

    menu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

        });

    });

}


// 2. Smooth Scrolling
document.querySelectorAll("[data-scroll-to]").forEach(function (button) {
    button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-scroll-to");
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// 3. Active Navbar Link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a");

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

// 4. Scroll Animation
const animatedCards = document.querySelectorAll(
    ".skill-box, .project-card, .resume-item, .certificate-card"
);

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1
    }
);

animatedCards.forEach(function (card) {
    observer.observe(card);
});

emailjs.init({
    publicKey: "vZD1WiRgpdV00puRE"
});

// Contact Form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactForm.querySelector('[name="name"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const subject = contactForm.querySelector('[name="subject"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        formStatus.textContent = "Sending message...";

        emailjs.sendForm(
            "service_3hxtdji",
            "template_zzemy1m",
            contactForm
        )
        .then(function () {
            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();
        })
        .catch(function (error) {
            formStatus.textContent = "Message could not be sent!";
            console.log("EmailJS Error:", error);
        });
    });
}

//more movement

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        "section, .banner, .project-card, .skill-card, .certificate-card"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.getAnimations().forEach((animation) => {
                    animation.cancel();
                });

                entry.target.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(30px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 700,
                        easing: "ease-out",
                        fill: "none"
                    }
                );

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach((element) => {
        observer.observe(element);
    });

});


const typingElement = document.getElementById("typing-text");

const text = "Full Stack Developer";
let index = 0;

function typeAnimation() {
    typingElement.textContent = text.substring(0, index + 1);
    index++;

    if (index < text.length) {
        setTimeout(typeAnimation, 100);
    } else {
        setTimeout(() => {
            index = 0;
            typingElement.textContent = "";
            typeAnimation();
        }, 2000);
    }
}

typeAnimation();


document.getElementById("year").textContent = new Date().getFullYear();



/* =========================================
   CONTINUOUS INFINITE SKILLS MARQUEE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const marquee = document.querySelector("#movingSkills");
    const track = marquee?.querySelector(".marquee-track");
    const original = track?.querySelector(".marquee-content");

    if (!marquee || !track || !original) return;

    function setupMarquee() {

        // Remove previous duplicate groups
        track.querySelectorAll("[data-marquee-clone]")
            .forEach(clone => clone.remove());

        // Get original group width
        const groupWidth = original.getBoundingClientRect().width;

        if (!groupWidth) return;

        // Calculate required width
        const requiredWidth = marquee.clientWidth + groupWidth;

        // Duplicate until there is enough content
        while (track.scrollWidth < requiredWidth) {

            const clone = original.cloneNode(true);

            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("data-marquee-clone", "true");

            track.appendChild(clone);
        }

        // Set exact loop distance
        track.style.setProperty(
            "--loop-distance",
            groupWidth + "px"
        );

        // Restart animation after setup
        track.style.animation = "none";

        void track.offsetWidth;

        track.style.animation = "";
    }

    // Initial setup
    setupMarquee();

    // Recalculate when screen size changes
    let resizeTimer;

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            setupMarquee();
        }, 200);

    });

});
