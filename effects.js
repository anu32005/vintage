const params = new URLSearchParams(window.location.search);
const type = params.get("type");

if(type){
    startEffect(type);
}

function startEffect(type){
    const body = document.body;

    setInterval(()=>{
        const el = document.createElement("div");

        el.classList.add("particle");

        if(type==="romantic") el.innerHTML="💖";
        if(type==="engagement") el.innerHTML="❤️";
        if(type==="prewedding") el.innerHTML="⭐";
        if(type==="birthday") el.innerHTML="🎆";
        if(type==="model") el.innerHTML="⚡";

        el.style.left = Math.random()*100 + "vw";

        body.appendChild(el);

        setTimeout(()=>el.remove(),3000);

    },300);
}
