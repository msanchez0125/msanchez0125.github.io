

let calcContainerEle = document.querySelector('#calculator-container')
calcContainerEle.addEventListener('click', e => onButtonClick(e))

let resultEle = document.querySelector('#result')

let curOperation, curNumber1, curNumber2


function onButtonClick (e) {
    let btnClickedValue = e.target.innerHTML
    if (Number.isInteger(parseInt(btnClickedValue))) {
        doNumber(btnClickedValue)
        debug()
        return
    }

switch (btnClickedValue) {
    case 'AC':
      reset()
      break
    case '+/-':
      makePosNeg()
      break
    case '/':
      doOperation('/')
      break
    case 'x':
      doOperation('x')
      break
    case '-':
      doOperation('-')
      break
    case '+':
      doOperation('+')
      break
    case '.':
      makeDecimal()
      break
    case '=':
      doEqual()
      break
    default:
      break
  
  }
  debug()
}


function doNumber (num) {
    let newNum
    if(curOperation) {
        curNumber2 = curNumber2 ? `${curNumber2}${num}` : num
        newNum = curNumber2
    } else {
        curNumber1 = curNumber1 ? `${curNumber1}${num}` : num
        newNum = curNumber1
    }
    resultEle.innerHTML = newNum
}

function doOperation (operation) {

   if (curNumber2) {
        let result = compute(curNumber1,curNumber2,curOperation)
        curNumber1 = result
        curNumber2 = 0
        resultEle.innerHTML = result
    } 
    curOperation = operation
}

function compute (num1,num2,op) {
    let n1= Number(num1)
    let n2= Number(num2)
    let result
    if (op === '+') {
        result = n1 + n2
      } else if (op === '-') {
        result = n1 - n2
      } else if (op === '/') {
        result = n1 / n2
      } else {
        // must be multiply
        result = n1 * n2
      }
    return result
}




function reset () {
    curNumber1 = 0
    curNumber2 = 0
    curOperation = 0
    resultEle.innerHTML = 0
}

function makePosNeg () {
    if (curNumber1 || curNumber2) {
        let newNumber
        if (curNumber2) {
            newNumber = curNumber2 * -1
            curNumber2 = newNumber
        } else {
            newNumber = curNumber1 * -1
            curNumber1 = newNumber
        }
        resultEle.innerHTML = newNumber
    }
}

function makeDecimal (){
    if(curOperation) {
        let nStr = curNumber2 !== undefined ? curNumber2.toString() : '0'
        if(!nStr.includes('.')){
            nStr= `${nStr}.`
        }
        resultEle.innerHTML = nStr
        curNumber2 = nStr
    } else {
        let nStr = curNumber1 !== undefined ? curNumber1.toString() : '0'
        if(!nStr.includes('.')){
            nStr= `${nStr}.`
        }
        resultEle.innerHTML = nStr
        curNumber1 = nStr 
    }
}

function debug () {
    document.querySelector('#curNumber1').innerHTML = curNumber1
    document.querySelector('#curNumber2').innerHTML = curNumber2
    document.querySelector('#curOperation').innerHTML = curOperation
}

function doEqual (){
    if (curNumber1 && curNumber2 && curOperation) {
        let result = compute(curNumber1, curNumber2, curOperation)
        resultEle.innerHTML = result
    }
}


