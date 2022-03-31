const container = document.querySelector(".container")
const slider = document.querySelector('.slider')
let color = false;

function update(){
    length = slider.value
    gridReset(grids)
    gridCreate(length)
}

slider.addEventListener('change',update)

function mouseDrag(cells){
    cells.addEventListener('mousedown', e => {
        color = true
        colorChange(cells)
    })
    cells.addEventListener('mousemove', e => {
        if(color == true){
            colorChange(cells)
        }
    })
    cells.addEventListener('mouseup', e => {
        if(color == true){
            colorChange(cells)
        }
        color = false
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
        grid.id = 'cell'
        container.style.gridTemplateColumns = `repeat(${gridLength},1fr)`
        container.appendChild(grid)
        grid.style.padding = '5px'
        grid.style.border = '2px'
        grid.style.borderStyle = 'solid'
        container.style.display = 'grid'
        container.style.padding = '10px'
        container.style.height = '600px'
        container.style.width = '600px'
        const grids = document.querySelectorAll('#cell')
        grids.forEach(cell => {
            mouseDrag(cell)
        })
    }
}

function colorChange(element){
    element.style.backgroundColor = 'red'
}

