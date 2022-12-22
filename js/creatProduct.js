let productName=document.getElementById("product-title") ;
let productDesc=document.getElementById("product-desc") ;
let selection=document.getElementById("product-size") ;
let creatProductBtn=document.getElementById("creat-btn") ;
let creatForm=document.getElementById("creat-form") ;
let inputFile=document.getElementById("inputfile") ;
let productSizeValue ;
let productIMG ;
//Events
selection.addEventListener("change",getProductSizeValue) ;
creatForm.addEventListener("submit",creatProductFun) ;
inputFile.addEventListener("change",uploadIMG)
//functions
function getProductSizeValue(e){
    productSizeValue =e.target.value ;
}
function creatProductFun(e){
    e.preventDefault() ;
    if(productName.value&&productDesc.value){
    let allProducts=JSON.parse(localStorage.getItem("products"))||Data ;
    let title=productName.value ;
    let descriptions=productDesc.value ;
    let obj= {
        id:(allProducts)?allProducts.length+1:1 ,
        title:title ,
        description:descriptions,
        size:productSizeValue ,
        imageUrl:productIMG,
        qty:1 ,
        isMe:"Y"
    }
    let newProducts=allProducts?[...allProducts,obj] :[obj]  ;
    localStorage.setItem("products",JSON.stringify(newProducts)); 
    productName.value="" ;
    productDesc.value="" ;
    selection.value="";
    setTimeout(()=>window.location="index.html",1500) ;
}
    else{
        alert("please fill all data") ;
    }
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
