function translate(mark) {
	switch (mark) {
		case 6:
		case "6":
		case "celujący":
			return 6;
		case 5:
		case "5":
		case "bardzo dobry":
			return 5;
		case 4:
		case "4":
		case "dobry":
			return 4;
		case 3:
		case "3":
		case "dostateczny":
			return 3;
		case 2:
		case "2":
		case "dopuszczający":
			return 2;
		case 1:
		case "1":
		case "niedostateczny":
			return 1;
		default:
			return NaN;
	}
}

function simulationInputsInsert() {
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == marksPredictedISemesterEndColumnNumber) {
			if (cells[i].innerHTML.trim() === "") {
				cells[i].classList.add("simulationCell");
				cells[i].innerHTML = '<input type="text" class="simulationInputPredictedISemesterEnd" size="10" />'
			}
		}
		else if (i % columnsAmount == marksISemesterEndColumnNumber) {
			if (cells[i].innerHTML.trim() === "") {
				cells[i].classList.add("simulationCell");
				cells[i].innerHTML = '<input type="text" class="simulationInputISemesterEnd" size="10" />'
			}
		}
		else if (i % columnsAmount == marksPredictedIISemesterEndColumnNumber) {
			if (cells[i].innerHTML.trim() === "") {
				cells[i].classList.add("simulationCell");
				cells[i].innerHTML = '<input type="text" class="simulationInputPredictedIISemesterEnd" size="10" />'
			}
		}
		else if (i % columnsAmount == marksYearEndColumnNumber) {
			if (cells[i].innerHTML.trim() === "") {
				cells[i].classList.add("simulationCell");
				cells[i].innerHTML = '<input type="text" class="simulationInputYearEnd" size="10" />'
			}
		}
	}
}

function averageRowInsert() {
	const averageRow = table.insertRow(rows.length + 1);
	averageRow.className = "dataRow";
	for (let i = 0; i < columnsAmount; i++) {
		const newCell = averageRow.insertCell(i);
		newCell.className = "listing";
		if (i == classTypeColumnNumber) {
			newCell.id = "averageCellClassType";
			newCell.innerHTML = '<strong>Średnia</strong>';
		}
		else if (i == marksNoSemesterColumnNumber) {
			newCell.id = "averageCellMarksNoSemester";
			newCell.style = "text-align:center;"
			newCell.innerHTML = '<button type="button" id="countAverageButton">Policz średnią</button>';
			document.querySelector("#countAverageButton").addEventListener("click", countAverage, false);
		}
		else if (i == marksPredictedISemesterEndColumnNumber) {
			newCell.id = "averageCellMarksPredictedISemesterEnd";
			newCell.innerHTML = '_placeholder_';
		}
		else if (i == marksISemesterEndColumnNumber) {
			newCell.id = "averageCellMarksISemesterEnd";
			newCell.innerHTML = '_placeholder_';
		}
		else if (i == marksPredictedIISemesterEndColumnNumber) {
			newCell.id = "averageCellMarksPredictedIISemesterEnd";
			newCell.innerHTML = '_placeholder_';
		}
		else if (i == marksYearEndColumnNumber) {
			newCell.id = "averageCellMarksYearEnd";
			newCell.innerHTML = '_placeholder_';
		}
	}
}

