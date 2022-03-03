Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'img/404.jpg'
        }
    },

    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },

    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },

    template: `
    <div v-if="filtered.length > 0">
        <div class="products">
            <product v-for="item of filtered" 
                :key="item.id_product" 
                :img= imgProduct
                :product="item"
                @add-product="$parent.$refs.cart.addProduct">
                
            </product>
        </div>        
    </div>
    <div v-else>
            <h4 class="text-center text-danger mt-3">Товаров с заданным критерием не найдено.</h4>
    </div>`
});

Vue.component('product', {
    props: ['product', 'img'],

    template: `
    
<div class = "card">
    <img :src= "img" class = "card-img-top">
    <div class = "card-body">
    <h5 class = "card-title">{{product.product_name}}</h5>
    <p class="card-text">Цена: <b>{{product.price}}</b> рублей.</p>
    <button class="btn btn-success" @click="$emit('add-product', product)">Купить</button>
    </div>
</div>
    `
})

