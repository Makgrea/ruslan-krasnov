```javascript
/* ======================================
   RUSLAN KRASNOV #69
   Premium Hockey Portfolio
====================================== */

/* ==========================
   LANGUAGE SWITCHER
========================== */

const ruBtn = document.getElementById("ruBtn");
const enBtn = document.getElementById("enBtn");

function setLanguage(lang){

document.documentElement.lang = lang;

const elements = document.querySelectorAll("[data-ru]");

elements.forEach(el => {

if(lang === "ru"){
el.innerHTML = el.dataset.ru;
}else{
el.innerHTML = el.dataset.en;
}

});

if(lang === "ru"){
ruBtn.classList.add("active");
enBtn.classList.remove("active");
}else{
enBtn.classList.add("active");
ruBtn.classList.remove("active");
}

localStorage.setItem("siteLanguage", lang);

}

if(ruBtn && enBtn){

ruBtn.addEventListener("click", () => {
setLanguage("ru");
});

enBtn.addEventListener("click", () => {
setLanguage("en");
});

const savedLanguage = localStorage.getItem("siteLanguage");

if(savedLanguage){
setLanguage(savedLanguage);
}

}

/* ==========================
   FADE IN ON SCROLL
========================== */

const observer = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{
threshold:0.15
}

);

document.querySelectorAll(
"section, .achievement-card, .timeline-item, .stat"
).forEach(item => {

item.classList.add("hidden");

observer.observe(item);

});

/* ==========================
   LIGHTBOX GALLERY
========================== */

const galleryImages = document.querySelectorAll(".gallery-grid img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML = `
<span class="close-lightbox">&times;</span>
<img class="lightbox-image" src="">
`;

document.body.appendChild(lightbox);

const lightboxImage =
lightbox.querySelector(".lightbox-image");

galleryImages.forEach(image => {

image.addEventListener("click", () => {

lightbox.classList.add("active");

lightboxImage.src = image.src;

});

});

lightbox.addEventListener("click", (e) => {

if(
e.target === lightbox ||
e.target.classList.contains("close-lightbox")
){

lightbox.classList.remove("active");

}

});

/* ==========================
   COUNTER ANIMATION
========================== */

const stats = document.querySelectorAll(".stat h3");

const animateCounter = (element) => {

const value = element.innerText;

const number = parseInt(value);

if(isNaN(number)) return;

let start = 0;

const speed = 20;

const update = () => {

if(start < number){

start += Math.ceil(number / 40);

if(start > number){
start = number;
}

element.innerText = start;

setTimeout(update, speed);

}else{

element.innerText = value;

}

};

update();

};

const statObserver = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

const h3 =
entry.target.querySelector("h3");

if(h3){

animateCounter(h3);

}

statObserver.unobserve(entry.target);

}

});

},

{
threshold:0.5
}

);

document.querySelectorAll(".stat").forEach(stat => {

statObserver.observe(stat);

});

/* ==========================
   PARALLAX HERO
========================== */

window.addEventListener("scroll", () => {

const heroVideo =
document.querySelector(".hero-video");

if(heroVideo){

const scrollY = window.scrollY;

heroVideo.style.transform =
`translateY(${scrollY * 0.25}px)`;

}

});

/* ==========================
   ACTIVE MENU
========================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop =
section.offsetTop - 150;

if(window.scrollY >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove("active-link");

if(
link.getAttribute("href") ===
`#${current}`
){

link.classList.add("active-link");

}

});

});

/* ==========================
   SMOOTH BUTTON EFFECT
========================== */

document.querySelectorAll("a[href^='#']")
.forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({
behavior:"smooth"
});

}

});

});

/* ==========================
   HERO GLOW EFFECT
========================== */

const heroTitle =
document.querySelector(".hero-text h1");

if(heroTitle){

setInterval(() => {

heroTitle.classList.toggle("pulse");

}, 2500);

}
```
