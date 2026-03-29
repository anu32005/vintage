// 🌗 THEME TOGGLE
const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {
    document.body.classList.toggle("light");
};

// 🔗 PAGE NAV
function openPage(type){
    window.location.href = "gallery.html?type=" + type;
}

// 🔍 SEARCH SMART FILTER
const search = document.getElementById("search");

if(search){
    search.addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            openPage(search.value.toLowerCase());
        }
    });
}

// 🎞 SLIDER
let index = 0;
const slides = document.getElementById("slides");

function showSlide(){
    slides.style.transform = translateX(-${index*100}%);
}

function nextSlide(){
    index = (index+1)%3;
    showSlide();
}

function prevSlide(){
    index = (index-1+3)%3;
    showSlide();
}

setInterval(nextSlide, 4000);
