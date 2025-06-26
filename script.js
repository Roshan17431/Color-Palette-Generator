const rangeInput = document.getElementById("colorCount");
const countLabel = document.getElementById("countLabel");

rangeInput.addEventListener("input",()=>{
    countLabel.textContent = rangeInput.value;
});