document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Scroll Effect & Mobile Menu
    const header = document.querySelector(".header");
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // 2. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Disable observing after reveal
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Count Up Animation for Mini Stats
    const countElements = document.querySelectorAll(".count-up");
    let hasCounted = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                startCountUp();
                hasCounted = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector(".hero-stats");
    if (statsSection) countObserver.observe(statsSection);

    function startCountUp() {
        countElements.forEach(el => {
            const target = +el.getAttribute("data-target");
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    el.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    el.innerText = target;
                }
            };
            updateCount();
        });
    }

    // 4. Form Submission Handling
    const form = document.getElementById("recruitment-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Show loading state
            btn.innerHTML = "Đang gửi hồ sơ...";
            btn.style.opacity = "0.8";
            btn.disabled = true;

            // Simulate API Call delay
            setTimeout(() => {
                alert("Chúc mừng! Thông tin ứng tuyển của bạn đã được tiếp nhận. Bộ phận Nhân sự sẽ liên hệ trong 24h.");
                form.reset();

                // Reset button
                btn.innerHTML = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }, 1500);
        });
    }

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items explicitly
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
