export function handleNavbar() {
  const menuIcon = document.querySelector(".nav-links i");
  const navMenu = document.querySelector(".nav-links ul");
  const header = document.getElementById("main-header");

  let prevScrollPos = window.pageYOffset;

  let isScrolling;

  window.addEventListener("scroll", function () {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      header.style.top = "0";
    } else {
      header.style.top = "-100px";
    }

    prevScrollPos = currentScrollPos;

    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(function () {
      header.style.top = "0";
    }, 150);
  });

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });
}
