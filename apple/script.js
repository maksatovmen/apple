const HOST = 'http://localhost:3000'
async function getData (route){
    const res = await fetch(`${HOST}/${route}`)
    return await res.json()
}

function elemGenerator(tag, attr, content){
    if(!tag)return

    const element = document.createElement(tag)

    attr.forEach( item => {
        const arr = Object.entries(item)
        arr.forEach( elem => {
            element.setAttribute(elem[0], elem[1])
        })
    })

    content ? element.innerText = content : ''

    return element
}

function fev(bool, node){
    if(bool){
        node.innerHTML = `<img src="./assets/img/trueFav.png">`
    }else{
        node.innerHTML = `<img src='./assets/img/falseFav.png'>`
    }
}

async function changeFav(obj, route){
    const {id, isFavarite} = obj

    const data = {...obj, isFavarite: !isFavarite}
    const res = await fetch(`${HOST}/${route}/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(data)
    })

    return await res.json()
}

// To do 
const reg = document.querySelector('.header__count')
function regisFav(na){
    if(na = true){
        reg.innerText = 0
    }
}

const caseCont = document.querySelector('.cases__container')
const renderCase = (data) =>{
    caseCont.innerHTML = ''
    data.forEach(element =>{
        const casesBlock = elemGenerator('div', [{class: 'cases__block'}])
        const casesImg = elemGenerator('div', [{class: 'cases__img'}])
        const casesName = elemGenerator('div', [{class: 'cases__type'}])
        const casesType = elemGenerator('span', [{class: 'cases__name'}], element.name)
        const casesAmount = elemGenerator('span', [{class: 'cases__amount'}], element.amount)
        
        casesName.append(casesType, casesAmount)
        casesImg.innerHTML = `<img src='${element.img}' alt = 'img'>`
        casesBlock.append(casesImg, casesName)
        caseCont.append(casesBlock)
    })
}

const headphoneCont = document.querySelector('.headphones__container')
const renderHeadphone = (data) =>{
    headphoneCont.innerHTML = ''
    data.forEach(element =>{
        const headphonesBlock = elemGenerator('div', [{class: 'headphones__block'}])
        const headphonesImg = elemGenerator('div', [{class: 'headphones__img'}])
        const textBlock = elemGenerator('div', [{class: 'headphones__text'}])
        const leftTextBlock = elemGenerator('div', [{class: 'headphones__text-left'}])
        const headphonesName = elemGenerator('div', [{class: 'headphones__name'}], element.name)
        const headphonesRating = elemGenerator('div', [{class: 'headphones__rating'}])
        const rightTextBlock = elemGenerator('div', [{class: 'headphones__text-right'}])
        const headphonesPrice = elemGenerator('div', [{class: 'headphones__price'}], element.price)
        const favouriteIcon = elemGenerator('div', [{class: 'favourite_icon'}]) 

        fev(element.isFavarite, favouriteIcon)

        favouriteIcon.addEventListener('click', ()=> {
            changeFav(element, 'headphones')
                .then( ()=>{
                    getData('headphones')
                        .then(data => {
                            renderHeadphone(data)})
        })
        })

        headphonesImg.innerHTML = `<img src='${element.img}' alt = 'img'>`
        headphonesRating.innerHTML = `<img src = '${element.rateImg}'> <span>${element.rating}</span>`

        leftTextBlock.append(headphonesName, headphonesRating)
        rightTextBlock.append(headphonesPrice)
        textBlock.append(leftTextBlock, rightTextBlock)
        headphonesBlock.append(headphonesImg, textBlock, favouriteIcon)
        headphoneCont.append(headphonesBlock)
    })
}

const earpodsCont = document.querySelector('.earpods__container')
const renderEarpods = (data) =>{
    earpodsCont.innerHTML = ''
    data.forEach(element =>{
        const earpodsBlock = elemGenerator('div', [{class: 'earpods__block'}])
        const earpodsImg = elemGenerator('div', [{class: 'earpods__img'}])
        const textBlock = elemGenerator('div', [{class: 'earpods__text'}])
        const leftTextBlock = elemGenerator('div', [{class: 'earpods__text-left'}])
        const earpodsName = elemGenerator('div', [{class: 'earpods__name'}], element.name)
        const earpodsRating = elemGenerator('div', [{class: 'earpods__rating'}])
        const rightTextBlock = elemGenerator('div', [{class: 'earpods__text-right'}])
        const earpodsPrice = elemGenerator('div', [{class: 'earpods__price'}], element.price)
        // const lastEarpodsPrice = elemGenerator('div', [{class: 'last__price'}], element.last_price)
        const favouriteIcon = elemGenerator('div', [{class: 'favourite_icon'}]) 


        fev(element.isFavarite, favouriteIcon)


        favouriteIcon.addEventListener('click', ()=> {
            changeFav(element, 'earpods')
                .then( ()=>{
                    getData('earpods')
                        .then(data => {
                        renderEarpods(data)})
        })
        })

        earpodsImg.innerHTML = `<img src='${element.img}' alt = 'img'>`
        earpodsRating.innerHTML = `<img src = '${element.rateImg}'> <span>${element.rating}</span>`

        leftTextBlock.append(earpodsName, earpodsRating)
        rightTextBlock.append(earpodsPrice)
        textBlock.append(leftTextBlock, rightTextBlock)
        earpodsBlock.append(earpodsImg, textBlock, favouriteIcon)
        earpodsCont.append(earpodsBlock)
    })
}

getData('headphones')
    .then(data => {
        renderHeadphone(data)
    })

getData('earpods')
    .then(data => {
        renderEarpods(data)
    })

getData('cases')
    .then(data => {
        renderCase(data)
    })

const ative = document.querySelectorAll('.btn')

ative.forEach( (active) =>{
    active.addEventListener('click', () => {
        active.classList.toggle('active')
    })
})

regisFav()

