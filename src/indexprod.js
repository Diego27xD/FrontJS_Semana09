const $ = (name) => document.querySelector(name);

const tbody = $("#tbodyprod");
const btnCreate = $("#btn-create-prod");

const inputName = $("#input-name");
const inputPrice = $("#input-price");
const inputImagen = $("#input-image");
const inputDiscount = $("#input-discount");
const inputCategory = $("#input-category");

const data = {}

inputName.onkeyup = function (event) {
    data.name = event.target.value;
};
inputPrice.onkeyup = function (event) {
    data.price = Number(event.target.value);
};
inputImagen.onkeyup = function (event) {
    data.url_image = event.target.value;
};
inputDiscount.onkeyup = function (event) {
    data.discount = Number(event.target.value);
};
inputCategory.onkeyup = function (event) {
    data.category = Number(event.target.value);
};

async function getProducts(){
    try {
        const result = await get("/product");
        result.forEach(product => renderRow(product));
        
    } catch (error) {
        console.error(error)
    }
}

getProducts();
btnCreate.onclick = async function(){
    try {
        const result = await post("/product", data);
        inputName.value = "";
        inputPrice.value = "";
        inputImagen.value = "";
        inputDiscount.value = "";
        inputCategory.value = "";
        renderRow(result)
    } catch (error) {
        console.log(error);
    }
}


function renderRow(product){
    tbody.innerHTML += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><img src="${product.url_image}" width="200"></td>
          
        </tr>
    `
}