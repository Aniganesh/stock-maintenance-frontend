"use strict"

const ajaxCall = (endPoint, data, method, onSuccess) => {
    $.ajax({
        url: `http://localhost:5000/${endPoint}`,
        type: method,
        data,
        dataType: "json",
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.overrideMimeType("application/j-son;charset=UTF-8");
            }
        },
        success: onSuccess
    });
}

const isDashItem = (item) => {
    if (item.classList.contains('dashboard-item') ||
        item.parentNode.classList.contains('dashboard-item') ||
        item.parentNode.parentNode.classList.contains('dashboard-item') ||
        item.parentNode.parentNode.parentNode.classList.contains('dashboard-item'))
        return true
    return false
}


const getComponentName = (node) => {
    if (node.classList.contains('dashboard-item')) {
        return node.dataset.component
    }
    if (node.parentNode.classList.contains('dashboard-item')) {
        return node.parentNode.dataset.component
    }
    if (node.parentNode.parentNode.classList.contains('dashboard-item')) {
        return node.parentNode.parentNode.dataset.component
    }
    if (item.parentNode.parentNode.parentNode.classList.contains('dashboard-item')) {
        return item.parentNode.parentNode.parentNode
    }
}

const displayForm = (event) => {
    const formArea = document.querySelector('#form-area')
    if (isDashItem(event.target)) {
        const componentName = getComponentName(event.target)
        switch (componentName) {
            case 'addStock':
                toggleAddStock(formArea)
                break
            case 'updateStock':
                toggleUpdateStock(formArea)
                break
            case 'tagStock':
                toggleTagStock(formArea)
                break
            case 'allotSpace':
                toggleAllotSpace(formArea)
                break
            case 'viewAllStocks':
                toggleViewAllStocks(formArea)
                break
            case 'addTag':
                toggleAddTag(formArea)
                break
            case 'viewTags':
                toggleViewTags(formArea)
                break
        }
    }
}

const toggleAddStock = (formArea) => {
    const formId = 'add-stock-form'
    const card = createCard(`<form class="form-group" id="${formId}">
    <input type="text" class="form-control" name="name" placeholder="Name of item" required /><br />
    <input type="number" class="form-control" name="price" placeholder="Price of Item" required /><br />
    <input type="number" class="form-control" name="unitsAvailable" placeholder="Number of units received" required /> <br />
    <button type="submit" name="submit" class="btn-theme btn-theme-full p-2" id="add-stock-button">Add</button>
</form>`, 'Add a stock item', true)
    manageCards(formId, card, formArea, addStock)

}

/* Card togglers */

const toggleViewTags = (formArea) => {
    const cardId = 'tag-list'
    const card = createCard(`<div class="entity-list" id="${cardId}"></div>`, "All Tags", true)
    const onSuccess = (res) => {
        res.map((tag, index) => {
            const tagDiv = div()
            tagDiv.classList.add("entity")
            tagDiv.innerHTML = `<div>${tag.name}</div><button class="delete-icon" id='tag${index}' >x</button>`
            tagDiv.querySelector(`#tag${index}`).addEventListener('click', () => deleteTag(tag._id))
            card.querySelector(`#${cardId}`).appendChild(tagDiv)
        })
    }
    ajaxCall('tags', {}, 'GET', onSuccess)
    manageCards(cardId, card, formArea)
}

const toggleUpdateStock = (formArea) => {
    const formId = 'update-stock-form'
    const card = createCard(`<form class="form-group" id="${formId}" action="" method="">
    <select name="stock" class="custom-select" id="stock-to-update" required>
        <option selected disabled value="----">--Select a stock to update--</option>
    </select>
    <input type="number" class="form-control" name="item-price" placeholder="Price of Item" required /><br />
    <input type="number" class="form-control" name="item-units" placeholder="Number of units received" required /> <br />
    <button type="submit" name="submit" class="btn-theme btn-theme-full p-2" id="update-stock-button">Add</button>
</form>`, 'Update a stock item', true)
    const stockSelect = card.querySelector('#stock-to-update')
    const stockPrice = card.querySelector('#item-price')
    const stockUnits = card.querySelector('#item-units')
    /* TODO: Get stocks from back-end and append them to stockSelect. Also populate item price and item units  */
    manageCards(formId, card, formArea)
}

const toggleTagStock = (formArea) => {
    const formId = 'tag-stock-form'
    const card = createCard(`<form class="form-group" id="${formId}" action="" method="">
    <select name="stock" class="custom-select" id="stock-to-tag" required>
        <option selected disabled value="----">--Select a stock to update--</option>
    </select><br />
    <select name="tag" class="custom-select" id="tag-for-stock" required>
        <option selected disabled value="----">--Select a tag for stock--</option>
    </select><br />
    
    <button type="submit" name="submit" class="btn-theme btn-theme-full p-2" id="tag-stock-button">Tag</button>
</form>`, 'Tag a stock item', true)
    manageCards(formId, card, formArea)
}

