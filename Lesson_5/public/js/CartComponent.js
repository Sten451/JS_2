Vue.component('cart', {
    props: ['visibility'],
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                const temp = []
                for (let item of data.contents) {
                    //Убираем дубликаты
                    if (!temp.includes(item.id_product)) {
                        this.$data.cartItems.push(item);
                        temp.push(item.id_product)
                    }
                        //находим имеющийся элемент и его количество и прибавляем к нему количество нового элемента
                    // но сам элемент не добавляем
                    else {
                        let find_element = this.cartItems.find(el => el.id_product === item.id_product);
                        find_element.quantity += item.quantity
                    }
                }
            });
    },

    methods: {
        changeVisibility() {
            this.$emit('change-visibility', this.visibility)
        },
        //чисто JS
        showMessage(message) {
            let element = document.createElement('div')
            element.className = 'message'
            element.innerHTML = `
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Системное уведомление</h5>
                        </div>
                    <div class="modal-body"><p class="text-center"><b>${message} </b>успешно добавлен в корзину</p>
                </div>
            <div class="modal-footer"></div></div></div></div>`
            document.body.appendChild(element);
            setTimeout(function () {
                document.body.removeChild(element)
            }, 1500);
        },

        //очистка корзины полностью с нулевого элемента
        clearCart() {
            this.cartItems.splice(0)
        },

        addNewItem(item) {
            const prod = Object.assign({quantity: 1}, item);
            this.$parent.postJson(`/api/cart`, prod)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.push(prod)
                    }
                })
        },

        addQuantity(item) {
            this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: 1})
                .then(data => {
                    if (data.result === 1) {
                        item.quantity++
                    }
                })
        },

        addProduct(item) {
            this.showMessage(item.product_name)
            //корзина пуста?
            if (this.cartItems.length === 0) {
                this.addNewItem(item)
            } else {
                let find = this.cartItems.find(el => el.id_product === item.id_product);
                if (find) {
                    this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                        .then(data => {
                            if (data.result === 1) {
                                find.quantity++
                            }
                        })
                } else {
                    this.addNewItem(item)
                }
            }
        },

        remove(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },

        PriceCart() {
            price = 0
            this.cartItems.forEach((item) => (price += item.price * item.quantity))
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        ,
    },

    template: `
        <div class="modal_cart" :class="{'hidden': visibility}">
            <div v-if="cartItems.length > 0" class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header"><h4 class="modal-title">Корзина</h4></div>
                        <div class="modal-body">
                            <table class="table goods-item">
                                <thead>
                                <tr class="ins2">
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Количество</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">Цена</th>
                                    <th scope="col">Итого</th>
                                </tr>
                                </thead>
                                <tbody class="showcase_cart">
                                
                                <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" @addProduct="addQuantity" @remove="remove" :count="cartItems.indexOf(item)">
                                </cart-item>
                                
                                </tbody>
                            </table>
                        </div>
                        <p class="ms-3">Общая сумма товаров в корзине: <b> {{ PriceCart() }}</b> рублей.</p>
                        <div class="modal-footer">
                            <button @click="clearCart()" id="btn_clear" type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                Очистить
                            </button>
                            <button @click="changeVisibility()" type="button" class="btn btn-secondary"
                                    data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Корзина</h4>
                        </div>
                        <div class="modal-body">
                            <h4>В корзине ничего нет</h4>
                        </div>
                        <div class="modal-footer">
                            <button @click="changeVisibility()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'count'],
    template: `
  <tr>
      <th class="pt-3" scope="col">{{ count + 1 }}</th>
      <th class="pt-3" scope="col">{{ cartItem.product_name }}</th>
      <th class="pt-3 text-center" scope="col">{{ cartItem.quantity }}</th> 
      <th class="pt-2" scope="col">
        <h3 @click="$emit('remove', cartItem)" class="text-warning float ms-6">       
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
</svg></h3>
      </th>
      <th class="pt-2" scope="col"><h3 @click="$emit('addProduct', cartItem)" class="text-success float">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
</svg>
</h3></th>  
      <th class="pt-3" scope="col">{{ cartItem.price }}</th>
      <th class="pt-3" scope="col">{{cartItem.quantity*cartItem.price}}</th>
      </tr>`
})

