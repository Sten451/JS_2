const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isNotVisibleCart: true,
        userSearch: '',
    },
    methods: {

         receiveClass(data){
            this.isNotVisibleCart = !data

        },

        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {

                })
        },

        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {

                })
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {

                })
        },

    },
    mounted() {

    }
})
