"use strict"


const getHeader = (title) => {
	const header = createDiv();
	header.classList.add('navbar')
	header.classList.add('bg-theme')
	const titleComp = document.createElement('div')
	titleComp.classList.add('h4')
	titleComp.innerText = title
	header.appendChild(titleComp)
	/* TODO: Get user's name and display it along with a log out button */
	return header
}

const createDiv = () => {
	return document.createElement('div')
}
if ((!sessionStorage.getItem('token')) && (window.location.pathname.indexOf('index.html') === -1)) {
	const pathSplit = window.location.pathname.split('/')
	const newPath = pathSplit.slice(0, pathSplit.length - 1).join('/') + '/index.html'
	window.location.replace(newPath)
}

const getXHR = () => {
	let XHR
	if (window.XMLHttpRequest) {
		XHR = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		XHR = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return XHR
}