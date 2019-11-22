// ==UserScript==
// @name     e-Dziennik Gdynia plus
// @version  1.2.1
// @author Jakub Daszkiewicz
// @description Skrypt zwiększający funkcjonalność gdyńskiego e-Dziennika.
// @homepageURL https://jakubdaszkiewicz.github.io/edziennik-gdynia-plus/
// @downloadURL https://jakubdaszkiewicz.github.io/edziennik-gdynia-plus/download/e_dziennik_gdynia_plus-newest.user.js
// @updateURL https://jakubdaszkiewicz.github.io/edziennik-gdynia-plus/download/e_dziennik_gdynia_plus.meta.js
// @icon https://jakubdaszkiewicz.github.io/edziennik-gdynia-plus/img/icon.svg
// @grant    none
// @include https://nasze.miasto.gdynia.pl/ed_miej/zest_ed_oceny_ucznia_szczegoly.pl*
// @run-at document-end
// ==/UserScript==

function countAverage()
{
	let marks = new Array(rows.length);
	let ii = 0;
	for (i=0; i<cells.length; i++)
	{
		if (i%columnsAmount == marksColumnNumber)
		{
			if (ii == rows.length-1)
			{
				marks[ii] = document.getElementById("simulationMark").value;
				break;
			}
			else
			{
				marks[ii] = cells[i].innerHTML.trim();
				ii++;
			}
		}
	}
	let weights = new Array(rows.length);
	ii = 0;
	for (let i=0; i<cells.length; i++)
	{
		if (i%columnsAmount == weightsColumnNumber)
		{
			if (ii == rows.length-1)
			{
				weights[ii] = document.getElementById("simulationWeight").value;
				break;
			}
			else
			{
				weights[ii] = cells[i].innerHTML.trim();
				ii++;
			}
		}
	}
	let ifCounteds = new Array(rows.length);
	ii = 0;
	for (let i=0; i<cells.length; i++)
	{
		if (i%columnsAmount == ifCountedsColumnNumber)
		{
			if (ii == rows.length-1)
			{
				ifCounteds[ii] = document.getElementById("simulationIfCounted").value;
				break;
			}
			else
			{
				ifCounteds[ii] = cells[i].innerHTML.trim();
				ii++;
			}
		}
	}
	
	let countedAmount = 0;
	
	for (let i=0; i<rows.length; i++)
	{
		if (ifCounteds[i] == "Tak")
			countedAmount++;
	}
	
	let multipliedMarks = new Array(countedAmount);
	
	ii = 0;
	for (let i=0; i<rows.length; i++)
	{
		if (ifCounteds[i] == "Tak")
		{
			multipliedMarks[ii] = marks[i] * weights[i];
			ii++;
		}
	}
	
	let multipliedMarksAdded = 0;
	for (let i=0; i<countedAmount; i++)
	{
		multipliedMarksAdded = multipliedMarksAdded + multipliedMarks[i];
	}
	
	let addedWeights = 0;
	for (let i=0; i<rows.length; i++)
	{
		if (ifCounteds[i] == "Tak")
		{
			addedWeights = addedWeights + parseFloat(weights[i], 10);
		}
	}
	
	let average = multipliedMarksAdded / addedWeights;
	
	let averageRounded = Math.round(average*100)/100;
	
	document.getElementById("gridTopBarFiller").style = "text-align: center;";
	document.getElementById("gridTopBarFiller").innerHTML = "Średnia: <strong>"+averageRounded+"</strong>";
}

function simulationRowInsert()
{
	let simulationRow = table.insertRow(rows.length+1);
	simulationRow.className = "dataRow";
	for (let i=0; i<columnsAmount; i++)
	{
		let newCell = simulationRow.insertCell(i);
		newCell.className = "listing";
		if (i == marksColumnNumber)
		{
			newCell.id = "simulationCellMark";
			newCell.innerHTML = '<input type="text" id="simulationMark" size="4" placeholder="Wartość symulowanej oceny" />';
		}
		else if (i == weightsColumnNumber)
		{
			newCell.id = "simulationCellWeight";
			newCell.innerHTML = '<input type="text" id="simulationWeight" size="4" placeholder="Waga symulowanej oceny" />';
		}
		else if (i == ifCountedsColumnNumber)
		{
			newCell.id = "simulationCellIfCounted";
			newCell.innerHTML = "<select id=\"simulationIfCounted\"><option value=\"Tak\">Tak</option><option value=\"Nie\" selected>Nie</option></select>";
		}
		else if (i == dateColumnNumber)
		{
			newCell.id = "simulationCellDate";
			newCell.style = "text-align:center;"
			newCell.innerHTML = '<button type="button" id="countAverageButton">Policz średnią</button>';
			document.getElementById("countAverageButton").addEventListener("click", countAverage, false);
		}
		else if (i == authorColumnNumber)
		{
			newCell.id = "simulationCellAuthor";
			newCell.innerHTML = userName;
		}
	}
}

function getUserName()
{
	let user = "";
	let userinfoDiv = document.getElementById("userinfo").innerHTML;
	let i = 20;
	while (userinfoDiv[i] != "<")
	{
		user += userinfoDiv[i];
		i++;
	}
	return user.slice(0,-1);
}

// start

let userName = getUserName();

let table = document.getElementById("gridTable");
let headings = document.getElementsByClassName("colsSortLab");

let rows = document.getElementsByClassName("dataRow");
let cells = document.getElementsByClassName("listing");
let columnsAmount = cells.length/rows.length;

let marksColumnNumber;
for (let i=0; i<columnsAmount; i++)
{
	if (headings[i].innerHTML == "Wartość") marksColumnNumber = i;
}

let weightsColumnNumber;
for (let i=0; i<columnsAmount; i++)
{
	if (headings[i].innerHTML == "Waga") weightsColumnNumber = i;
}

let ifCountedsColumnNumber;
for (let i=0; i<columnsAmount; i++)
{
	if (headings[i].innerHTML == "Czy liczona do średniej") ifCountedsColumnNumber = i;
}

let dateColumnNumber;
for (let i=0; i<columnsAmount; i++)
{
	if (headings[i].innerHTML == "Data wystawienia") dateColumnNumber = i;
}

let authorColumnNumber;
for (let i=0; i<columnsAmount; i++)
{
	if (headings[i].innerHTML == "Osoba wystawiająca") authorColumnNumber = i;
}

simulationRowInsert();

rows = document.getElementsByClassName("dataRow");
cells = document.getElementsByClassName("listing");
columnsAmount = cells.length/rows.length;

if (marksColumnNumber == undefined || weightsColumnNumber == undefined || ifCountedsColumnNumber == undefined || dateColumnNumber == undefined || authorColumnNumber == undefined)
{
	alert('Do prawidłowego działania wtyczki należy ustawić schemat, w którym widoczne są pola "Wartość", "Waga", "Czy liczona do średniej", "Data wystawienia" i "Osoba wystawiająca".');
}
else
{
	countAverage();
}