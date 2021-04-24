// Grabbing DOM elements
let form = document.getElementById('transaction-form');
let balanceAmount = document.getElementById('account-balance');
let transactionLog = document.getElementById('transaction-log');
let resetBtn = document.getElementById('reset-button');

// Setting a starting balance
let balance = 0.00;
let transactionNumber = 0;
let transactionArr = [];

// Changing the form's behavior
form.onsubmit = (e) => {
    // Cases to handle undefined or 0
    let amount = Number(e.target.amount.value);
    if (amount > 0 || amount < 0) {
        let type;
        if (e.target['transaction-type'].value === "1"){
            type = "Deposit";
        } else {
            type = "Withdraw";
        }
    
        let transaction = {
            type: type,
            amount: +e.target.amount.value
        }
        handleTransaction(transaction);
        renderBalance();
        renderTransactionTable()
    }
    // Stops redirect which is the default behavior of a form
    e.preventDefault();
}

resetBtn.onclick = () => {
    balance = 0;
    transactionNumber = 0;
    transactionArr = [];
    renderBalance();
    renderTransactionTable()
}

function handleTransaction(transaction) {
    transactionNumber += 1;

    // Starts building the transaction log entry, has to wait for last value
    let currentTransaction = {
        tID: transactionNumber,
        amount: transaction.amount,
        type: transaction.type,
        preBalance: balance
    };

    // Add or subtract from balance based on t.type
    if (transaction.type === "Deposit") {
        balance += transaction.amount;
    } else {
        balance -= transaction.amount;
    }

    currentTransaction.postBalance = balance;
    transactionArr.push(currentTransaction);
}

function renderBalance() {
    // Changes the text of the element (content and color) using reassignment
    balanceAmount.innerText = `$ ${balance.toFixed(2)}`;
    balanceAmount.style.color = balance >= 0 ? `#9ab278` : `#fe4c58`;
}

function renderTransactionTable() {
    transactionLog.innerHTML = "";

    for (let i = transactionArr.length - 1; i >= 0; i--){
        let row = createTableRow(transactionArr[i]);
        transactionLog.appendChild(row);
    }
}

function createTableRow(entry) {
    let tableRow = document.createElement('tr');
    let tID = document.createElement('th');
    let tType = document.createElement('td');
    let tAmount = document.createElement('td');
    let preBalance = document.createElement('td');
    let postBalance = document.createElement('td'); 
    
    tID.innerText = entry.tID;
    tType.innerText = entry.type;
    tAmount.innerText = `$ ${entry.amount.toFixed(2)}`;
    preBalance.innerText = `$ ${entry.preBalance.toFixed(2)}`;
    postBalance.innerText = `$ ${entry.postBalance.toFixed(2)}`;
    
    tableRow.appendChild(tID);
    tableRow.appendChild(tType);
    tableRow.appendChild(tAmount);
    tableRow.appendChild(preBalance);
    tableRow.appendChild(postBalance);
    
    transactionLog.appendChild(tableRow); 
    
    return tableRow;
}