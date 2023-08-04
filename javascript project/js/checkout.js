let cart_storage = sessionStorage.getItem('product-cart') === null ? [] : JSON.parse(sessionStorage.getItem('product-cart'));
    
let ui_list_element = document.querySelector(".cart-container");
function createCartItem() {
    if (cart_storage.length > 0){
        cart_storage.forEach((cart) =>{
            const ui_design = createListCartElement(cart);

            ui_list_element.innerHTML += ui_design;
        });
    }
}

function createListCartElement(cart_object) {
    return `
        <div class="item" style="display: flex;
        background: #ddefcc4a;
        box-shadow: 2px 2px 8px rgba(12,23,111,0.4);
        margin-bottom: 15px; margin-top:5px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;">
            <div id="img-name">
                <img src=${cart_object.img} style height="100px"/>
                <h1 class="title">${cart_object.title}</h1>
                <p class="price" style='font-size: 26px; margin-left: 35px; font-weight: bold; font-style:italic; color:blue;'>${cart_object.price}</p> 
            </div>
            <div style="display: flex; flex-direction: column-reverse;
                align-items: center; justify-content: center;">
                <div class="counter">
                    <button class="reduce_qty">-</button>
                    <p class="quantity">1</p>
                    <button class="increase_qty">+</button>
                </div>
                <h2 class="quantity_price">${cart_object.price}</h2>
            </div>
                <span class="remove_item" style=" color: red; font-size: x-large;
                font-weight: 900; filter: drop-shadow(2px 2px 6px rgba(22,34,12,0.5));
                position: relative; right: 39px; top: 20px; height: fit-content;
                cursor: pointer; border: 2px solid red; border-radius: 50%;
                padding: 1rem;">X</span>
            </div>`;
};
        
createListCartElement(cart_storage);

createCartItem();
    
//QUANTITY BUTTON FUNCTION
    
function increaseQuantity(){
    const container = document.querySelector(".cart-container");
       
    container.addEventListener('click',event =>{
        const element = event.target;
        if(element.classList.contains("increase_qty")){
            const increase_btn = element;
            updateCartPriceQuantity(increase_btn,'increase')
        }else if(element.classList.contains("reduce_qty")){
            const reduce_btn = element;
            updateCartPriceQuantity(reduce_btn,'decrease')
        }
    })        
}

function updateCartPriceQuantity(button,btn_type){
    const current_price_element = button.parentElement.nextElementSibling;
    const product_details_div = current_price_element.parentElement.previousElementSibling;
    const reference_price = Number(product_details_div.querySelector('.price').innerText.replace("$",""));

    if(btn_type == 'increase'){
        const qty_element = button.previousElementSibling;
        let qty = Number(qty_element.innerText)
        qty += 1;
        qty_element.innerText = qty;
        current_price_element.innerText = `$${(qty * reference_price).toPrecision(3)}`;
    }else if(btn_type == 'decrease'){
        const qty_element = button.nextElementSibling;
        let qty = Number(qty_element.innerText)
        if(qty > 1){
            qty -= 1;
            qty_element.innerText = qty;
            current_price_element.innerText = `$${(qty * reference_price).toPrecision(3)}`;
        }
    }
    updateCartTotal();
}

increaseQuantity();

function updateCartTotal(){
    const nodelist_price = document.querySelectorAll(".quantity_price");

    let prices = Array.from(nodelist_price);
    const total_amount = prices.reduce((sum, current) => {
        let amount = Number(current.innerText.replace("$",""));
        sum = amount + sum ;
        return sum;
    }, 0);

    console.log(total_amount);
    total_sum = document.querySelector(".total_amount");
    total_sum.innerHTML = `$${(total_amount).toPrecision(4)}`;
    sessionStorage.setItem('amount',JSON.stringify(total_sum.innerHTML));
}
    