function countAverage() {
	const marksPredictedISemesterEnd = new Array(rows.length);
	const marksISemesterEnd = new Array(rows.length);
	const marksPredictedIISemesterEnd = new Array(rows.length);
	const marksYearEnd = new Array(rows.length);
	let ii = 0;
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == marksPredictedISemesterEndColumnNumber) {
			if (cells[i].innerText !== '') {
				marksPredictedISemesterEnd[ii] = translate(cells[i].innerText);
				ii++;
			}
		}
	}
	const simulatedMarksPredictedISemesterEndInputs = document.querySelectorAll(".simulationInputPredictedISemesterEnd");
	for (let i = 0; i < simulatedMarksPredictedISemesterEndInputs.length; i++) {
		if (simulatedMarksPredictedISemesterEndInputs[i].value !== "") {
			marksPredictedISemesterEnd[ii] = translate(simulatedMarksPredictedISemesterEndInputs[i].value);
			ii++;
		}
	}
	const marksPredictedISemesterEndAmount = ii;
	ii = 0;
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == marksISemesterEndColumnNumber) {
			if (cells[i].innerText !== '') {
				marksISemesterEnd[ii] = translate(cells[i].innerText);
				ii++;
			}
		}
	}
	const simulatedMarksISemesterEndInputs = document.querySelectorAll(".simulationInputISemesterEnd");
	for (let i = 0; i < simulatedMarksISemesterEndInputs.length; i++) {
		if (simulatedMarksISemesterEndInputs[i].value !== "") {
			marksISemesterEnd[ii] = translate(simulatedMarksISemesterEndInputs[i].value);
			ii++;
		}
	}
	const marksISemesterEndAmount = ii;
	ii = 0;
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == marksPredictedIISemesterEndColumnNumber) {
			if (cells[i].innerText !== '') {
				marksPredictedIISemesterEnd[ii] = translate(cells[i].innerText);
				ii++;
			}
		}
	}
	const simulatedMarksPredictedIISemesterEndInputs = document.querySelectorAll(".simulationInputPredictedIISemesterEnd");
	for (let i = 0; i < simulatedMarksPredictedIISemesterEndInputs.length; i++) {
		if (simulatedMarksPredictedIISemesterEndInputs[i].value !== "") {
			marksPredictedIISemesterEnd[ii] = translate(simulatedMarksPredictedIISemesterEndInputs[i].value);
			ii++;
		}
	}
	const marksPredictedIISemesterEndAmount = ii;
	ii = 0;
	for (let i = 0; i < cells.length; i++) {
		if (i % columnsAmount == marksYearEndColumnNumber) {
			if (cells[i].innerText !== '') {
				marksYearEnd[ii] = translate(cells[i].innerText);
				ii++;
			}
		}
	}
	const simulatedMarksYearEndInputs = document.querySelectorAll(".simulationInputYearEnd");
	for (let i = 0; i < simulatedMarksYearEndInputs.length; i++) {
		if (simulatedMarksYearEndInputs[i].value !== "") {
			marksYearEnd[ii] = translate(simulatedMarksYearEndInputs[i].value);
			ii++;
		}
	}
	const marksYearEndAmount = ii;

	let marksPredictedISemesterEndSum = 0;
	for (let i = 0; i < marksPredictedISemesterEndAmount; i++) {
		marksPredictedISemesterEndSum += marksPredictedISemesterEnd[i];
	}
	let marksISemesterEndSum = 0;
	for (let i = 0; i < marksISemesterEndAmount; i++) {
		marksISemesterEndSum += marksISemesterEnd[i];
	}
	let marksPredictedIISemesterEndSum = 0;
	for (let i = 0; i < marksPredictedIISemesterEndAmount; i++) {
		marksPredictedIISemesterEndSum += marksPredictedIISemesterEnd[i];
	}
	let marksYearEndSum = 0;
	for (let i = 0; i < marksYearEndAmount; i++) {
		marksYearEndSum += marksYearEnd[i];
	}

	const averagePredictedISemesterEnd = Math.round(marksPredictedISemesterEndSum / marksPredictedISemesterEndAmount * 1000) / 1000;
	const averageISemesterEnd = Math.round(marksISemesterEndSum / marksISemesterEndAmount * 1000) / 1000;
	const averagePredictedIISemesterEnd = Math.round(marksPredictedIISemesterEndSum / marksPredictedIISemesterEndAmount * 1000) / 1000;
	const averageYearEnd = Math.round(marksYearEndSum / marksYearEndAmount * 1000) / 1000;

	averagePredictedISemesterEnd
		? document.querySelector("#averageCellMarksPredictedISemesterEnd").innerHTML = averagePredictedISemesterEnd
		: document.querySelector("#averageCellMarksPredictedISemesterEnd").innerHTML = "Brak ocen";
	averageISemesterEnd
		? document.querySelector("#averageCellMarksISemesterEnd").innerHTML = averageISemesterEnd
		: document.querySelector("#averageCellMarksISemesterEnd").innerHTML = "Brak ocen";
	averagePredictedIISemesterEnd
		? document.querySelector("#averageCellMarksPredictedIISemesterEnd").innerHTML = averagePredictedIISemesterEnd
		: document.querySelector("#averageCellMarksPredictedIISemesterEnd").innerHTML = "Brak ocen";
	averageYearEnd
		? document.querySelector("#averageCellMarksYearEnd").innerHTML = averageYearEnd
		: document.querySelector("#averageCellMarksYearEnd").innerHTML = "Brak ocen";
}

// start

const table = document.querySelector("#gridTable");
const headings = document.querySelectorAll(".colsSortLab");

let rows = document.querySelectorAll(".dataRow");
let cells = document.querySelectorAll(".listing");
let columnsAmount = cells.length / rows.length;

let classTypeColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Zajęcia") classTypeColumnNumber = i;
}

let marksNoSemesterColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Oceny cząstkowe bez okresu") marksNoSemesterColumnNumber = i;
}

let marksPredictedISemesterEndColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Oceny przewidywane okres I") marksPredictedISemesterEndColumnNumber = i;
}

let marksISemesterEndColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Oceny okresowe") marksISemesterEndColumnNumber = i;
}

let marksPredictedIISemesterEndColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Oceny przewidywane okres II") marksPredictedIISemesterEndColumnNumber = i;
}

let marksYearEndColumnNumber;
for (let i = 0; i < columnsAmount; i++) {
	if (headings[i].innerHTML == "Oceny końcowe") marksYearEndColumnNumber = i;
}

if (classTypeColumnNumber == undefined || marksNoSemesterColumnNumber == undefined || marksPredictedISemesterEndColumnNumber == undefined || marksISemesterEndColumnNumber == undefined || marksPredictedIISemesterEndColumnNumber == undefined || marksYearEndColumnNumber == undefined) {
	alert('Do prawidłowego działania wtyczki należy ustawić schemat, w którym widoczne są pola "Zajęcia", "Oceny cząstkowe bez okresu", "Oceny przewidywane okres I", "Oceny okresowe", "Oceny przewidywane okres II" i "Oceny końcowe".');
}
else {
	simulationInputsInsert();
	averageRowInsert();
	countAverage();
}
