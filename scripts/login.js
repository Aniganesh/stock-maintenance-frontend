"use strict"

const passwordHideToggle = (event) => {
	const pwField = document.querySelector('#password')
	if (pwField.type === 'password') {
		pwField.type = 'text'
		event.target.innerText = 'Hide password'
	} else {
		pwField.type = 'password'
		event.target.innerText = 'Show password'
	}

}

const pwHideToggleButton = document.querySelector('#pwHideToggle')
pwHideToggleButton.addEventListener('click', passwordHideToggle)
const style = document.createElement('style')
style.innerText = `
#pwHideToggle{
	cursor: pointer;
}`
document.querySelector('head').appendChild(style)


const login = (event) => {
	event.preventDefault()
	const username = event.target.username.value
	const password = event.target.password.value
	const XHR = getXHR()
	// const requestSuccess = await 
	console.log({ username, password })
	if (username.toLowerCase() === 'admin' && password === 'stock12345') {
		sessionStorage.setItem('token', Math.random())
		window.location.href = "file:///home/aniruddha/Learning%20progress/IDP/stock-maintenance-frontend/dashboard.html";
	}
}

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', login)
