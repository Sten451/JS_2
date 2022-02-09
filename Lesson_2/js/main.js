class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allprice = 0; // общая сумма товаров в магазине
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this._amountProducts(); // подсчёт общего количества и стоимости в футере
        this.render();//вывод товаров на страницу
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000, amount: 10, foto: 'notebook'},
            {id: 2, title: 'Mouse', price: 20, amount: 16, foto: ''},
            {id: 3, title: 'Keyboard', price: 250, amount: 19, foto: ''},
            {id: 4, title: 'Gamepad', price: 50, amount: 0, foto: ''},
        ];
    }

    _amountProducts() {
        //количество товаров и общая сумма с учётом количества
        this.count = (this.goods).length;
        this.goods.forEach((item) => (this.allprice += item.price * item.amount))
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
        const block_footer = document.querySelector("footer");
            block_footer.insertAdjacentHTML("beforeend", `<nav class="navbar fixed-bottom navbar-light bg-light">
                <div class="container-fluid"><p class="footer">Всего в магазине: <b>${this.count}
                </b> вида товара на общую сумму <b>${this.allprice}</b> рублей.</p> </div></nav>`)

    }
}

class ProductItem {
    constructor(product, foto = '404', amount = 0) {
        if (product.foto) {
            this.foto = product.foto
        } else this.foto = foto;
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        //потребуется возможно в дальнейшем
        if (product.amount) {
            this.amount = product.amount
        }
        else this.amount = amount
    }

    render(btn = 'btn-success') {
        if (!this.amount) {btn = 'hidden'} //Если товара нет, скрываем кнопку через css
        return `<div class="card">
    <img src="img/${this.foto}.jpg" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text">Цена: <b>${this.price}</b> рублей.</p>
        <p class="card-text">Количество на складе: <b>${this.amount}</b> штук.</p>
        <button value="${this.id}" class="btn ${btn}">Купить</button>
    </div>
    </div>`
    }
}

// класс корзина
class Cart{
    //очистка корзины
    clear(){}

    //отрисовка(показ)
    render(){}

    //подсчёт стоимости товаров в корзине
    _amount(){}
}

//класс элемент корзины
class CartItem{
    //добавление товара в корзину
    add(){}

    //удаление товара из корзины
    delete(){}

    //отрисовка(показ) не уверен пока
    render(){}
}


let list = new ProductList();
let list_cart = new (Cart);
