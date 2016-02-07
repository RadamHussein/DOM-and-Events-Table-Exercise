//table parts class
function TablePart(text, row){
	this.text = text;
	this.row = row;
}

//array of table parts objects
var tableArr = [
	new TablePart("Header 1", 0),
	new TablePart("Header 2", 0),
	new TablePart("Header 3", 0),
	new TablePart("Header 4", 0),
	new TablePart("1, 1", 1),
	new TablePart("2, 1", 1),
	new TablePart("3, 1", 1),
	new TablePart("4, 1", 1),
	new TablePart("1, 2", 2),
	new TablePart("2, 2", 2),
	new TablePart("3, 2", 2),
	new TablePart("4, 2", 2),
	new TablePart("1, 3", 3),
	new TablePart("2, 3", 3),
	new TablePart("3, 3", 3),
	new TablePart("4, 3", 3)
	];

//builds a table from tableParts array
function buildTable(tableArr) {
	//create a new table
	var newTable = document.createElement("table");
	var newThead = document.createElement("thead");

	//add new table to the doc
	document.body.appendChild(newTable);
	newTable.appendChild(newThead);
	var tableBody = document.createElement("tbody");

	//iteratate over elements in array
	for (var i = 0; i < tableArr.length; i++){
		//if .row is 0 it's a header row
		if (tableArr[i].row == 0) {
			var headRow = document.createElement("th");
			headRow.textContent = tableArr[i].text;
			newThead.appendChild(headRow);
			headRow.style.border = "solid 1px";
			headRow.style.padding = "30px";
			headRow.style.textAlign = "center";
		}
		//.row is a cell row
		else {
			//var tableBody = document.createElement("tbody");
			//if .row changes, make a new row
			if (tableArr[i].row != tableArr[i-1].row) {
				newTrow = document.createElement("tr");
				newTable.appendChild(tableBody);
				tableBody.appendChild(newTrow);
				newRow = tableArr[i].row;
			}	
			var cellRow = document.createElement("td");
			cellRow.textContent = tableArr[i].text;
			newTrow.appendChild(cellRow);
			cellRow.style.border = "solid 1px";
			cellRow.style.padding = "30px";
			cellRow.style.textAlign = "center";
		}
	}
	return newTable;
}

//build the table
var table = buildTable(tableArr);

//apply table styling
table.border = "1";
table.style.border = "solid 1px";
table.style.borderCollapse = "collapse";

//create a div to hold buttons
var buttonContainer = document.createElement("div");
document.body.appendChild(buttonContainer);
buttonContainer.style.margin = "10px";

//create and add buttons
var up = document.createElement("button");
up.setAttribute("id", "up");
up.textContent = "UP";
buttonContainer.appendChild(up);

var down = document.createElement("button");
down.setAttribute("id", "down");
down.textContent = "DOWN";
buttonContainer.appendChild(down);

var left = document.createElement("button");
left.setAttribute("id", "left");
left.textContent = "LEFT";
buttonContainer.appendChild(left);

var right = document.createElement("button");
right.setAttribute("id", "right");
right.textContent = "RIGHT";
buttonContainer.appendChild(right);

var mark = document.createElement("button");
mark.setAttribute("id", "mark");
mark.textContent = "Mark Cell";
buttonContainer.appendChild(mark);

//function to change and mark cells
function changeCell(input) {
	if (input == "up") {
		var upNode = cellSelect.parentNode;
		upNode = upNode.previousElementSibling;

		//check for a sibling of current tr element
		if (upNode != null) {
			var cellsToTheRight = getTableLocation(cellSelect);
			cellSelect.style.border = "solid 1px";
			cellSelect = upNode;
			cellSelect = cellSelect.firstElementChild;

				for (var i = 0; i < (3 - cellsToTheRight); i++) {
					cellSelect = cellSelect.nextElementSibling;
				}

			cellSelect.style.border = "solid 3px";
		}
	}
	else if (input == "down") {
		var downNode = cellSelect.parentNode;
		downNode = downNode.nextElementSibling;

		//check for a sibling of current tr element
		if (downNode != null) {
			var cellsToTheRight = getTableLocation(cellSelect);
			cellSelect.style.border = "solid 1px";
			cellSelect = downNode;
			cellSelect = cellSelect.firstElementChild;

				for (var i = 0; i < (3 - cellsToTheRight); i++) {
					cellSelect = cellSelect.nextElementSibling;
				}

			cellSelect.style.border = "solid 3px";
		}
	}
	else if (input == "left") {
		//check for a left sibling
		if (cellSelect.previousElementSibling != null) {
			cellSelect.style.border = "solid 1px";
			cellSelect = cellSelect.previousElementSibling;
			cellSelect.style.border = "solid 3px";
		}
	}
	else if (input == "right") {
		//check for a right sibling
		if (cellSelect.nextElementSibling != null) {
			cellSelect.style.border = "solid 1px";
			cellSelect = cellSelect.nextElementSibling;
			cellSelect.style.border = "solid 3px";
		}
	}
	else {
		cellSelect.style.background = "yellow";
	}
}

/*helper function to find out how many cells are
to the right of the current cell*/
function getTableLocation(currentCell) {
	var loopControl = true;
	var  count = 0;
	var nextNode = currentCell;
	while (loopControl == true) {
		nextNode = nextNode.nextElementSibling;
		if (nextNode == null) {
			loopControl = false;
		}
		else {
			currentCell = nextNode;
			count++;
		}
	}
	return count;
}

//add event listeners to buttons
document.getElementById("up").addEventListener("click", function() {changeCell("up"); });
document.getElementById("down").addEventListener("click", function() {changeCell("down"); });
document.getElementById("left").addEventListener("click", function() {changeCell("left"); });
document.getElementById("right").addEventListener("click", function() {changeCell("right"); });
document.getElementById("mark").addEventListener("click", function() {changeCell("mark"); });

//select starting cell
var cellSelect = document.body.getElementsByTagName("table");
cellSelect = cellSelect[0];
cellSelect = cellSelect.lastElementChild;
cellSelect = cellSelect.firstElementChild;
cellSelect = cellSelect.firstElementChild;
console.log("cellSelect is set to " + cellSelect);
cellSelect.style.border = "solid 3px";




