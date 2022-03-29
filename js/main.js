const liList = document.querySelectorAll('li')
let number = 1



for (const li of liList) {
    li.textContent = number
    li.setAttribute('data-id', number)
    number++
}

const thirdLi = document.querySelector('[data-id="3"]')

const wrapper = thirdLi.closest('.wrapper')
console.log(wrapper);
