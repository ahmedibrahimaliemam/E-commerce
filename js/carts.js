let noproduct=document.querySelector(".noproduct");
let productsDom=document.querySelector(".products");
function drawCartsProductUi(allData=[]){
    if(JSON.parse(localStorage.getItem("ProductsInCarts")).length===0){
        noproduct.innerHTML="No Product Added! " ;

    }
    let Data=JSON.parse(localStorage.getItem("ProductsInCarts"))||allData ;
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
        <button class="add-to-cart" onclick="removeFromCart(${ele.id})">Remove From Cart</button>

    </div>
    </div>
        `

    });
    productsDom.innerHTML=productContent.join("");
}
drawCartsProductUi();
function removeFromCart(id){
    if(localStorage.getItem("ProductsInCarts")){
        let item=JSON.parse(localStorage.getItem("ProductsInCarts")).filter(function(ele){
             return ele.id!=id ;
        })
        localStorage.setItem("ProductsInCarts",JSON.stringify(item)) ;
        drawCartsProductUi(item)
    
}}