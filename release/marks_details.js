function countAverage() {
	const marks = new Array(rows.length);
	let ii = 0;
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == marksColumnNumber) {
			if (ii == rows.length - 1) {
				marks[ii] = document.querySelector("#simulationMark").value;
				break;
			}
			else {
				marks[ii] = cells[i].innerHTML.trim();
				ii++;
			}
		}
	}
	const weights = new Array(rows.length);
	ii = 0;
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == weightsColumnNumber) {
			if (ii == rows.length - 1) {
				weights[ii] = document.querySelector("#simulationWeight").value;
				break;
			}
			else {
				weights[ii] = cells[i].innerHTML.trim();
				ii++;
			}
		}
	}
	const ifCounteds = new Array(rows.length);
	ii = 0;
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == ifCountedsColumnNumber) {
			if (ii == rows.length - 1) {
				ifCounteds[ii] = document.querySelector("#simulationIfCounted").value;
				break;
			}
			else {
				ifCounteds[ii] = cells[i].innerHTML.trim();
				ii++;
			}
		}
	}

	let countedAmount = 0;

	for (let i = 0; i < rows.length; i++) {
		if (ifCounteds[i] == "Tak")
			countedAmount++;
	}

	const multipliedMarks = new Array(countedAmount);

	ii = 0;
	for (let i = 0; i < rows.length; i++) {
		if (ifCounteds[i] == "Tak") {
			multipliedMarks[ii] = marks[i] * weights[i];
			ii++;
		}
	}

	let multipliedMarksAdded = 0;
	for (let i = 0; i < countedAmount; i++) {
		multipliedMarksAdded = multipliedMarksAdded + multipliedMarks[i];
	}

	let addedWeights = 0;
	for (let i = 0; i < rows.length; i++) {
		if (ifCounteds[i] == "Tak") {
			addedWeights = addedWeights + parseFloat(weights[i], 10);
		}
	}

	const average = multipliedMarksAdded / addedWeights;

	const averageRounded = Math.round(average * 100) / 100;

	document.querySelector("#gridTopBarFiller").style = "text-align: center;";
	document.querySelector("#gridTopBarFiller").innerHTML = "Średnia: <strong>" + averageRounded + "</strong>";
}

function simulationRowInsert() {
	const simulationRow = table.insertRow(rows.length + 1);
	simulationRow.className = "dataRow";
	for (let i = 0; i < columnsAmount; i++) {
		const newCell = simulationRow.insertCell(i);
		newCell.className = "listing";
		if (i == marksColumnNumber) {
			newCell.id = "simulationCellMark";
			newCell.innerHTML = '<input type="text" id="simulationMark" size="4" placeholder="Wartość symulowanej oceny" />';
		}
		else if (i == weightsColumnNumber) {
			newCell.id = "simulationCellWeight";
			newCell.innerHTML = '<input type="text" id="simulationWeight" size="4" placeholder="Waga symulowanej oceny" />';
		}
		else if (i == ifCountedsColumnNumber) {
			newCell.id = "simulationCellIfCounted";
			newCell.innerHTML = "<select id=\"simulationIfCounted\"><option value=\"Tak\">Tak</option><option value=\"Nie\" selected>Nie</option></select>";
		}
		else if (i == dateColumnNumber) {
			newCell.id = "simulationCellDate";
			newCell.style = "text-align:center;"
			newCell.innerHTML = '<button type="button" id="countAverageButton">Policz średnią</button>';
			document.querySelector("#countAverageButton").addEventListener("click", countAverage, false);
		}
		else if (i == authorColumnNumber) {
			newCell.id = "simulationCellAuthor";
			newCell.innerHTML = userName;
		}
	}
}

function getUserName() {
	let user = "";
	const userinfoDiv = document.querySelector("#userinfo").innerHTML;
	let i = 20;
	while (userinfoDiv[i] != "<") {
		user += userinfoDiv[i];
		i++;
	}
	return user.slice(0, -1);
}

// start

const userName = getUserName();

const table = document.querySelector("#gridTable");
const headings = document.querySelectorAll(".colsSortLab");

let rows = document.querySelectorAll(".dataRow");
let cells = document.querySelectorAll(".listing");
let columnsAmount = cells.length / rows.length;

let marksColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Wartość") marksColumnNumber = i;
}

let weightsColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Waga") weightsColumnNumber = i;
}

let ifCountedsColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Czy liczona do średniej") ifCountedsColumnNumber = i;
}

let dateColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Data wystawienia") dateColumnNumber = i;
}

let authorColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Osoba wystawiająca") authorColumnNumber = i;
}

simulationRowInsert();

rows = document.querySelectorAll(".dataRow");
cells = document.querySelectorAll(".listing");
columnsAmount = cells.length / rows.length;

if (marksColumnNumber == undefined || weightsColumnNumber == undefined || ifCountedsColumnNumber == undefined || dateColumnNumber == undefined || authorColumnNumber == undefined) {
	alert('Do prawidłowego działania wtyczki należy ustawić schemat, w którym widoczne są pola "Wartość", "Waga", "Czy liczona do średniej", "Data wystawienia" i "Osoba wystawiająca".');
}
else {
	countAverage();
}