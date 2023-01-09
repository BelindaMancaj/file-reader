async function loadFile(file) {
  let text = await file.text();
  let dataTable = document.getElementById("data-table");
  dataTable.innerHTML = text.substring(0, 2000);
  // console.log(text);
}

/**
 * if(text){
 * dom shto loadig
 * else shfaq te dhenat
 * }
 */
