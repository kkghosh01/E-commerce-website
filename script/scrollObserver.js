function observeOnScroll({
  selectors = [],
  threshold = 0.1,
  stagger = true,
  rootMargin = "0px",
} = {}) {
  if (!selectors.length) return;

  const elements = document.querySelectorAll(selectors.join(","));

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  elements.forEach((el, index) => {
    observer.observe(el);

    if (stagger) {
      const delay = index * 0.03;
      el.style.transitionDelay = `${delay}s`;
    }
  });
}

export default observeOnScroll;
