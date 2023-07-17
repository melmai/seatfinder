// import "./lib/widgetserver.js";
// import "./lib/carpoolvanpoolseatfinder.js";
// import "./lib/maps.js";

if (document.readyState !== "loading") {
  seatfinderInit();
} else {
  window.addEventListener("DOMContentLoaded", seatfinderInit);
}

function seatfinderInit() {
  console.log("init");
  const startInput = document.getElementById("start");
  startInput.addEventListener("blur", (e) => {
    console.log(e);
    CheckText(e.target);
  });
  startInput.addEventListener("focus", () => ClearText(this));
  startInput.addEventListener("change", CallStartAddressChanged);

  const destinationInput = document.getElementById("start");
  destinationInput.addEventListener("blur", () => CheckText(this));
  destinationInput.addEventListener("focus", () => ClearText(this));
  destinationInput.addEventListener("change", CallEndAddressChanged);

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    console.log("button clicked");
    CallVanpoolSeatFinder();
    // _gaq.push(["_trackEvent", "Seat Finder", "Search", "Vanpool Seat Finder"]);
  });
  searchButton.addEventListener("submit", () => {
    console.log("form submitted");
    // pageTracker._trackEvent("Seat Finder", "Search", "Info for Travelers");
  });
}
