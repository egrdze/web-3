import Cookies from "./js.cookie.min.mjs";

const deleteCookies = () => {
  Cookies.remove("visits");
  Cookies.remove("lastVisit");
  location.reload();
};

const wrapper = document.getElementById("wrapper");
const welcomeMsg = document.createElement("p");

if (!Cookies.get("visits")) {
  wrapper.classList.remove("hasCookie");

  Cookies.set("visits", 1);
  Cookies.set("lastVisit", encodeURI(new Date().toUTCString()));

  welcomeMsg.innerText = "Thank you for visiting!";
  wrapper.appendChild(welcomeMsg);
} else {
  wrapper.classList.add("hasCookie");

  let visits = Cookies.get("visits");

  welcomeMsg.innerText = `We are happy to see you here, count of your visit= ${visits++}!`;
  wrapper.appendChild(welcomeMsg);

  Cookies.set("visits", visits);

  const lastVisit = decodeURI(Cookies.get("lastVisit"));

  const lastVisitMsg = document.createElement("p");
  lastVisitMsg.innerText = `Last time: ${lastVisit}.`;
  wrapper.appendChild(lastVisitMsg);

  Cookies.set("lastVisit", encodeURI(new Date().toUTCString()));

  // reset button
  const cookieCleanerButton = document.createElement("button");
  cookieCleanerButton.innerText = "Reset";
  cookieCleanerButton.addEventListener("click", () => deleteCookies());
  wrapper.appendChild(cookieCleanerButton);
}

// const deleteCookies = () => {
//   document.cookie = "visits=; Max-Age=0; path=/; domain=" + location.hostname;
//   document.cookie =
//     "LastVisit=; Max-Age=0; path=/; domain=" + location.hostname;
//   location.reload();
// };
