const dashboard = (options) => {
    const dashboard = div()
    dashboard.classList.add('full-height-flex')
    options.forEach((option) => {
        const { title, content } = option
        const link = document.createElement('a')
        link.classList.add('dashboard-item')
        link.style['display'] = 'inline-block'
        link.href = option.url
        link.appendChild(createCard(content, title))
        dashboard.appendChild(link)

    })
    return dashboard

}
const createCard = (content, title) => {
    const card = div()
    card.classList.add('card')
    const cardTitle = div()
    cardTitle.innerText = title
    const cardContent = div()
    cardContent.innerText = content
    const cardBody = div()
    cardBody.classList.add('card-body')
    card.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardContent)
    return card
}
const div = () => {
    return document.createElement('div')
}
const root = document.querySelector('#root')

const options = [{ title: 'Add stock', content: ``, url: `addStock` }, { title: `Update stock`, content: ` `, url: `updateStock` }, { title: `Tag stock`, content: ``, url: `tagStock` }, { title: `Allot space`, content: ``, url: `allotSpace` },
{ title: `View all stocks`, content: ``, url: `viewAllStocks` }]
root.appendChild(dashboard(options))