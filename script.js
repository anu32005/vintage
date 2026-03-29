// SAFE ELEMENTS
const toggle = document.getElementById("themeToggle");
const search = document.getElementById("search");
const slides = document.getElementById("slides");

// 🌗 TOGGLE
if(toggle){
    toggle.onclick = () => {
        document.body.classList.toggle("light");
    };
}

// 🔗 NAVIGATION
function openPage(type){
    window.location.href = "gallery.html?type=" + type;
}

// 🔍 SEARCH
if(search){
    search.addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            openPage(search.value.toLowerCase());
        }
    });
}

// 🎞 SLIDER SAFE
let index = 0;

if(slides){
    function showSlide(){
        slides.style.transform = translateX(-${index*100}%);
    }

    function nextSlide(){
        index = (index+1)%3;
        showSlide();
    }

    setInterval(nextSlide, 3000);
}

// 📄 GALLERY TITLE
const params = new URLSearchParams(window.location.search);
const type = params.get("type");

if(type){
    const title = document.getElementById("title");
    if(title){
        title.innerText = type.toUpperCase();
    }
}
