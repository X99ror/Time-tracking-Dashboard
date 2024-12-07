let timeframe = 'weekly'
const timeframeMsg = {
    'daily':'Yesterday',
    'weekly':'Last Week',
    'monthly':'Last Month',
}; 
const container = document.querySelector('.container');
let regularcards;

const menu = document.querySelectorAll('.menu-link');
console.log(menu)


menu.forEach(element => {

    element.addEventListener('click',menuOnClick);
    
});

let data = {};


fetch("./js/data.json")
.then(res => res.json())
.then(jsonData =>{
    jsonData.forEach(element =>{
        container.insertAdjacentHTML('beforeend',
            createRectangularCard(element,timeframe));
    });


    jsonData.forEach(element => {
        data[element.title] = element.timeframes;
    });
    regularcards=document.querySelectorAll('.regular-card');

});

function menuOnClick(e){
    
     menu.forEach(element =>{
        element.classList.remove('menu-active');
     });

     e.target.classList.add('menu-active');
     timeframe=e.target.innerText.toLowerCase();
     updateCards(timeframe);
}

function updateCards(timeframe){
    regularcards.forEach(card => {
        updateCard(card,timeframe)
    });

}
function updateCard(card,timeframe){
    const title = card.querySelector('.title').innerText;
    const current=data[title][timeframe]['current'];
    const previous=data[title][timeframe]['previous'];

    const hoursElement = card.querySelector('.hours');
    hoursElement.innerText=`${current}hrs`
    const msg =card.querySelector('.description');
    msg.innerText=`${timeframeMsg[timeframe]}-${previous}hrs`;
    const infoElement = card.querySelector('.additional-info');
    infoElement.innerText =  `You have spent  ${current} hours on ${title.toLowerCase()} this ${timeframe}.`;
}

function createRectangularCard(element,timeframe){
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous']

    return `
    <div class="regular-card ${title.toLowerCase().replace(/\s/g,'')}">
            <div class="property-card">
                <div class="row">
                    <div class="title">${title}</div>
                    <div class="points">
                        <div class="point"></div>
                        <div class="point"></div>
                        <div class="point"></div>
                    </div>
                </div>
                <div class="row-2">
                    <div class="hours">${current}hrs</div>
                    <div class="description">${timeframeMsg[timeframe]} - ${previous}hrs</div>
                </div>
                <div class="additional-info">You have spent${current} hours on ${title.toLowerCase()} this ${timeframe}.</div>
            </div>
        </div>`
}

