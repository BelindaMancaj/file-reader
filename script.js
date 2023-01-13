let text, textArray;
var fileToBeUploaded = document.querySelector("#file");
let displayDiv = document.querySelector(".display");
let loadingDiv = document.querySelector(".loading");
let dataTable = document.querySelector("#data-table");
let searchBox = document.querySelector("#search-box");

async function loadFile(file) {
  loadingDiv.style.display = "block";

  text = await file.text(); //Get file data

  loadingDiv.style.display = "none";
  displayDiv.style.display = "block";
  //Creating an array with substrings separated by white spaces
  //removing the first element, which is the columns name
  textArray = text.substring(0, 5005).split(/\r?\n/).slice(1);
  let table = createTable(textArray);
  dataTable.appendChild(table); //Display the created table
}

const createTable = (fileTextArray) => {
  let table = document.createElement("table"),
    tr,
    i;
  table.style.border = "1px solid black";

  for (i = 0; i < fileTextArray.length; i++) {
    //Creatig a table row for every array element
    tr = document.createElement("tr");
    tr.style.border = "1px solid black";

    let lineArray = fileTextArray[i].split(","); //creatig an array with every word
    //iterating the array to display its data in the table
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

const filterData = (txtArr) => {
  let val = searchBox.value.toLowerCase();
  //filter
  const filteredValues = txtArr.filter((txt) =>
    txt.toLowerCase().includes(val)
  );
  //Removes the child so that only the filtered table is displayed
  dataTable.removeChild(dataTable.lastChild);

  if (filteredValues.length <= 0) {
    dataTable.innerHTML = "No data!";
  } else {
    let filteredTable = createTable(filteredValues);
    dataTable.appendChild(filteredTable);
  }
};

searchBox.addEventListener("change", () => filterData(textArray));
