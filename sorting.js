'use strict';



const tableBody = document.querySelector(".output__data"),
    addAutoForm = document.querySelector('#add__auto'),
    sortAuto = document.querySelector('.sort__auto'),
    thead = document.querySelector('.head');
let carData = [];


function pushCarinTable(car, index) {

    const { model, brand, year, mileage } = car;
    const trelm = document.createElement('tr');

    trelm.innerHTML = `
<tr class="info__block">
<td class="col num">${index + 1}</td>
<td class="col brand">${brand}</td>
<td class="col model">${model}</td>
<td class="col year">${year}</td>
<td class="col  mileage">${mileage}</td>
</tr>
 `

    return trelm;
}

function render() {
    tableBody.innerHTML = '';
    const fragment = document.createDocumentFragment();
    carData.forEach((car, i) => fragment.appendChild(pushCarinTable(car, i)));
    tableBody.appendChild(fragment);
}

const addFormHandler = (e) => {
    e.preventDefault();
    const target = e.target;

    console.log(target);

    const formData = new FormData(addAutoForm);

    let newCar = {};
    let isFilled = true;

    for (let input of formData) {
        input[1] ? newCar[input[0]] = input[1] : isFilled = false;
    }
    if (isFilled) {
        newCar.id = new Date().getTime();
        tableBody.appendChild(pushCarinTable(newCar, carData.length));
        carData.push(newCar);
    }
    addAutoForm.reset();
};






function init(){
    
    sortAuto.addEventListener('change', (e) => {
        const inputs = sortAuto.querySelectorAll('input');
        const inputsValue = new Map();
        inputs.forEach((input) => inputsValue.set(input.getAttribute('name'), input.value));
        console.log(inputsValue);
    
    
        const fragment = document.createDocumentFragment();
        let counter = 0;
        carData.forEach((car) => {
    
            const { brand, model, year, mileage } = car;
    
            let ibrand = inputsValue.get('brand');
            let imodel = inputsValue.get('model');
            let iyear = inputsValue.get('year');
            let imileage = inputsValue.get('mileage');
    
    
            if ((ibrand === '' ? true : ibrand.toLowerCase() === brand.toLowerCase()) &&
                (imodel === '' ? true : imodel.toLowerCase() === model.toLowerCase()) &&
                (iyear === '' ? true : +iyear === year) &&
                (imileage === '' ? true : +imileage === mileage)) {
    
                fragment.appendChild(pushCarinTable(car, counter++));
    
            }
    
        })
        
        tableBody.innerHTML = '';
        tableBody.appendChild(fragment);
    
    })
    
    addAutoForm.addEventListener('submit', addFormHandler);
    
    thead.addEventListener('click', (e) => {
        const target = e.target;
    
    
        if (target.closest('.num') ||
            target.closest('.year') ||
            target.closest('.mileage') ||
            target.closest('.brand') ||
            target.closest('.model') ) {    
            const key = target.classList[1];   
            carData.sort((a, b) => {   
                const vA = a[key];
                const vB = b[key];
    
                if (vA > vB) return 0;
                if (vA < vB) return -1;
                if (vA == vB) return 0;       
            })    
    
        render();    
    }
})



fetch('./cars.json')
    .then(response => response.json())
    .then((results) => {
        carData = [...results];
        render();
    });

}


init();