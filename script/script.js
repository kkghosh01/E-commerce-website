let prevScrollPos = window.pageYOffset;
const header = document.getElementById("main-header");
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
  }, 300);
});
