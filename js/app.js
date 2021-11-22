let input = document.getElementsByClassName('input')[0];
let from = document.getElementsByClassName('from')[0];
let to = document.getElementsByClassName('to')[0];
let result = document.getElementsByClassName('result')[0];
let calcContainer = document.getElementsByClassName("calculation-container")[0];
let historyList = document.getElementsByClassName('history-list')[0];

for (let data in datas.rates) {
    createOption(from, data, datas.rates[data]);
    createOption(to, data, datas.rates[data]);
}

let headerArr = ['Date', 'From', 'To', 'Result'];
createList(headerArr);

let rowPlaceHolder = document.createElement('tr');
let rowPlaceHoldertd = document.createElement('td');
let rowPlaceHoldertextnode = document.createTextNode("There is no record.");
rowPlaceHoldertd.appendChild(rowPlaceHoldertextnode);
rowPlaceHoldertd.setAttribute('colspan', 4);
rowPlaceHolder.appendChild(rowPlaceHoldertd);
rowPlaceHolder.classList.add('rowPlaceHolder');
historyList.appendChild(rowPlaceHolder)


function createOption(created, data, value){
    let optionTag = document.createElement("option");
    optionTag.setAttribute("value", removeComma(value));
    let text = document.createTextNode(data);
    optionTag.appendChild(text);
    created.appendChild(optionTag);
}

function removeComma (value) {
    return Number(value.replace(",", ""));
}

calcContainer.addEventListener('submit', (event)=>{
    event.preventDefault();
    let rowPlaceHolder = document.getElementsByClassName('rowPlaceHolder')[0];
    if (rowPlaceHolder) {
        rowPlaceHolder.remove();
    }
    let inputVal = input.value;
    let fromVal = from.value;
    let toVal = to.value;
    let val = ((inputVal * fromVal) / toVal).toFixed(2);

    let fromText = fromVal + ' ' + from.options[from.options.selectedIndex].textContent;
    let toText = to.options[to.options.selectedIndex].textContent;
    let valText = val + ' ' + toText;
    result.textContent = val;
    input.value = '';
    input.focus();
    let date = new Date().toLocaleString();
    let dataArr = [date, fromText, toText, valText];
    createList(dataArr);
});

function createList(dataArr){
    let tr = document.createElement('tr');
    dataArr.forEach(el=>{
        let td = document.createElement('td');
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    });
    historyList.appendChild(tr);
}