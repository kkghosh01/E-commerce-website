export function handleNavbar() {
  const menuIcon = document.querySelector(".header-left i");
  const navMenu = document.querySelector(".nav-links ul");
  const header = document.getElementById("main-header");
  const searchIcon = document.querySelector(".mobile-search i");
  const searchDiv = document.querySelector(".search");
  let prevScrollPos = window.pageYOffset;

  // Scroll Logic
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      header.style.top = "0";
    } else {
      header.style.top = "-100px";
    }

    prevScrollPos = currentScrollPos;
  };

  // Menu Icon Click
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
    //  Search hide
    searchDiv.classList.remove("active");
  });

  // Search Icon Click
  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    searchDiv.classList.toggle("active");
    //  Menu hide
    navMenu.classList.remove("active");
  });

  // Click Outside to Close Menu & Search
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
      navMenu.classList.remove("active");
    }

    if (!searchDiv.contains(e.target) && !searchIcon.contains(e.target)) {
      searchDiv.classList.remove("active");
    }
  });
}
