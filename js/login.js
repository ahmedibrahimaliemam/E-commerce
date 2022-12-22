let user=document.getElementById("name") ;
let password=document.getElementById("password") ;
let btn=document.getElementById("btn") ;
let userName=localStorage.getItem("UserName") ;
let validation=localStorage.getItem("password") ;
btn.addEventListener("click",function(e){
    e.preventDefault() ;
    if(user.value==""||password.value==""){
        alert("Please Fill Data") ;
    }
    else{
        if((userName
         && userName.trim()===user.value)&&
         (validation
         &&validation===password.value)
        ){
            setTimeout(function(){
                window.location="index.html" ;
            },1500)
        }
        else{
            alert("Username or password is wrong!") ;
        }
    }
}
)
