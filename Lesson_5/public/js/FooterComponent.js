Vue.component('comp_footer', {
    data() {
        return {
            AllProduct:[]
        }
    },
    methods: {
        calc(){
            all = 0
            this.AllProduct.forEach((value => (all += value.price)))
            return all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    },

    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.AllProduct.push(item);
                }
            });
    },

template:
    `
<nav class="navbar fixed-bottom navbar-light bg-light">
    <div class="container-fluid">
    <p class="footer">Всего в магазине: <b>{{ AllProduct.length }}</b> вида товара на общую сумму <b>{{ calc() }}</b> рублей.</p>
    </div>
</nav>`
})


