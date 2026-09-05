/* ==========================================================
   JavaScript بسيط لتشغيل الوظائف التفاعلية في النسخة الثابتة
   - قائمة الجوال
   - Countdown
   - المساعد زيد
   - زر العودة للأعلى
   - تحريك الأرقام عند ظهور الإحصائيات

   لاحقًا في React يمكن تحويل كل جزء إلى Component مستقل.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------
     0) Hero image fallback for GitHub Pages
     GitHub Pages is case-sensitive. Try common filename variants
     if the primary image path returns 404.
     -------------------------------------------------------- */
  const heroImage = document.getElementById("hero-image");

  if (heroImage) {
    const heroCandidates = [
      "./assets/images/innovation.PNG",
      "./assets/images/innovation.png",
      "./assets/images/Innovation.png",
      "./assets/images/Innovation.PNG",
      "./assets/images/innovation.jpg",
      "./assets/images/innovation.JPG",
      "./assets/images/Innovation.jpg",
      "./assets/images/Innovation.JPG",
      "./assets/images/innovation.jpeg",
      "./assets/images/Innovation.jpeg"
    ];

    const absoluteCandidates = heroCandidates.map(
      (candidate) => new URL(candidate, document.baseURI).href
    );
    let heroCandidateIndex = absoluteCandidates.indexOf(heroImage.src);
    if (heroCandidateIndex < 0) heroCandidateIndex = 0;

    const tryNextHeroImage = () => {
      heroCandidateIndex += 1;

      if (heroCandidateIndex < heroCandidates.length) {
        heroImage.src = heroCandidates[heroCandidateIndex];
      } else {
        heroImage.style.display = "none";
        document.querySelector(".hero")?.classList.add("hero--image-missing");
        console.error(
          "Hero image not found. Upload innovation.png to assets/images/ and match the filename case exactly."
        );
      }
    };

    heroImage.addEventListener("error", tryNextHeroImage);

    // إذا كانت الصورة فشلت قبل تسجيل حدث error (قد يحدث على GitHub Pages)
    // نبدأ محاولة الاسم التالي مباشرة.
    if (heroImage.complete && heroImage.naturalWidth === 0) {
      tryNextHeroImage();
    }
  }

  /* --------------------------------------------------------
     1) قائمة الجوال
     -------------------------------------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // يغلق القائمة عند اختيار أي رابط في الجوال.
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // دعم زر Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* --------------------------------------------------------
     2) Countdown
     تاريخ الحدث مأخوذ من data-date داخل index.html
     -------------------------------------------------------- */
  const countdownCard = document.getElementById("countdown-card");

  if (countdownCard) {
    const eventDate = new Date(countdownCard.dataset.date).getTime();

    const units = {
      days: countdownCard.querySelector('[data-unit="days"]'),
      hours: countdownCard.querySelector('[data-unit="hours"]'),
      minutes: countdownCard.querySelector('[data-unit="minutes"]'),
      seconds: countdownCard.querySelector('[data-unit="seconds"]'),
    };

    const formatNumber = (value) =>
      new Intl.NumberFormat("ar-OM", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }).format(value);

    const updateCountdown = () => {
      const now = Date.now();
      const remaining = Math.max(eventDate - now, 0);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      units.days.textContent = formatNumber(days);
      units.hours.textContent = formatNumber(hours);
      units.minutes.textContent = formatNumber(minutes);
      units.seconds.textContent = formatNumber(seconds);

      // بعد انتهاء الموعد لا تظهر أرقام سالبة.
      if (remaining === 0) {
        clearInterval(timer);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  /* --------------------------------------------------------
     3) المساعد زيد - واجهة تجريبية فقط
     في النسخة الفعلية استبدل الرد التجريبي بطلب API.
     -------------------------------------------------------- */
  const chatPanel = document.querySelector(".chat-panel");
  const chatClose = document.querySelector(".chat-close");
  const openChatButtons = document.querySelectorAll(".js-open-chat");
  const chatForm = document.querySelector(".chat-form");
  const chatMessages = document.querySelector(".chat-panel__messages");

  const openChat = () => {
    if (!chatPanel) return;
    chatPanel.classList.add("is-open");
    chatPanel.setAttribute("aria-hidden", "false");
  };

  const closeChat = () => {
    if (!chatPanel) return;
    chatPanel.classList.remove("is-open");
    chatPanel.setAttribute("aria-hidden", "true");
  };

  openChatButtons.forEach((button) => button.addEventListener("click", openChat));
  chatClose?.addEventListener("click", closeChat);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeChat();
  });

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = chatForm.querySelector("input");
    const question = input.value.trim();
    if (!question) return;

    const userMessage = document.createElement("div");
    userMessage.className = "message";
    userMessage.textContent = question;
    userMessage.style.marginTop = "10px";
    userMessage.style.background = "#e9f3fa";
    chatMessages.appendChild(userMessage);

    const botMessage = document.createElement("div");
    botMessage.className = "message message--bot";
    botMessage.style.marginTop = "10px";
    botMessage.textContent =
      "هذه واجهة تجريبية. في النسخة الكاملة سيتم ربط السؤال بقاعدة المعرفة أو API للذكاء الاصطناعي.";
    chatMessages.appendChild(botMessage);

    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  /* --------------------------------------------------------
     4) زر العودة للأعلى
     -------------------------------------------------------- */
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (!backToTop) return;
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* --------------------------------------------------------
     5) تحريك عدادات قسم "مسندم تبتكر"
     يبدأ مرة واحدة عند دخول القسم إلى الشاشة.
     -------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count]");

  const animateCounter = (element) => {
    const target = Number(element.dataset.count);
    const duration = 1200;
    const startTime = performance.now();

    const frame = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * target);

      const eased = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      element.textContent = new Intl.NumberFormat("en-US").format(eased) + "+";

      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }
  /* --------------------------------------------------------
     6) معرض صور الأخبار - 3 صور بأسلوب إنستغرام
     يدعم: الأسهم، النقاط، لوحة المفاتيح، والسحب على الجوال.
     -------------------------------------------------------- */
  document.querySelectorAll("[data-news-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".news-carousel__track");
    const slides = Array.from(carousel.querySelectorAll(".news-carousel__slide"));
    const dots = Array.from(carousel.querySelectorAll(".news-carousel__dot"));
    const counter = carousel.querySelector(".news-carousel__counter");
    const prevButton = carousel.querySelector(".news-carousel__nav--prev");
    const nextButton = carousel.querySelector(".news-carousel__nav--next");

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const goToSlide = (index) => {
      const total = slides.length;
      currentIndex = (index + total) % total;

      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === currentIndex);
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });

      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${total}`;
      }
    };

    prevButton?.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextButton?.addEventListener("click", () => goToSlide(currentIndex + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(currentIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });

    carousel.addEventListener(
      "touchstart",
      (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        // يمنع تغيير الصورة عند التمرير العمودي العادي للصفحة.
        if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

        if (deltaX < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      },
      { passive: true }
    );

    goToSlide(0);
  });

});
