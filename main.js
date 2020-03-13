let resultBox = "0";

document.querySelectorAll(".calculator button").forEach((button) => {
    button.addEventListener("click", addInputs);
    console.log(button.innerHTML);
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