const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allprice = 0; // общая сумма товаров в магазине
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        //НЕПОНЯТНО ПОЧЕМУ, НО ЭТИ МЕТОДЫ ОТСЮДА БОЛЬШЕ НЕ РАБОТАЮТ
        //this._amountProducts(); // подсчёт общего количества и стоимости в футере
        //this.render();//вывод товаров на страницу
    }

    _fetchProducts() {
        fetch(`${API + "/catalogData.json"}`)
            .then(response => response.json())
            .then(data => this.handle(data))
            .catch(error => {
                console.log(error)
            })
    }

    handle(data) {
        this.goods = [...data]
        // не знаю как за один проход сразу два новых свойства установить, поскольку они отсутствуют
        this.goods.forEach((item) => (item = item.foto = ''))
        this.goods.forEach((item) => (item = item.amount = 1))
        this._amountProducts(); // подсчёт общего количества и стоимости в футере
    }

    _amountProducts() {
        //количество товаров и общая сумма с учётом количества
        this.count = (this.goods).length;
        this.goods.forEach((item) => (this.allprice += item.price * item.amount))
        this.render();//вывод товаров на страницу
    }

    render() {
        //console.log('render')
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());

        }
        ProductItem.show_button_buy()
        const block_footer = document.querySelector("footer");
        block_footer.insertAdjacentHTML("beforeend", `<nav class="navbar fixed-bottom navbar-light bg-light">
                <div class="container-fluid"><p class="footer">Всего в магазине: <b>${this.count}
                </b> вида товара на общую сумму <b>${this.allprice}</b> рублей.</p> </div></nav>`)
    }

    // функция вывода сообщений
    static message(text) {
        let element = document.createElement('div')
        element.className = 'message'
        element.innerHTML = `<div class="modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Системное уведомление</h5></div><div class="modal-body"><p>${text}</p>
      </div><div class="modal-footer"></div></div></div></div>`
        document.body.appendChild(element);
        setTimeout(function () {
            document.body.removeChild(element)
        }, 500);
    }
}

class ProductItem {
    constructor(product, foto = '404', amount = 0) {
        if (product.foto) {
            this.foto = product.foto
        } else this.foto = foto;
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        if (product.amount) {
            this.amount = product.amount
        } else this.amount = amount
    }

    render(btn = 'btn-success') {
        if (!this.amount) {
            btn = 'hidden'
        } //Если товара нет, скрываем кнопку через css
        return `<div class="card">
    <img src="img/${this.foto}.jpg" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text">Цена: <b>${this.price}</b> рублей.</p>
        <p class="card-text">Количество на складе: <b>${this.amount}</b> штук.</p>
        <button value='{"id_product":${this.id}, "product_name":"${this.title}", "price":${this.price}, "quantity":1}' id ="buy_b" class="btn ${btn}">Купить</button>
        
    </div>
    </div>`
    }

    //пусть будет так со статическим методом
    static show_button_buy() {
        let buy_button = document.querySelectorAll('#buy_b')
        for (var i = 0; i < buy_button.length; i++) {
            buy_button[i].addEventListener('click', function () {
                //вызываем метод другого класса через его экземпляр и передаём ему значение кнопки, как обычно
                // непонятки со стрелочными функциями и this и call
                list_cart.add_in_cart(this.value)
            }, false)
        }
    }
}

// класс корзина
class Cart {
    constructor() {
        this.allprice_cart = 0;
        this._init_button(); //событие на показ корзины
        this._fetchCart();
    }

    _init_button() {
        let b_cart = document.querySelector('#button_cart')
        b_cart.addEventListener("click", () => this.opencart(this.allcart));
    }

    // Получаем данные из корзины
    _fetchCart() {
        fetch(`${API + "/getBasket.json"}`)
            .then(response => response.json())
            .then(data => this.handle(data.contents))
            .catch(error => {
                console.log(error)
            })
    }

    //Обработка
    handle(data) {
        this.allcart = [...data];
    }

    //очистка корзины (не самый лучший вариант заново перерисовать всю корзину)
    clear() {
        this.allcart.splice(0, this.allcart.length)
        this.opencart(this.allcart, 0);
    }

