 
const balance_element = document.querySelector("#balance")
const income_balance_element = document.querySelector("#money-plus")
const expenses_balance_element = document.querySelector("#money-minus")
let transaction_ul_element = document.querySelector("#transactions-list")
let filter_ul_element = document.querySelector('#filter-by')

const main_form = document.querySelector("#budget-form")



let transactions = localStorage.getItem('budget-transaction') === null ? [] : JSON.parse(localStorage.getItem('budget-transaction'))

//event listener for submitting form content 
main_form.addEventListener('submit', budgetSubmission);

function budgetSubmission(event){
    event.preventDefault();
    const form_data = new FormData(main_form);

    appendDataToTransactions(form_data);
    storeItemToDB(transactions);
    loopThroughTransactionsForUlElement()
    calculationAndInsertingToDOM(transactions)

    main_form.reset()
}

function storeItemToDB(transactions){
    localStorage.setItem('budget-transaction', JSON.stringify(transactions))
}

function setNewId(){
    return new Date().getTime();
}

// adding form data to transaction
function appendDataToTransactions(form_data){
    transactions.push(
        {
            "id" : setNewId(),
            "type" : form_data.get('budget-type'),
            "name" : form_data.get("budget-name"),
            "amount" : form_data.get("budget-amount"),
            "date" : form_data.get("budget-date")
        }
    ) 
}

const calculationAndInsertingToDOM = transactions =>{

    const mapped_transactions = transactions.map(item =>{
        return {  
            "_id" : item['id'],
            "_type" : item['type'],
            "_amount" : Number(item['amount']),
            "_name" : item['name']
        }
    })

    let balance_summary = 0;
    let income_summary = 0; 
    let expenses_summary = 0;

    mapped_transactions.forEach(item =>{
        
        if(item['_type'] === 'income'){
            balance_summary += item["_amount"]
            income_summary += item["_amount"]
        }else{
            balance_summary -= item["_amount"]
            expenses_summary += item["_amount"]
        }
    })


    balance_element.innerText = `NGN${formatNumber(balance_summary)}`
    income_balance_element.innerText = `NGN${formatNumber(income_summary)}`
    expenses_balance_element.innerText = `NGN${formatNumber(expenses_summary)}`
}

function addTransactionDOM(transactions) {
    // Distinguish transaction as either expense or income 
    const sign = transactions.type ===  "income" ? '+' : '-' ;

    /* Recall: a list item in Transaction history follows the format:
        <li class="plus"> Cash <span>+$700</span><button class="delete-btn">X<buttion></li> 
    */
   
    // create a list item
    const li = document.createElement('li');

    // Add class based on element
    li.classList.add(transactions.type === "income" ? 'plus' : 'minus');


    // Create the HTmL to list item 
    // Negative number has a minus sign, so wrap it with Math.abs to get only the magnitude 
    li.innerHTML = `
    ${transactions.name} <span>${sign}${formatNumber(transactions.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transactions.id})"X</button></li>`;


    // Add the list item to the DOM a list's child mode
   document.querySelector(`#transactions-list`).appendChild(li);
}
filter_ul_element.addEventListener("change", (event) =>{
    const selection = event.target.value;
    const filtered_transactions = filterTransactionType(selection);

    transaction_ul_element.innerHTML ="";
    filtered_transactions.forEach((transaction) =>{
        addTransactionDOM(transaction);
    });

    calculationAndInsertingToDOM(filtered_transactions);
});

function loopThroughTransactionsForUlElement(){
    transaction_ul_element.innerHTML = ""
    transactions.forEach(transaction =>{
        addTransactionDOM(transaction)
    })
}

const removeTransaction = (id) =>{
    transactions = transactions.filter(item => item.id != id)

    // update local storage
    storeItemToDB(transactions)

    // update html frontend s
    loopThroughTransactionsForUlElement()
    calculationAndInsertingToDOM(transactions)
}

function formatNumber(number){
    const formatter = Intl.NumberFormat('en-NG')
    return formatter.format(number)
}

calculationAndInsertingToDOM(transactions)
loopThroughTransactionsForUlElement()

 
function filterTransactionType(type){
    if (type === "all") {
        return transactions;
    }
    transactionFilter = transactions.filter(item => item.type === type)
    return transactionFilter
}

function transactionAmount(amount, operator = "=="){

    if (operator === '>'){
        transactionExpenses = transactions.filter(item => item.amount > amount)
        return transactionExpenses
    }else if (operator === '<'){
        transactionExpenses = transactions.filter(item => item.amount < amount)
        return transactionExpenses
    }else{
        transactionExpenses = transactions.filter(item => item.amount == amount)
        return transactionExpenses
    }
}

function transactionYear(year){
    return transactions.filter(item => {
        const date = new Date(item['date']);
        if(date.getFullYear() == year){
            return item
        }
    })
}

loopThroughTransactionsForUlElement();
calculationAndInsertingToDOM(transactions);




