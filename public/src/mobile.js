
const openMenuMobile = () => {
  const menu = document.getElementsByClassName("nav__menu");
  const nav_btn = document.getElementsByClassName("nav__button");
  const btn = nav_btn[0].children[0];
  const text = nav_btn[0].children[1];
  text.classList.toggle("nav__button__text--active");
  btn.classList.toggle("nav__button--active");
  menu[0].classList.toggle("nav__menu--active");
};