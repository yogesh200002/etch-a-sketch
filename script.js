const container = document.querySelector(".container")
const slider = document.querySelector('.slider')
let color = false;
gridCreate(1)

function update(){
    length = slider.value
    gridReset(refGrid)
    gridCreate(length)
    console.log(length)
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
    }
    const grids = document.querySelectorAll('#cell')
    refGrid = grids
    grids.forEach(cell => {
        mouseDrag(cell)
        cell.style.borderStyle = 'solid'
        cell.style.borderWidth = '1px'
    })
}

function colorChange(element){
    element.style.backgroundColor = 'black'
}

container.style.display = 'grid'
container.style.padding = '0px'
container.style.height = '600px'
container.style.width = '600px'
container.style.borderStyle = 'solid'