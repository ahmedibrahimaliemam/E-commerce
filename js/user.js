let userInfo=document.getElementById("user-info") ;
let user=document.getElementById("user") ;
let link=document.getElementById("link") ;
if(localStorage.getItem("UserName")){
    link.remove()
    userInfo.style.display="flex" ;
    user.innerHTML=localStorage.getItem("UserName") ;
    user.style.color="white" ;
    
}
let out=document.getElementById("out-btn") ;
out.onclick=function(){
    localStorage.clear() ;
    setTimeout(() => {
        window.location="register.html" ;
    }, 1500);
}