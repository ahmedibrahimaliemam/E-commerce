let products=JSON.parse(localStorage.getItem("products")) ;
let productID=JSON.parse(localStorage.getItem("productId")) ;
let itemDetails=document.querySelector(".item-details")

let productDetails=products.find((ele)=>ele.id==productID);
itemDetails.innerHTML=`
             <img src="${productDetails.imageUrl}" alt="">
                <h2>${productDetails.title}</h2>
                <span>size:${productDetails.size}</span></br>
                <span>Quantaty:${productDetails.qty}</span>


`;