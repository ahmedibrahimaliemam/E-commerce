let products=JSON.parse(localStorage.getItem("products"))||productss ;
let productId=JSON.parse(localStorage.getItem("editProductId")) ;
let getProduct=products.find((ele)=>ele.id==productId) ;
console.log(getProduct) ;

let productName=document.getElementById("product-title") ;
let productDesc=document.getElementById("product-desc") ;
let selection=document.getElementById("product-size") ;
let creatProductBtn=document.getElementById("creat-btn") ;
let updateForm=document.getElementById("update-form") ;
let inputFile=document.getElementById("inputfile") ;
let productSizeValue ;
let productIMG ;
productName.value=getProduct.title ;
productDesc.value=getProduct.description ;
selection.value=getProduct.size; 
productIMG=getProduct.imageUrl ;

// //Events
selection.addEventListener("change",getProductSizeValue) ;
updateForm.addEventListener("submit",updateProductFun) ;
inputFile.addEventListener("change",uploadIMG)
// //functions
function getProductSizeValue(e){
    productSizeValue =e.target.value ;
}
function updateProductFun(e){
e.preventDefault() ;
getProduct.title = productName.value ;
getProduct.description=productDesc.value ;
getProduct.size=selection.value ;
getProduct.imageUrl=productIMG ;
localStorage.setItem("products",JSON.stringify(products)) ; 
setTimeout(()=>{window.location="index.html"}, 500)
}
function uploadIMG(){
    
    let File=inputFile.files[0] ;
    console.log(File)
    let type=["image/jpeg","image/png"] ;
    if(type.indexOf(File.type)==-1){
    alert("type is not supported")
    return ;
    }
   if(File.size>2*1024*1024){
       alert("file not exced 2MG");
       return ;
   }
   base64(File)
   //productIMG=URL.createObjectURL(File) ;
}
function base64(File){
    let reader=new FileReader() ;
    reader.readAsDataURL(File) ;
    reader.onload=function(){
        console.log(reader.result) ;
        productIMG=reader.result ;
    } ;
    reader.onerror=function(){
        alert("Error!") ;
    };

}
