const products = [
    {id: 1, title: 'Notebook', price: 2000, foto:'notebook'},
    {id: 2, title: 'Mouse', price: 20, foto:''},
    {id: 3, title: 'Keyboard', price: 200, foto:''},
    {id: 4, title: 'Gamepad', price: 50, foto:''},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (obj, foto=404) => {
    if (obj.foto){foto=obj.foto}
    return `<div class="card">
    <img src="img/${foto}.jpg" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${obj.title}</h5>
        <p class="card-text">Цена: ${obj.price} рублей.</p>
        <button value="${obj.id}" class="btn btn-success">Купить</button>
    </div>
    </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    document.querySelector('.products').insertAdjacentHTML('beforeend', productsList);
};

renderPage(products);