const LINE_URL = "https://line.me/R/ti/p/@522noows";

const body = document.body;
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const pageTop = document.querySelector(".page-top");
const staffList = document.getElementById("staff-list");
const revealTargets = [
  ".section",
  ".fv__copy",
  ".fv__photo",
  ".point-item__text",
  ".point-item__image",
  ".about-artist__visual",
  ".about-artist__text",
  ".works-collage__image",
  ".works-section__content",
  ".solution__box",
  ".solution__image",
  ".company__image",
  ".company__info"
];

function closeMenu() {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  body.classList.remove("is-menu-open");
}

document.querySelectorAll("[data-line-link]").forEach((link) => {
  link.setAttribute("href", LINE_URL);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

document.querySelectorAll(".faq-question").forEach((button) => {
  const answerId = button.getAttribute("aria-controls");
  const answer = answerId ? document.getElementById(answerId) : null;
  const toggle = button.querySelector(".faq-toggle");

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    if (answer) answer.hidden = isExpanded;
    if (toggle) toggle.textContent = isExpanded ? "＋" : "−";
  });
});

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    body.classList.toggle("is-menu-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

if (staffList) {
  const data = Array.isArray(window.staffData) ? window.staffData : (typeof staffData !== "undefined" ? staffData : []);
  const staffSliderWrap = staffList.closest(".staff-slider-wrap");
  const hasPcStaffSlider = data.length > 3;

  if (staffSliderWrap) {
    staffSliderWrap.classList.toggle("is-slider-enabled", hasPcStaffSlider);
  }

  if (data.length) {
    staffList.innerHTML = data.map((staff) => `
      <article class="swiper-slide staff-card">
        <h3 class="staff-card__name">${staff.nameJa || ""}<small>${staff.nameEn || ""}</small></h3>
        <figure class="image-frame">
          <img src="${staff.image || "images/staff/staff-01.jpg"}" alt="${staff.nameJa || "スタイリスト"}の写真" width="420" height="340">
        </figure>
        <div class="staff-card__actions">
          <a href="${staff.instagramUrl || "#"}" aria-label="${staff.nameJa || "スタイリスト"}のInstagram" target="_blank" rel="noopener noreferrer">
            <img src="images/staff/instagram-icon.png" alt="" width="42" height="42">
          </a>
          ${staff.externalUrl ? `<a href="${staff.externalUrl}" aria-label="${staff.nameJa || "スタイリスト"}の外部リンク" target="_blank" rel="noopener noreferrer">
            <img src="images/staff/external-link-icon-fixed.png" alt="" width="42" height="42">
          </a>` : ""}
        </div>
        ${staff.role ? `<h4 class="staff-card__role">${staff.role}</h4>` : ""}
        <p class="staff-card__text">${staff.description || ""}</p>
      </article>
    `).join("");
  } else {
    staffList.innerHTML = '<p class="swiper-slide staff-card">現在表示できるスタイリスト情報はありません。</p>';
  }

  if (typeof Swiper !== "undefined" && data.length) {
    new Swiper(".staff-swiper", {
      loop: hasPcStaffSlider,
      watchOverflow: true,
      keyboard: { enabled: true },
      slidesPerView: 1.15,
      spaceBetween: 18,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".slider-arrow--next",
        prevEl: ".slider-arrow--prev"
      },
      breakpoints: {
        821: {
          slidesPerView: 2.2,
          spaceBetween: 24
        },
        1181: {
          slidesPerView: 3,
          spaceBetween: 34
        }
      }
    });
  }
}

const voiceSwiperEl = document.querySelector(".voice-swiper");

if (voiceSwiperEl && typeof Swiper !== "undefined") {
  const voiceSlides = voiceSwiperEl.querySelectorAll(".swiper-slide").length;

  new Swiper(".voice-swiper", {
    loop: voiceSlides > 3,
    watchOverflow: true,
    keyboard: { enabled: true },
    slidesPerView: 1.08,
    spaceBetween: 18,
    pagination: {
      el: ".voice-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".voice-arrow--next",
      prevEl: ".voice-arrow--prev"
    },
    breakpoints: {
      821: {
        slidesPerView: 2.2,
        spaceBetween: 24
      },
      1181: {
        slidesPerView: 3,
        spaceBetween: 34
      }
    }
  });
}

const revealElements = document.querySelectorAll(revealTargets.join(","));

if ("IntersectionObserver" in window) {
  revealElements.forEach((element) => element.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.12
  });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (pageTop) {
  window.addEventListener("scroll", () => {
    pageTop.classList.toggle("is-visible", window.scrollY > 600);
  }, { passive: true });

  pageTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
