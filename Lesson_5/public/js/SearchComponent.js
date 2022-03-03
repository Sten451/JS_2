Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },

template:
   `
<form action="#" class = "d-flex ms-3" >
    <input class = "form-control me-2" v-model="userSearch" type = "search" placeholder = "Search"
aria-label = "Search">
    <button @click='$parent.$refs.products.filter(userSearch)' class = "btn btn-info"
type = "submit"> Search </button>
</form>`
})


