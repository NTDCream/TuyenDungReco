document.addEventListener("DOMContentLoaded", () => {
    // 1. Swiper Initialization (Achievement Slider)
    const swiper = new Swiper('.achievement-slider', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 'auto',
            },
        }
    });

    // 2. Navbar Scroll Effect & Mobile Menu
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

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Count Up Animation
    const countElements = document.querySelectorAll(".count-up");
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCountUp();
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSections = document.querySelectorAll(".hero-stats, .about-stats");
    statsSections.forEach(section => countObserver.observe(section));

    function startCountUp() {
        countElements.forEach(el => {
            if (el.dataset.started) return;
            el.dataset.started = "true";

            const target = +el.getAttribute("data-target");
            const duration = 2000;
            const increment = target / (duration / 16);
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

    // 5. Google Apps Script Form Submission
    const form = document.getElementById("recruitment-form");
    // DÁN LINK WEB APP CỦA ANH VÀO ĐÂY SAU KHI DEPLOY APPS SCRIPT
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwwU5N6cju7oLAt27hovH5UEdGgvodFjCO9LYahv9KuWxn9yaRFsr5wIuPa9ItDudYs/exec";

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            btn.classList.add("btn-loading");
            btn.disabled = true;

            const formData = new FormData(form);

            fetch(SCRIPT_URL, { method: 'POST', body: formData })
                .then(response => {
                    alert("Chúc mừng! Thông tin ứng tuyển của bạn đã được tiếp nhận. Bộ phận Nhân sự sẽ liên hệ trong 24h.");
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert("Có lỗi xảy ra khi gửi hồ sơ. Anh NTD vui lòng kiểm tra lại kết nối Apps Script ạ!");
                })
                .finally(() => {
                    btn.classList.remove("btn-loading");
                    btn.disabled = false;
                });
        });
    }

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
