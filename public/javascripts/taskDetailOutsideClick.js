export const listenForOutsideClick = (eventListener) => {
  const appBody = document.querySelector(".app-inner-body");
  const header = document.querySelector(".header-nav");
  const navMenu = document.querySelector(".nav-menu-container");
  const listenerList = [appBody, header, navMenu];

  listenerList.forEach((ele) => {
    ele.addEventListener("click", eventListener);
  });
};