const toggleAllotSpace = (formArea) => {
    const formId = 'allot-space-form'
    const card = createCard(`<form class="form-group" id="${formId}" action="" method="">
    <select name="stock" class="custom-select" id="stock-to-allot" required>
        <option selected disabled value="----">--Select a stock to allot space for--</option>
    </select><br />
    <select name="space" class="custom-select" id="space-for-stock" required>
        <option selected disabled value="----">--Select a tag for stock--</option>
    </select><br />
    
    <button type="submit" name="submit" class="btn-theme btn-theme-full p-2" id="allot-space-button">Allot</button>
</form>`, 'Allot space for a stock', true)
    const stockSelect = card.querySelector('#stock-to-allot')
    const spaceSelect = card.querySelector('#space-for-stock')
    /* TODO: Get stocks from back-end and append them to stockSelect. Similarly with spaceSelect  */
    manageCards(formId, card, formArea)
}

const toggleViewAllStocks = (formArea) => {
    const cardId = 'stock-list'
    const card = createCard(`<div class="entity-list" id="${cardId}"></div>`, "All stocks", true)
    const onSuccess = (res) => {
        res.map((stock, index) => {
            const stockDiv = div()
            stockDiv.classList.add("entity")
            stockDiv.innerHTML = `<div>${stock.name}</div>(${stock.unitsAvailable} units) <button class="delete-icon" id="stock${index}">x</button>`
            stockDiv.querySelector(`#stock${index}`).addEventListener('click', () => deleteStock(stock._id))
            card.querySelector(`#${cardId}`).appendChild(stockDiv)
        })
    }
    ajaxCall('stocks', {}, 'GET', onSuccess)
    manageCards(cardId, card, formArea)
}

const toggleAddTag = (formArea) => {
    const cardId = 'add-tag-form'
    const card = createCard(`<form class="form-group" id="${cardId}" action="" method=""> 
    <input type="text" class="form-control" id="add-tag-input" name="tag" placeholder="Name of tag" required />
    <button type="submit" name="submit" class="btn-theme btn-theme-full p-2" id="add-tag-button">Add</button>
    </form>`, "Add tag", true)
    manageCards(cardId, card, formArea, addTag)
}

/* Functions with ajax Calls */

const addStock = (event) => {
    event.preventDefault()
    const name = event.target.name.value, price = event.target.price.value, unitsAvailable = event.target.unitsAvailable.value
    const onSuccess = (result) => {
        console.log({ result }, 'has been added')
        event.target.name.value = '', event.target.price.value = '', event.target.unitsAvailable.value = ''
    }
    ajaxCall('stocks', { name, price, unitsAvailable }, 'POST', onSuccess)
}

const addTag = (event) => {
    event.preventDefault()
    const name = event.target.tag.value
    const onSuccess = (result) => {
        console.log({ result }, 'has been added')
        event.target.tag.value = ''
    }
    ajaxCall('tags', { name }, 'POST', onSuccess)
}

const deleteStock = (id) => {
    const onSuccess = () => {
        window.location.reload()
    }
    ajaxCall('stocks', { id }, 'DELETE', onSuccess)
}
const deleteTag = (id) => {
    const onSuccess = () => {
        window.location.reload()
    }
    ajaxCall('tags', { id }, 'DELETE', onSuccess)
}
/* Helper and wrapper functions */
const manageCards = (cardId, card, formArea, eventListener) => {
    const CARD = formArea.querySelector(`#${cardId}`)
    if (CARD) {
        formArea.removeChild(CARD.parentNode.parentNode.parentNode)
        if (eventListener)
            CARD.removeEventListener('submit', eventListener)
        return
    }
    card.classList.add('action-card')
    if (eventListener)
        card.querySelector(`#${cardId}`).addEventListener('submit', eventListener)
    formArea.appendChild(card)
}

const getDashboard = (options) => {
    const dashboard = div()
    dashboard.classList.add('full-height-flex')
    dashboard.classList.add('dashboard-container')
    const cardsContainer = div()
    cardsContainer.classList.add('d-flex')
    options.forEach((option) => {
        const { title, content, component } = option
        const card = createCard(content, title)
        card.dataset.component = component
        card.classList.add('dashboard-item')
        cardsContainer.appendChild(card)
    })
    dashboard.appendChild(cardsContainer)
    dashboard.addEventListener('click', displayForm)
    const formArea = div()
    formArea.setAttribute('id', 'form-area')
    dashboard.appendChild(formArea)
    return dashboard
}

const createCard = (content, title, isContentHTML) => {
    const card = div()
    card.classList.add('card')
    const cardTitle = div()
    cardTitle.innerText = title
    const cardContent = div()
    if (isContentHTML)
        cardContent.innerHTML = content
    else
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

const options = [
    { title: 'Add new stock', content: ``, component: `addStock` },
    { title: `Update stock`, content: ``, component: `updateStock` },
    { title: `Tag stock`, content: ``, component: `tagStock` },
    { title: `Allot space`, content: ``, component: `allotSpace` },
    { title: `View all stocks`, content: ``, component: `viewAllStocks` },
    { title: 'Add tag', content: '', component: 'addTag' },
    { title: 'View all tags', content: '', component: 'viewTags' }
]
const dashboard = getDashboard(options)
root.appendChild(dashboard)