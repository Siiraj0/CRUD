const inp=document.querySelectorAll('input');
const btn=document.querySelectorAll('button[type="submit"]')
inp.forEach(e=>{
    e.oninput=()=>{
        if(e.value.trim()==''){
            btn.forEach(el=>{
                el.style.opacity=.6;
                el.style.pointerEvents="none";

            })
        }else{
            btn.forEach(el=>{
                el.style.opacity=1;
                el.style.pointerEvents="all";

            })
        }
    }
})