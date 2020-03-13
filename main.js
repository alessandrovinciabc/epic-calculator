let resultBox = "0";

document.querySelectorAll(".calculator button").forEach((button) => {
    button.addEventListener("click", addInputs);
    console.log(button.innerHTML);
});

let mousetUpdateInterval;
let mouseX=0;
let mouseY=0;

let calculatorWindow = document.querySelectorAll(".calculator.calculator-draggable")[0];
let calculatorReal = window.getComputedStyle(calculatorWindow);

let container = document.querySelectorAll(".container")[0];

calculatorWindow.addEventListener("mousedown", mouseDownCalculator);
calculatorWindow.addEventListener("mouseup", mouseUpCalculator);

container.addEventListener("mousemove", mouseMoving);
container.addEventListener("mouseup", mouseUpCalculator);
/*Move Calculator*/

let updateCalculatorPosition;
let isMouseDown = false;
function mouseDownCalculator(event){
    isMouseDown = true;
    mouseOffsetX = calculatorWindow.offsetLeft - event.clientX;
    mouseOffsetY = calculatorWindow.offsetTop - event.clientY;
}

function mouseUpCalculator(event){
    isMouseDown = false;
    clearInterval(updateCalculatorPosition);
}

function mouseMoving(event){
    if(isMouseDown){
        newMouseX = event.clientX;
        newMouseY = event.clientY;

        let nextPositionX = newMouseX + mouseOffsetX;
        let nextPositionY = newMouseY + mouseOffsetY;

        let maxWidth = parseInt(window.getComputedStyle(container).width);
        let maxHeight = parseInt(window.getComputedStyle(container).height);

        if(nextPositionX < (maxWidth - parseInt(calculatorReal.width)) && nextPositionX >= 0){
            calculatorWindow.style.left = nextPositionX + "px";
        }

        if(nextPositionY < (maxHeight - parseInt(calculatorReal.height)) && nextPositionY >= 0){
            calculatorWindow.style.top = nextPositionY + "px";
        }
    }
}

/*Reposition calculator when window resizes*/
window.addEventListener("resize", ()=>{
    calculatorWindow.style.left = window.innerWidth/2 - parseInt(calculatorReal.width)/2 + "px";
    calculatorWindow.style.top = window.innerHeight/2 - parseInt(calculatorReal.height)/2 + "px";
});

/*Update result box*/
function updateResultBox(){
    resultBoxElement = document.getElementsByClassName("result-box")[0];

    if(resultBox === "ERROR"){
        resultBox = "0";
        resultBoxElement.value = "ERROR";
        resultBoxElement.classList.add("result-box-error");
    }else{
        resultBoxElement.classList.remove("result-box-error");
        resultBoxElement.value = resultBox;
    }
}

/*Adds new characters to parse to the result box*/
function addInputs(newInput){
    let toAdd = newInput.target.innerHTML;
    if(resultBox == 0){
        switch(toAdd){
            case "+": resultBox="+"; break;
            case "-": resultBox="-"; break;
            case "*": resultBox="ERROR"; break;
            case "/": resultBox="ERROR"; break;
            case "=": break;
            case "C": break;
            default: resultBox=toAdd;
        }
    }else if(toAdd === "="){
        resultBox = math.evaluate(resultBox).toString();
    }else if(toAdd==="C"){
        resultBox = "0";
    }else{
        resultBox+=toAdd;
    }
    updateResultBox();
}