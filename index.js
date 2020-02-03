// Intantiates the 'particles.js' canvas on the webpage.
// For details, reach out to https://github.com/VincentGarreau/particles.js/
particlesJS.load(
  "particles-js",
  "/public/particles-config-pink.json",
  function() {
    console.log("callback - particles.js config loaded");
  }
);

// Responsible for opening and closing our navbar when clicking on the 'burger'
document.addEventListener("DOMContentLoaded", () => {
  // Get all the nav-bars on the page...
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbars on the current page...
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them that
    // will toggle its opening or closing animation...
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both
        // the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Responsible for closing our nav-bar when clicking on any item of it.
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve all the items of all nav-bars
  const $navbarItems = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-item"),
    0
  );

  // Retrieve all nav-bars
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any items of any navbars on the current page
  if ($navbarItems.length > 0) {
    // Add a click event on each the retrieved items.
    $navbarItems.forEach(el => {
      el.addEventListener("click", () => {
        // When clicking any element of any nav-bar in the current page...
        // ...ALL nav-bars should close.
        $navbarBurgers.forEach(el => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Removing the 'is-active' attribute of
          // all nav-bars in the current page.
          el.classList.remove("is-active");
          $target.classList.remove("is-active");
        });
      });
    });
  }
});

// These general purpose functions are responsible...
// ...for disabling all the clicable elements...
// ...below the 'position: absolute' elements...
const disableClick = elementsClass => {
  const elements = document.getElementsByClassName(elementsClass);

  for (element of elements) {
    element.style.pointerEvents = "none";
  }
};

const enableClick = elementsClass => {
  const elements = document.getElementsByClassName(elementsClass);

  for (element of elements) {
    element.style.pointerEvents = "auto";
  }
};
