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
//Define Products
let productsDom=document.querySelector(".products");
let cartProducts=document.querySelector(".cart-products") ;
let cart_products_details=document.querySelector(".cart-products-details");
let badge=document.querySelector(".badge") ;
let ICON=document.querySelector(".icon-item") ;
let productss=Data ;
// function to draw product ui
let drawProductUi ;
(drawProductUi=function(Data=[]){
    let productContent =Data.map(function(ele){
        console.log(ele)

        return`
        <div class="product-item">
        <img src=${ele.imageUrl} class="product-item-image" alt="head-phone">
    
    <div class="product-item-desc">
        <a onclick='saveItemData(${ele.id})'>${ele.title}</a>
        <p>${ele.description}</p>
        <span>size:${ele.size}</span></br>
        ${ele.isMe=="Y"?`<button class="edit-product" onclick="editProduct(${ele.id})">Edit Product</button>`:""
    }

    </div>
    <div class="product-item-actions">
        <button class="add-to-cart" onclick="addToCart(${ele.id})">Add To Cart</button>
        <i class="fa-solid fa-heart fa-2x icon" style="color:${ele.liked==true?"red":""}" onclick="addToFavorite(${ele.id})"></i> 
    </div>
    </div>
        `

    });
    productsDom.innerHTML=productContent.join("");
})(JSON.parse(localStorage.getItem("products"))||productss)
//drawProductUi() ;
//check if ther is items in a local storage
     let addItem=localStorage.getItem("ProductsInCarts")?
JSON.parse(localStorage.getItem("ProductsInCarts")):[] ;
if(addItem){
    addItem.map(function(ele){
        cart_products_details.innerHTML+=`<p>${ele.title.toLocaleUpperCase()} ${ele.qty}</p>`
    }) ;
    let counter=document.querySelectorAll(".cart-products div p") ;
    badge.innerHTML=counter.length ;
    badge.style.display="block" ;
    
} ;

//add to cart
let AllItems=[]
function addToCart(id){
    let products=JSON.parse(localStorage.getItem("products"))||productss ;
    if(localStorage.getItem("UserName")){
        let product=products.find((ele)=> ele.id==id) ;
        let productInCart=addItem.some((ele)=>ele.id==product.id);
        if(productInCart){
            addItem=addItem.map((ele)=>{
                if(ele.id==product.id){
                    ele.qty+=1 ;
                    return ele ;
                }
            }) ;
            
        }
        else{
            addItem.push(product)
        }
        cart_products_details.innerHTML="" ;
        addItem.forEach((ele)=>cart_products_details.innerHTML+=`<p>${ele.title} ${ele.qty}</p>`);
        let counter=document.querySelectorAll(".cart-products div p") ;
        badge.innerHTML=counter.length ;
        badge.style.display="block" ;
        //addItem=[...addItem,product] ;
        localStorage.setItem("ProductsInCarts",JSON.stringify(addItem)) ;
        //let uniqueProduct=getUniqueArray(addItem,"id") ;
        //badge.style.visibility="visible" ;
        //badge.innerHTML=counter.length ;
        //cartProducts.innerHTML+=`<p>${product.title.toLocaleUpperCase()}</p>`
        
       
       
    
    
    }
    else{
        window.location="login.html" ;
    }
}
//open cart menue
ICON.onclick=function(){
    if(cart_products_details.innerHTML!=""){
    if(cartProducts.style.display=="block" ){
        cartProducts.style.display="none" ;
    }
    else{
        cartProducts.style.display="block" ;
    }
}
}
 function saveItemData(id){
    localStorage.setItem("productId",JSON.stringify(id)) ;
    window.location="details.html";

} 
let searchBtn=document.getElementById("search") ;
searchBtn.addEventListener("keyup",function(e){
    if(e.keyCode===13){
        if(e.target.value.trim()==""){
            drawProductUi(Data) ;
        }


        else {
            search(e.target.value ,JSON.parse(localStorage.getItem("products"))) ;

        }
    }
})
//search function
function search(title,product){
    let arr=product.filter((ele)=>ele.title.toLowerCase().indexOf(title.toLowerCase())!=-1 );
    drawProductUi(arr);
}
//get unick product 
function getUniqueArray(arr,filterType){
    let unique=arr.map(function(ele){
        return ele[filterType]  ;
    }).map((ele,i,final)=>final.indexOf(ele)==i&&i).filter((ele)=>arr[ele]).map((ele)=>arr[ele]) ;
    return unique ;

}
//add to favorite
let favorite=localStorage.getItem("ProductsFavorite")?
JSON.parse(localStorage.getItem("ProductsFavorite")):[] ;
function addToFavorite(id){
    if(localStorage.getItem("UserName")){
        let choosen=Data.find((ele)=>ele.id==id) ;
        choosen.liked=true ;
        
        favorite=[...favorite,choosen];
        let uniqueProduct=getUniqueArray(favorite,"id") ;
        localStorage.setItem("ProductsFavorite",JSON.stringify(uniqueProduct)) ;
        Data.map((ele)=>{
            if(ele.id===choosen.id){
                ele.liked=true ;
            }
        })
        localStorage.setItem("products",JSON.stringify(Data))
        drawProductUi(Data) ;
    
    
    }
    else{
        window.location="login.html" ;
    }
}
//filter product by size
let sizeFilter=document.getElementById("size-filter") ;
sizeFilter.addEventListener("change",getProductFilteredBySize) ;
function getProductFilteredBySize(e){
let val=e.target.value ;
let products=JSON.parse(localStorage.getItem("products"))||productss ;
if(val=="All"){
    drawProductUi(products) ;
}
else{
    products=products.filter((ele)=>ele.size==val);
    drawProductUi(products) ;
}
}
//edit product 
function editProduct(id){
localStorage.setItem('editProductId',id) ;
window.location="editProduct.html" ;
}

