let noproduct=document.querySelector(".noproduct");
let productsDom=document.querySelector(".products");
function drawFavoriteProductUi(allData=[]){
    if(JSON.parse(localStorage.getItem("ProductsFavorite")).length===0){
        noproduct.innerHTML="No Product Added! " ;

    }
    let Data=JSON.parse(localStorage.getItem("ProductsFavorite"))||allData ;
    let productContent =Data.map(function(ele){

        return`
        <div class="product-item">
        <img src=${ele.imageUrl} class="product-item-image" alt="head-phone">
    
    <div class="product-item-desc">
        <h2>${ele.title}</h2>
        <p>${ele.description}</p>
        <span>size:${ele.size}</span>
        <span>Quntaty:${ele.qty}</span>


    </div>
    <div class="product-item-actions">
        <button class="add-to-cart"onclick="removeFromFavorite(${ele.id})">Remove From Favorite</button>

    </div>
    </div>
        `

    });
    productsDom.innerHTML=productContent.join("");
}
drawFavoriteProductUi();
function removeFromFavorite(id){
    if(localStorage.getItem("ProductsFavorite")){
        let item=JSON.parse(localStorage.getItem("ProductsFavorite")).filter(function(ele){
             return ele.id!=id ;
        })
        localStorage.setItem("ProductsFavorite",JSON.stringify(item)) ;
        drawFavoriteProductUi(item)
    
}}