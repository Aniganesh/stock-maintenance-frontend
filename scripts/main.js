const token = sessionStorage.getItem('access-token')

const getHeader = (title) => {
	const header = createDiv();
	header.classList.add('navbar')
	header.classList.add('theme-primary-bg')
	const titleComp = document.createElement('div')
	titleComp.classList.add('h4')
	titleComp.innerText = title
	header.appendChild(titleComp)
	return header
}

const createDiv = () => {
	return document.createElement('div')
}