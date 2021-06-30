'use strict';

// Datos
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const projectName = document.getElementById('project-name');
const heightArea = document.getElementById('height');
const widthArea = document.getElementById('width');
const establishButton = document.getElementById('establish');
const rect1Button = document.getElementById('rect1-button');
const rect2Button = document.getElementById('rect2-button');
let area_id;

// Esta funcion verifica que el rectangulo no se salga del area de trabajo
function verifyIfCorrectRect(posX, posY, width, height) {
    if ((posX >= 0 && posX <= widthArea.value) && (posY >= 0 && posY <= heightArea.value) &&
        (Number(widthArea.value) - width - posX >= 0) && (Number(heightArea.value) - height - posY >= 0)) {
            return true;
    } else {
        return false;
    }
};

// Establece el ancho y el alto del area de trabajo
establishButton.addEventListener('click', () => {
    if (projectName.value === '') {
        alert('Pon un nombre para el proyecto');

    } else if ((heightArea.value === '' || heightArea.value == 0) &&
        (widthArea.value === '' || widthArea.value == 0)) {
        canvas.height = 150;
        canvas.width = 150;
        alert('Por Favor ponga un valor valido');

    } else if ((heightArea.value === '' || heightArea.value == 0)) {
        canvas.height = 150;
        canvas.width = widthArea.value;
    } else if ((widthArea.value === '' || widthArea.value == 0)) {
        canvas.height = heightArea.value;
        canvas.width = 150;

    } else {
        canvas.height = heightArea.value;
        canvas.width = widthArea.value;
        establishButton.setAttribute('disabled', 'true');
        sendAreaData(projectName.value, widthArea.value, heightArea.value);
    }
});

// Crea el primer rectangulo
rect1Button.addEventListener('click', function () {
    let posX = Number(document.getElementById('rect1-posx').value);
    let posY = Number(document.getElementById('rect1-posy').value);
    let height = Number(document.getElementById('rect1-height').value);
    let width = Number(document.getElementById('rect1-width').value);
    let color = document.getElementById('rect1-color').value;
    if (verifyIfCorrectRect(posX, posY, width, height)) {
        ctx.fillStyle = color;
        ctx.fillRect(posX, posY, width, height);
        rect1Button.setAttribute('disabled', 'true');
        sendRectData(area_id, posX, posY, width, height, color);
    } else {
        alert('Lo siento no puede hacer eso');
    }
});

// Crea el segundo rectangulo
rect2Button.addEventListener('click', function () {
    let posX = Number(document.getElementById('rect2-posx').value);
    let posY = Number(document.getElementById('rect2-posy').value);
    let height = Number(document.getElementById('rect2-height').value);
    let width = Number(document.getElementById('rect2-width').value);
    let color = document.getElementById('rect2-color').value;
    if (verifyIfCorrectRect(posX, posY, width, height)) {
        ctx.fillStyle = color;
        ctx.fillRect(posX, posY, width, height);
        rect2Button.setAttribute('disabled', 'true');
        sendRectData(area_id, posX, posY, width, height, color);
    } else {
        alert('Lo siento no puede hacer eso');
    }
});

// Peticiones
async function sendAreaData(name, width, height) {
    const transferObject = {
        Name : name,
        Width : width,
        Height : height
    }
    let myRequest = await fetch('http://localhost:5000/add/area/', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(transferObject)
    });
    let myResponse = await myRequest.json();
    
    area_id = myResponse.insertId;
}

function sendRectData(id, posX, posY, width, height, color) {
    const transferObject = {
        Area_ID : id,
        PositionX : posX,
        PositionY : posY,
        Width : width,
        Height : height,
        Color : color
    }
    fetch('http://localhost:5000/add/rect/', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(transferObject)
    });
}