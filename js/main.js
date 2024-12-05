var productName =document.getElementById('productName');
var productPrice =document.getElementById('ProductPrice');
var productCategory =document.getElementById('productCategory');
var productDescription =document.getElementById('ProductDescription');
var productImage =document.getElementById('ProductImage');
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex ;
var currentId =0
var productList =[] ;
var regex ={
    productName :
    {value:/[a-z0-9]{5,10}$/,
        isValid :false , 
    },
    ProductPrice:{value:/([1-9][0-9]|100)$/,
        isValid :false ,
    },
    productCategory:{value:/(Tv|Mobile|Laptop|Screens|Other)/,
        isValid :false ,
    },
    ProductDescription:{value:/.{10}/,
        isValid:false ,
    }
}    


if(localStorage.getItem("productList") != null){
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
}



function addProduct() {
 

   var product ={
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    Desc: productDescription.value,
    image: `images/${productImage.files[0]?.name }` ,
    id: productList.length,

   }
   productList.push(product);
   updateLocalStorage()
   updateInputs()
   displayProduct(productList);
   console.log(productList);  
   addBtn.disabled = true
}


function displayProduct(list){
   var cartona ='' ;
   for(i=0 ;i<list.length ;i++){
     cartona += `<div class="col-md-4 ">
               <div class="overflow-hidden border border-2 border-primary p-0 "> 
               <img src="${list[i].image}" alt="" class="w-100 ">
                <div class="p-3 text-white">
                    <h2 class="h4 text-center text-primary"> ${list[i].newName ? list[i].newName :list[i].name}</h2>
                    <h6 >Category : ${list[i].category}</h6>
                    <h6>Price : ${list[i].price}</h6>
                    <h6>Description : ${list[i].Desc}</h6>
                    <button onclick="getDataToUpdate(${list[i].id})" class="btn btn-outline-light w-100  mt-1 mb-2">Update</button>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 ">Delete</button>
                </div>
                </div>
            </div>`

      

   }
   document.getElementById('myData').innerHTML =cartona;     
};


function deleteProduct(index) {
    console.log(index,"index"); 
    productList.splice(index,1);
    updateLocalStorage()  
    displayProduct(productList);
    
}

function updateInputs(obj){
    productName.value= obj ? obj.name : "" ;
    productPrice.value= obj ? obj.price : "" ;
    productCategory.value= obj ? obj.category : "" ;
    productDescription.value= obj ? obj.Desc : "" ;
    productImage.value="" ;
    addBtn.disabled = true
 
 };
 

function getDataToUpdate(index){
    updateInputs(productList[index]);
    currentIndex =index;
    console.log("hello" ,index);
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
};


function updateProduct(){
    console.log("hello" ,currentIndex);
    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = productPrice.value;
    productList[currentIndex].category = productCategory.value;
    productList[currentIndex].Desc = productDescription.value;
    displayProduct(productList);
    updateLocalStorage()
    updateInputs()
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none")
    
}

function updateLocalStorage(){
    localStorage.setItem("productList",JSON.stringify(productList))

}
  

function search(searchValue){
    var searchList =[]
    // if(searchValue == ""){
    //     displayProduct(productList)
    //     return
    // }
    for(i=0 ; i<productList.length;i++){
     var item = productList[i];
      if(item.name.includes(searchValue)){
        item.newName = item.name.replace(searchValue ,`<span class="text-danger">${searchValue}</span>`)
        console.log(item);
        searchList.push(item)
      }
    }
    displayProduct(searchList);
}


function validationInput(element){
    console.log(element);
    
    
  if(regex[element.id].value.test(element.value) == true){
   console.log("valid");
   element.nextElementSibling.classList.add("d-none")
   element.classList.add("is-valid")
   element.classList.remove("is-invalid")
   regex[element.id].isValid =true ;
   
  }else{
    console.log("invalid");
    element.nextElementSibling.classList.remove("d-none")
    element.classList.remove("is-valid")
    element.classList.add("is-invalid")
    regex[element.id].isValid =false ;
   
  }
  toggleAddBtn()
}

function toggleAddBtn(){
    if(regex.productName.isValid && regex.ProductPrice.isValid && regex.ProductDescription.isValid && regex.ProductDescription.isValid){
        addBtn.disabled = false;

    }else{
        addBtn.disabled = true;
    }
}



