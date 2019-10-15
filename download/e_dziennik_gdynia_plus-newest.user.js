// ==UserScript==
// @name     e-Dziennik Gdynia plus
// @version  1.1.1
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

var rows = document.getElementsByClassName("dataRow");
var headings = document.getElementsByClassName("colsSortLab");
var cells = document.getElementsByClassName("listing");
var columnsAmount = cells.length/rows.length;

var markNumber;
for(i=0;i<columnsAmount;i++)
{
	if (headings[i].innerHTML == "Wartość") markNumber = i;
}

var weightNumber;
for(i=0;i<columnsAmount;i++)
{
	if (headings[i].innerHTML == "Waga") weightNumber = i;
}

var ifCountedNumber;
for(i=0;i<columnsAmount;i++)
{
	if (headings[i].innerHTML == "Czy liczona do średniej") ifCountedNumber = i;
}

if(markNumber == undefined || weightNumber == undefined || ifCountedNumber == undefined)
{
	alert('Do prawidłowego działania wtyczki należy ustawić schemat, w którym widoczne są pola "Wartość", "Waga" i "Czy liczona do średniej".');
}
else
{
	var marks = new Array(rows.length);
	var ii = 0;
	for(i=0;i<cells.length;i++)
	{
		if (i % columnsAmount == markNumber)
		{
			marks[ii] = cells[i].innerHTML.trim();
			ii++;
		}
	}
	var weights = new Array(rows.length);
	ii = 0;
	for(i=0;i<cells.length;i++)
	{
		if (i % columnsAmount == weightNumber)
		{
			weights[ii] = cells[i].innerHTML.trim();
			ii++;
		}
	}
	var ifCounteds = new Array(rows.length);
	ii = 0;
	for(i=0;i<cells.length;i++)
	{
		if (i % columnsAmount == ifCountedNumber)
		{
			ifCounteds[ii] = cells[i].innerHTML.trim();
			ii++;
		}
	}
	
	var countedAmount = 0;
	
	for(i=0;i<rows.length;i++)
	{
		if (ifCounteds[i] == "Tak")
			countedAmount++;
	}
	
	var multipliedMarks = new Array(countedAmount);
	
	ii = 0;
	for(i=0;i<rows.length;i++)
	{
		if (ifCounteds[i] == "Tak")
		{
			multipliedMarks[ii] = marks[i] * weights[i];
			ii++;
		}
	}
	
	var multipliedMarksAdded = 0;
	for(i=0;i<countedAmount;i++)
	{
		multipliedMarksAdded = multipliedMarksAdded + multipliedMarks[i];
	}
	
	var addedWeights = 0;
	for(i=0;i<rows.length;i++)
	{
		if (ifCounteds[i] == "Tak")
		{
			addedWeights = addedWeights + parseFloat(weights[i], 10);
		}
	}
	
	var average = multipliedMarksAdded / addedWeights;
	
	var averageRounded = Math.round(average*100)/100;
	
	document.getElementById("gridTopBarFiller").style = "text-align: center;";
	document.getElementById("gridTopBarFiller").innerHTML = "Średnia: <strong>"+averageRounded+"</strong>";
}
