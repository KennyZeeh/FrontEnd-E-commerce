const button = document.getElementById("pay");

button.addEventListener("click", function() {
    displayRecipt()
    getInputValue()
    // printReceipt()
});

function displayRecipt (){
    let formContainer = document.querySelector(".container")
    formContainer.setAttribute('style','display:none;')
    let reciept = document.querySelector('.receipt')
    reciept.setAttribute('style','display:block; font-size: 18px; font-weight: bold; padding: 40px; border: 6px solid red; border-radius: 30px')
}

function getInputValue(){
    f_name = document.querySelector('#firstname')
    r_firstname = document.querySelector('#firstName')
    r_firstname.innerHTML = f_name.value

    o_name = document.querySelector('#Othername')
    r_othername = document.querySelector('#otherName')
    r_othername.innerHTML = o_name.value

    delAddress = document.querySelector('#address')
    r_delAddress = document.querySelector('#d_address')
    r_delAddress.innerHTML = delAddress.value

    r_sumPrice = document.querySelector('#sumPrice')
    r_sumPrice.innerHTML = sessionStorage.getItem("amount")
}

// function printReceipt(){
//     var divToPrint = document.getElementById("divToPrint");
//     var popupWin = window.open("", "_blank", "width=400, height=300");
//     popupWin.document.open();
//     popupWin.document.write(
//         '<html><body style="width: 58mm" onload="window.print()">' + divToPrint.innerHTML + "</html>"
//     );
//     popupWin.document.close();
// }