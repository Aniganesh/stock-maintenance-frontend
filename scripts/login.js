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
		const pathSplit = window.location.pathname.split('/')
		const newPath = pathSplit.slice(0, pathSplit.length - 1).join('/') + '/dashboard.html'
		window.location.href = newPath;
	}
}

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', login)
