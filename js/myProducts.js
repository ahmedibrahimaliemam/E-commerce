let products=JSON.parse(localStorage.getItem("products"))||Data ;
let productsDom=document.querySelector(".products");
let noproduct=document.querySelector(".noproduct") ;
//console.log(filtered)
let drawProductUi ;
(drawProductUi=function(products=[]){
    let filtered=products.filter(item => item.isMe=="Y");
    if(filtered.length!=0){
        console.log("yes")
        let productContent =filtered.map(function(ele){
    
            return`
            <div class="product-item">
            <img src=${ele.imageUrl} class="product-item-image" alt="head-phone">
        
        <div class="product-item-desc">
            <a onclick='saveItemData(${ele.id})'>${ele.title}</a>
            <p>${ele.description}</p>
            <span>size:${ele.size}</span></br>
        <button class="edit-product" onclick="editProduct(${ele.id})">Edit Product</button>
        <button class="edit-product" onclick="deleteProduct(${ele.id})">Delete Product</button>

        </div>
        `
    
        });
        productsDom.innerHTML=productContent.join("");

    }
    else{
        noproduct.innerHTML="No products!!" ;
    }
    
    
})(JSON.parse(localStorage.getItem("products"))||Data)
//edit product 
function editProduct(id){
    localStorage.setItem('editProductId',id) ;
    window.location="editProduct.html" ;
    }
//delete product
function deleteProduct(id){
    let products=JSON.parse(localStorage.getItem("products"))||Data ;
    let filtered=products.filter(item => item.isMe=="Y");
    console.log(filtered) ;
    let Deleted=filtered.filter(ele => ele.id!=id);
    console.log(Deleted) ;
    console.log(products)
    let clicked=filtered.find((ele)=>ele.id==id) ;
    products=products.filter((ele)=>ele.id!=clicked.id);
    console.log(products) ;
    drawProductUi(filtered)

}    