    // создание модального окна (показ корзины)
    opencart(cart) {
        let count = cart.length
        // если не создано модальное окно
        if (!document.querySelector('.modal_cart')) {
            let element = document.createElement('div')
            element.className = 'modal_cart'
            if (Number(count) !== 0) {
                element.innerHTML = `<div class="modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h4 class="modal-title">Корзина</h4></div><div class="modal-body"><table class="table goods-item">
<thead><tr class="ins2"><th scope="col">#</th><th scope="col">Title</th><th scope="col">Количество</th><th scope="col">Price</th><th scope="col"></th></tr>
</thead><tbody class="showcase_cart"></tbody></table></div><p class="ms-3">Общая сумма товаров в корзине: <b>${this.sumcart(cart)}</b> рублей.</p>
<div class="modal-footer"><button id="btn_clear" type="button" class="btn btn-danger" data-bs-dismiss="modal">Очистить</button>
<button id="btn_close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`
                document.body.appendChild(element);
                let btn_close = document.querySelector('#btn_close')
                let btn_clear = document.querySelector('#btn_clear')
                this.show_cart(cart);
                //инициализация кнопок удаления
                Cart.delete_good();
                btn_clear.addEventListener('click', () => this.clear());

            } else {
                element.innerHTML = `<div class="modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h4 class="modal-title">Корзина</h4></div><div class="modal-body"><h4>В корзине ничего нет</h4>
</div><div class="modal-footer"><button id="btn_close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`
                document.body.appendChild(element);
            }
            btn_close.addEventListener('click', () => this.close_modal());

        } else {
            // иначе закрываем и заново запускаем функцию
            this.close_modal()
            this.opencart(cart)
        }
    }

    //закрытие модального окна
    close_modal() {
        let modal_close = document.querySelector('.modal_cart')
        document.body.removeChild(modal_close)
    }

    rendercart(item) {
        return `<tr>            
            <th scope="row">${item.id_product}</th>
            <td>${item.product_name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td><button id="del" type="submit" class="btn btn-danger" value='${item.id_product}'>Убрать из корзины</button></td>
            </tr>`;
    }

    //показ содержимого корзины
    show_cart(cart) {
        let cart_list = cart.map((item) => {
            return this.rendercart(item)
        }).join('');
        document.querySelector('.showcase_cart').insertAdjacentHTML('beforeend', cart_list)
    }

    //обработчик удаления
    static delete_good() {
        const del_button = document.querySelectorAll('#del')
        for (var i = 0; i < del_button.length; i++) {
            del_button[i].addEventListener("click", function () {
                list_cart.remove_from_cart(this.value)
            })
        }
    }

    sumcart(cart) {
        cart.forEach((item) => (this.allprice_cart += item.price * item.quantity))
        return this.allprice_cart
    }

    //добавление в корзину
    add_in_cart(item) {
        fetch(`${API + "/addToBasket.json"}`)
            .then(response => response.json())
            .then(data => {
                if (data.result === 1) {
                    //у нас строка к сожалению
                    let temp_item = JSON.parse(item)
                    //корзина пуста?
                    if (this.allcart.length !== 0) {
                        // находим индекс
                        let find = this.allcart.findIndex(items => items.id_product === temp_item.id_product)
                        if (find !== -1) {
                            //увеличиваем количество в товаре в корзине по индексу
                            // затем корзина сама получит новые данные при ее рендере
                            this.allcart[find].quantity++
                            ProductList.message("Товар добавлен в корзину")
                        } else {
                            this.allcart[this.allcart.length] = temp_item
                            ProductList.message("Товар добавлен в корзину")
                        }
                    }
                    //да пуста
                    else {
                        //поскольку корзина пустая смело присваиваем первому элементу полученное value
                        this.allcart[0] = temp_item
                        ProductList.message("Товар добавлен в корзину");

                    }
                }
            })
    }
    //удаление из корзины
    remove_from_cart(item_id) {
        let find = this.allcart.findIndex(items => items.id_product === Number(item_id))
        this.allcart.splice(find, 1)
        this.opencart(this.allcart)
    }
}

let list = new ProductList();
let list_cart = new Cart();
