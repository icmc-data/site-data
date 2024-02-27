// Intantiates the 'particles.js' canvas on the webpage.
// For details, reach out to https://github.com/VincentGarreau/particles.js/
particlesJS.load(
  "particles-js",
  "/public/particles/particles-config-pink.json",
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

// Copies a string to the clipboard. Must be called from within an event handler such as click.
// May return false if it failed, but this is not always
// possible. Browser support for Chrome 43+, Firefox 42+, Edge and IE 10+.
// No Safari support, as of (Nov. 2015). Returns false.
// IE: The clipboard feature may be disabled by an adminstrator. By default a prompt is
// shown the first time the clipboard is used (per session).
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      alert("Email copiado para sua área de transferência :)");
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

// document.querySelector("#copy").onclick = function() {
//   var result = copyToClipboard("data@icmc.usp.br");
//   console.log("Clipboard result:", result);
// };

