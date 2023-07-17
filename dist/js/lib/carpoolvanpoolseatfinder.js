// CarpoolVanpoolSeatFinder.js
// http://rideshareonline.icarpool.com/Widgets/js/iCarpoolVanpoolSeatFinder.js
var url = window.location.href;
var hostName = url.match(/:\/\/(www\.)?(.[^/:]+)/)[2];
// document.write(
//   '<script text="text/javascript" src="//maps.google.com/maps/api/js"></script>'
// );
var iCarpoolCopyrightdiv =
  '<span style="color: Gray">&copy;</span>&nbsp;<a style="color: Gray; font-size: 10px; font-family: Verdana;" target="_blank" href="http://www.smartrideshare.com">SmartRideshare</a>';
if (document.getElementById("iCarpoolCopyright") != null) {
  document
    .getElementById("iCarpoolCopyright")
    .setAttribute("style", "width:180px;text-align:Left");
  document.getElementById("iCarpoolCopyright").innerHTML = iCarpoolCopyrightdiv;
}

var defaultText = "Enter full address";
var defaultText1 = "City, State or Zip";
var startLat, startLong, destinationLat, destinationLong;

var objStart = document.getElementById("start");
if (
  objStart.value.toLowerCase() == defaultText.toLowerCase() ||
  objStart.value.toLowerCase() == defaultText1.toLowerCase()
) {
  objStart.value = "";
  if (objStart.placeholder == "") {
    objStart.setAttribute("placeholder", defaultText);
  }
  objStart.style.color = "Gray";
}

var objDest = document.getElementById("destination");
if (
  objDest.value.toLowerCase() == defaultText.toLowerCase() ||
  objDest.value.toLowerCase() == defaultText1.toLowerCase()
) {
  objDest.value = "";
  if (objDest.placeholder == "") {
    objDest.setAttribute("placeholder", defaultText);
  }
  objDest.style.color = "Gray";
}

function ClearText(obj) {}

function CheckText(obj) {}

function CallVanpoolSeatFinder() {
  var start = document.getElementById("start").value;
  var dest = document.getElementById("destination").value;

  //triming the start and destination addresses, to make sure empty addresses are not entered.
  start = start.replace(/^\s+|\s+$/g, "");
  dest = dest.replace(/^\s+|\s+$/g, "");
  if (
    start.toLowerCase() != defaultText.toLowerCase() &&
    dest.toLowerCase() != defaultText.toLowerCase() &&
    start.toLowerCase() != defaultText1.toLowerCase() &&
    dest.toLowerCase() != defaultText1.toLowerCase() &&
    start != "" &&
    dest != "" &&
    startLat != null &&
    startLong != null &&
    destinationLat != null &&
    destinationLong != null
  ) {
    VanpoolSeatFinder(start, dest);
  }
}

function VanpoolSeatFinder() {
  var src =
    iCarpoolServer +
    "/Widgets/data/VanpoolSeatFinderResults.aspx?origin=" +
    escape(document.getElementById("start").value) +
    "&destination=" +
    escape(document.getElementById("destination").value) +
    "&hostName=" +
    encodeURI(hostName) +
    "&showVanpoolsFromHostNetworkOnly=" +
    document.getElementById("showVanpoolsFromHostNetworkOnly").value +
    "&startlat=" +
    startLat +
    "&startlon=" +
    startLong +
    "&endlat=" +
    destinationLat +
    "&endlon=" +
    destinationLong;
  window.open(src);
}

function CallStartAddressChanged() {
  startLat = null;
  startLong = null;

  var start = document.getElementById("start");
  addressChanged(start);
}

function CallEndAddressChanged() {
  destinationLat = null;
  destinationLong = null;

  var dest = document.getElementById("destination");
  addressChanged(dest);
}

function addressChanged(addrTextBox) {
  var geocoder = new google.maps.Geocoder();
  var addr = addrTextBox.value;

  if (addr == "") return;
  geocoder.geocode({ address: addr }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      addrTextBox.value = results[0].formatted_address;
      if (addrTextBox.id == "start") {
        startLat = results[0].geometry.location.lat();
        startLong = results[0].geometry.location.lng();
      } else if (addrTextBox.id == "destination") {
        destinationLat = results[0].geometry.location.lat();
        destinationLong = results[0].geometry.location.lng();
      }
    } else {
      addrTextBox.value = "";
      return;
    }
  });
}
