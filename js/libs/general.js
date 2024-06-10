/**
* Hides all the firts children divs in a div. Does not modify de internal divs of the children.
* @method function libs_general_hideAllDivsInDiv
* @param {str} divName - string with the id of the div that contains all the divs to hide
* @return none
*/
function libs_general_hideAllDivsInDiv(divName) {
	var selector="#" + divName + ">div"//select all divs wich the parent is divname (only the first level)
    var divs= document.querySelectorAll(selector);
	var div;
	var n=divs.length;
	var i;
    for (i = 0; i < n; i++) {
    	div=divs[i];
    	div.style.display = 'none';//hide the div
    }
}

/**
* Hides all the divs in a div, except one
* @method libs_general_hideAllDivsInDivExceptOne
* @param {str} divParentName - string with the id of the div that contains all the divs to hide and the div to show
* @param {str} divName - string with the id of the div in the divParentName to show
* @return none
*/
function libs_general_hideAllDivsInDivExceptOne(divParentName, divName, divName2, divName3) {
	libs_general_hideAllDivsInDiv(divParentName);
	var selector="#" + divName;
	var div= document.querySelector(selector);//selects only one
	div.style.display = 'block';

	if (divName2 !== null && divName2 !== undefined){
		var selector="#" + divName2;
		var div= document.querySelector(selector);
		div.style.display = 'block';
	}

	if (divName3 !== null && divName3 !== undefined){
		var selector="#" + divName3;
		var div= document.querySelector(selector);
		div.style.display = 'block';
	}
}