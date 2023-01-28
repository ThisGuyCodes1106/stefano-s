import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const menuDiv = document.getElementById("menu")
const orderItemsDiv = document.getElementById("orderItems")
const totalPrice = document.getElementById("totalPrice")
const orderSectionDiv = document.getElementById("orderSection")
const placeholderDiv = document.getElementById("placeholderDiv")
const orderBtn = document.getElementById("orderBtn")
const payBtn = document.getElementById("payBtn")
const modal = document.getElementById("modal")
const thanksDiv = document.getElementById("thanksDiv")

let order = []
let orderTotal = 0

document.addEventListener('click', function(event) {
    if (event.target.dataset.item) {
        addItem(event.target.dataset.item);
    } else if (event.target.dataset.remove) {
        removeItem(event.target.dataset.remove)
    } else if (event.target.id === 'orderBtn') {
        completeOrder()
    } else if (event.target.id === 'payBtn') {
        completePayment()
    }
})

function addItem(clickedItem) {

    orderSectionDiv.style.display = 'block'
    placeholderDiv.style.display = 'none'
    thanksDiv.style.display = 'none'

    menuArray.forEach(item => {
        if (item.name === clickedItem) {
            order.push({
                name: item.name,
                price: item.price,
                uuid: uuidv4(),
            });
        }
    })
    renderOrder()
}

function removeItem(itemID) {
    order.forEach((item, index) => {
        if (item.uuid === itemID) {
            order.splice(index, 1)
        }
    })
    renderOrder()
}

function renderMenu() {
    menuArray.forEach(item => {
        menuDiv.innerHTML += `
            <div class="menu--item">
                <img src="${item.image}" class="menu--item--img">
                <div class="menu--item--details">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.join(", ")}</p>
                    <p>£${item.price}</p>
                </div>
                <button class="add-btn" data-item=${item.name}>+</button>
            </div>`
    });
}

function renderOrder() {
    orderItemsDiv.innerHTML = ''
    orderTotal = 0

    order.forEach(item => {
        orderItemsDiv.innerHTML += `
        <div class="order--items--item">
            <h2>${item.name}</h2>
            <p class="remove-btn" data-remove=${item.uuid}>remove</p>
            <p class="item-price">${item.price}</p>
        </div>`
        orderTotal += item.price
    })
    totalPrice.innerHTML = "£" + orderTotal
}

function completeOrder() {
    modal.style.display = 'block'
}

function completePayment() {
    order = []
    orderSectionDiv.style.display = 'none'
    modal.style.display = 'none'
    thanksDiv.style.display = 'block'
}

renderMenu()