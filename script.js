let text, textArray;
var fileToBeUploaded = document.getElementById("file");
let displayDiv = document.querySelector(".display");
let loadingDiv = document.querySelector(".loading");
let dataTable = document.getElementById("data-table");
let searchBox = document.getElementById("search-box");

async function loadFile(file) {
  loadingDiv.style.display = "block";
  text = await file.text();
  loadingDiv.style.display = "none";
  displayDiv.style.display = "block";

  textArray = text.substring(0, 5005).split(/\r?\n/);

  const table = createTable(textArray);

  dataTable.appendChild(table);
}

const createTable = (fileTextArray) => {
  let table = document.createElement("table"),
    tr,
    i;
  table.style.border = "1px solid black";

  for (i = 1; i < fileTextArray.length; i++) {
    tr = document.createElement("tr");
    tr.style.border = "1px solid black";

    let lineArray = fileTextArray[i].split(",");
    for (j = 0; j < lineArray.length; j++) {
      tr.innerHTML = `
    <td>${lineArray[0]} ${lineArray[1]}</td>|
    <td>${lineArray[2]}, ${lineArray[3]}, ${lineArray[4]}</td>|
    <td>${lineArray[5]}</td>|
    <td>${lineArray[6]}</td>
    `;
    }
    table.appendChild(tr);
  }
  return table;
};

const filterData = () => {
  let val = searchBox.value;
  console.log(textArray.filter((txt) => txt == "Ruth"));
  // return textArray.filter((txt) => txt == val);
};

searchBox.addEventListener("change", filterData);
