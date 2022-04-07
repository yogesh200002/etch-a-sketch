//Initialising variables with selectors
const container = document.querySelector(".container")
const slider = document.querySelector('.slider')
const gridValue = document.querySelector('.gridValue')
const eraser = document.querySelector('.eraser')
const reset = document.querySelector('.reset')
const buttonColor = document.querySelector('.color')
const black = document.querySelector('.black') 
let grids;

//Setting up flags
let color = false;
let white = false;
let drag = false;

gridCreate(10)
buttonTransform(black)

function buttonTransform(button){
    button.style.transform = 'scale(1.2)'
    button.style.backgroundColor = 'red'
}

function buttonNormal(...buttons){
    buttons.forEach(button => {
        button.style.transform = 'scale(1)'
        button.style.backgroundColor = 'black'
    })
}

eraser.addEventListener('click', () => {
    white = true
    color = false
    buttonTransform(eraser)
    buttonNormal(buttonColor,black)
})

black.addEventListener('click', () => {
    white = false
    color = false
    buttonTransform(black)
    buttonNormal(buttonColor,eraser)
})

buttonColor.addEventListener('click', () => {
    white = false
    color = true
    buttonTransform(buttonColor)
    buttonNormal(black,eraser)
})

reset.addEventListener('click',() => {
    gridReset(grids)
    update()
})

//Updating and reseting the grid while changing the slider
function update(){
    gridReset(grids)
    gridCreate(slider.value)
    gridValue.textContent = `${slider.value} X ${slider.value}`
}

slider.addEventListener('change',update)

//Mouse Drag events
function mouseDrag(cells){
    cells.addEventListener('mousedown', e => {
        drag = true
        colorChange(cells)
    })
    cells.addEventListener('mouseover', e => {
        if(drag == true){
            colorChange(cells)
        }
    })
    cells.addEventListener('mouseup', e => {
        drag = false
    })
}

function gridReset(id){
    id.forEach(value => {
        value.remove();
    })
}

function gridCreate(gridLength){
    for(let i=0;i<gridLength*gridLength;i++){
        const grid = document.createElement('div')
        grid.classList.add('cell')
        container.style.gridTemplateColumns = `repeat(${gridLength},1fr)`
        container.appendChild(grid)  
    }
    grids = document.querySelectorAll('.cell')
    grids.forEach(cell => {
        mouseDrag(cell)
        cell.style.borderStyle = 'solid'
        cell.style.borderWidth = '1px'
    })
}

function colorChange(element){
    if(white == true){
        element.style.backgroundColor = 'white'
    }
    else if(color == true){
        let randomR = Math.floor(Math.random()*256)
        let randomG = Math.floor(Math.random()*256)
        let randomB = Math.floor(Math.random()*256)
        element.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`
    }
    else{
        element.style.backgroundColor = 'black'
    }
}