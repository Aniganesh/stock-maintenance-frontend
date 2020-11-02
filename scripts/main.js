"use strict"


const getHeader = (title) => {
	const header = createDiv();
	header.classList.add('navbar')
	header.classList.add('bg-theme')
	const titleComp = document.createElement('div')
	titleComp.classList.add('h4')
	titleComp.innerText = title
	header.appendChild(titleComp)
	return header
}

const createDiv = () => {
	return document.createElement('div')
}
if ((!sessionStorage.getItem('token')) && (window.location.pathname.indexOf('index.html') === -1)) {
	window.location.replace('file:///home/aniruddha/Learning%20progress/IDP/stock-maintenance-frontend/index.html')
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