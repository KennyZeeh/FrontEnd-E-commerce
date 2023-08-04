const add_cart_btn = document.getElementById(`btn`);
const cart_buttons = document.querySelectorAll('.add-to-cart-btn');
const item = document.querySelector(".item-no");

let count = 0; 

cart_buttons.forEach((button)=>{
    button.addEventListener("click", (evt) => {
        const parentContainer = button.parentElement.parentElement;

        if (button.classList.contains("addNow"))  {
            console.log("added to cart");
            button.classList.toggle("addNow");
            button.classList.add("added");
            button.innerText = "Remove Item";
            // cartItemCount(cart_storage); 


            let product = getProductDetail(parentContainer);
            storeCartItems(product);
        }else if (button.classList.contains("added")){
            console.log("item removed from cart")
            button.classList.toggle("added");
            button.classList.add("addNow");
            button.innerText = "Add to Cart";
           removeItemFromCart((parentContainer.dataset.productId));
        }
    }); 
});

const getProductDetail = (element) =>{
    const product_id = element.dataset.productId;
    return{
        id: product_id,
        img: element.previousElementSibling.src,
        price: element.querySelector(".price").innerText,
        title: element.querySelector(".detail").innerText,
        quantity: 1,
    };
   
};

let cart_storage = sessionStorage.getItem('product-cart') === null ? [] : JSON.parse(sessionStorage.getItem('product-cart'));

function storeCartItems(product){
    cart_storage.push(product);
    sessionStorage.setItem(`product-cart`, JSON.stringify(cart_storage));
    count++;
    item.innerText = count;
}

function removeItemFromCart(id){
    cart_storage = cart_storage.filter((product) => product.id != id);
    sessionStorage.setItem(`product-cart`, JSON.stringify(cart_storage));
    count--;
    item.innerText= count;
}

function cartItemCount(cart_storage){
    const li = document.createElement("li") ;
    li.innerHTML = `${cart_storage.img} <span>${cart_storage.price}</span> <button class = 'delete-btn' 
    onclick = 'removeItemsFromCart(${cart_storage.id})'>X</button><li>`;
    document.querySelector('#other').appendChild;
}


// //TO DISPLAY IN CART

// obj.addItemToCart = function(img, title, price, quantity) {
//     for(var item in storeCartItems) {
//       if(cartItemCount[item].img === img) {
//         cartItemCount[item].count ++;
//         saveCart();
//         return;
//       }
//     }
//     var item = new Item(img, title, price, quantity);
//     cartItemCount.push(item);
//     saveCart();
// }

// obj.setCountForItem = function(title, quantity) {
//     for(var i in cart) {
//       if (cart[i].name === title) {
//         cart[i].count = count;
//         break;
//       }
//     }
//   };
