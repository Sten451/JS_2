Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    methods: {
        changeclass() {
            this.$emit('changeclass', this.visibility)
        }
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
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody class="showcase_cart">
                                
                                <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
                                </cart-item>
                                
                                </tbody>
                            </table>
                        </div>
                        <p class="ms-3">Общая сумма товаров в корзине: <b>"пока не готово"</b> рублей.</p>
                        <div class="modal-footer">
                            <button id="btn_clear" type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                Очистить
                            </button>
                            <button @click="changeclass" type="button" class="btn btn-secondary"
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
                            <button @click="changeclass" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
  <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})