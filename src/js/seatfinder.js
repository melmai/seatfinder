// import "./lib/widgetserver.js";
// import "./lib/carpoolvanpoolseatfinder.js";
// import "./lib/maps.js";

if (document.readyState !== "loading") {
  seatfinderInit();
} else {
  window.addEventListener("DOMContentLoaded", seatfinderInit);
}

const seatfinderInit = () => {
  console.log("init");
  const startInput = document.getElementById("start");
  startInput.addEventListener("blur", () => CheckText(this));
  startInput.addEventListener("focus", () => ClearText(this));
  startInput.addEventListener("change", CallStartAddressChanged);

  const destinationInput = document.getElementById("start");
  destinationInput.addEventListener("blur", () => CheckText(this));
  destinationInput.addEventListener("focus", () => ClearText(this));
  destinationInput.addEventListener("change", CallEndAddressChanged);

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    CallVanpoolSeatFinder();
    _gaq.push(["_trackEvent", "Seat Finder", "Search", "Vanpool Seat Finder"]);
  });
  searchButton.addEventListener("submit", () => {
    console.log("hi");
    pageTracker._trackEvent("Seat Finder", "Search", "Info for Travelers");
  });
};
