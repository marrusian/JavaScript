"use strict";
var main, mainWidth = 0, mainHeight = 0;

function initializeDimensions()
{
	main = document.getElementById('gameframe')
	mainWidth = main.offsetWidth;
	mainHeight = main.offsetHeight;
	
	main.addEventListener('mousemove', showCoords);
}

window.addEventListener('load', function(){alert(Date());});
window.addEventListener('load', initializeDimensions);
window.addEventListener('resize', initializeDimensions);
window.addEventListener('load', gameLoop);

function showCoords(event)
{
    var gameFrame = document.getElementById('gameframe');
	var span = document.getElementById('coordBox').getElementsByTagName('span')[0];
	span.innerHTML = "X: " + (event.pageX - gameframe.offsetLeft) +
                   	 ", Y: " + (event.pageY - gameframe.offsetTop);
}

function gameLoop()
{
	var t = Target(getRandomInt(15, 150));
	t.addEventListener('click', function() {removeTarget(t); alert('GOT ME!');});
	t.addEventListener('animationend', function() {removeTarget(t); alert('LOSER!'); });

	randomlyPositionTarget(t);
	main.appendChild(t);

	setTimeout(gameLoop, getRandomInt(1500,3500));
}

function removeTarget(svgElement)
{
	svgElement.parentNode.removeChild(svgElement);
}

function randomlyPositionTarget(svgElement)
{
	if (!(svgElement instanceof Element))
		throw ReferenceError('randomlyPositionTarget(): \"svgElement\" is not an Element');

	var targetHeight = parseInt(window.getComputedStyle(svgElement, null).getPropertyValue('height'));
	var targetWidth = parseInt(window.getComputedStyle(svgElement, null).getPropertyValue('width'));

	svgElement.style.left = Math.floor(Math.random() * (mainWidth - targetWidth)) + "px";
	svgElement.style.top = Math.floor(Math.random() * (mainHeight - targetHeight)) + "px";
}

function getRandomInt(lowerBound, upperBound)
{
	switch (arguments.length) {
		case 1: return Math.floor(Math.random() * lowerBound);
		case 2: return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
		default: throw new Error('getRandomInt(): Invalid number of arguments');
	}
}

function getRandomRGB()
{
	return "rgb(" + getRandomInt(256) + "," + getRandomInt(256) + "," + getRandomInt(256) + ")";
}

var color;
function Target(diameter, gap)
{
	if (typeof(diameter) !== 'number')
		throw TypeError('Target(): typeof(diameter) !== \"number\"');

	var svgTarget = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgTarget.setAttribute('class', 'target');
	svgTarget.style.width = svgTarget.style.height = diameter + "px";
	
	// BLA BLA BLA
	var inputColor = document.getElementById('hex');
	if (inputColor.value.match(/#([0-9]|[A-F]){6}/))
		color = inputColor.value;
	else
		color = undefined;

	var svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	svgCircle.setAttribute('cx', '50%');
	svgCircle.setAttribute('cy', '50%');
	svgCircle.setAttribute('r', diameter / 2);
	svgCircle.setAttribute('stroke', 'black');
	svgCircle.setAttribute('fill', color || getRandomRGB());
	
	svgTarget.appendChild(svgCircle);
	
	return svgTarget;
}
