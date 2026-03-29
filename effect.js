const params = new URLSearchParams(window.location.search);
const type = params.get("type");

if(type){
    setInterval(()=>{
        const el = document.createElement("div");
        el.classList.add("particle");

        if(type==="romantic") el.innerHTML="💖";
        else if(type==="engagement") el.innerHTML="❤️";
        else if(type==="prewedding") el.innerHTML="⭐";
        else if(type==="birthday") el.innerHTML="🎆";
        else if(type==="model") el.innerHTML="⚡";
        else el.innerHTML="✨";

        el.style.left = Math.random()*100 + "vw";

        document.body.appendChild(el);

        setTimeout(()=>el.remove(),3000);
    },300);
}
