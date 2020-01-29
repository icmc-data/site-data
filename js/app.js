particlesJS.load(
  "particles-js",
  "/public/particles-config-pink.json",
  function() {
    console.log("callback - particles.js config loaded");
  }
);

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarItems = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-item"),
    0
  );

  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarItems.length > 0) {
    // Add a click event on each of them
    $navbarItems.forEach(el => {
      el.addEventListener("click", () => {
        $navbarBurgers.forEach(el => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          console.log("Element", el);
          console.log("Target", $target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.remove("is-active");
          $target.classList.remove("is-active");
        });
      });
    });
  }
});

