const currentPage = window.location.pathname.split("/").pop() || "index.html";
const activePage = currentPage.startsWith("bai-") ? "projects.html" : currentPage;

document.querySelectorAll("[data-nav]").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === activePage || (activePage === "" && href === "index.html")) {
    link.classList.add("active");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll("a[href$='.html']").forEach((link) => {
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;

  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 160);
  });
});
