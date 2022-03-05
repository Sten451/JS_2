/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/CartComponent.js":
/*!************************************!*\
  !*** ./public/js/CartComponent.js ***!
  \************************************/
/***/ (() => {

eval("Vue.component('cart', {\n  props: ['visibility'],\n\n  data() {\n    return {\n      cartUrl: '/getBasket.json',\n      cartItems: []\n    };\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/cart`).then(data => {\n      const temp = [];\n\n      for (let item of data.contents) {\n        //Убираем дубликаты\n        if (!temp.includes(item.id_product)) {\n          this.$data.cartItems.push(item);\n          temp.push(item.id_product);\n        } //находим имеющийся элемент и его количество и прибавляем к нему количество нового элемента\n        // но сам элемент не добавляем\n        else {\n          let find_element = this.cartItems.find(el => el.id_product === item.id_product);\n          find_element.quantity += item.quantity;\n        }\n      }\n    });\n  },\n\n  methods: {\n    changeVisibility() {\n      this.$emit('change-visibility', this.visibility);\n    },\n\n    //чисто JS\n    showMessage(message) {\n      let element = document.createElement('div');\n      element.className = 'message';\n      element.innerHTML = `\n            <div class=\"modal\" tabindex=\"-1\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Системное уведомление</h5>\n                        </div>\n                    <div class=\"modal-body\"><p class=\"text-center\"><b>${message} </b>успешно добавлен в корзину</p>\n                </div>\n            <div class=\"modal-footer\"></div></div></div></div>`;\n      document.body.appendChild(element);\n      setTimeout(function () {\n        document.body.removeChild(element);\n      }, 1500);\n    },\n\n    //очистка корзины полностью с нулевого элемента\n    clearCart() {\n      this.cartItems.splice(0);\n    },\n\n    addNewItem(item) {\n      const prod = Object.assign({\n        quantity: 1\n      }, item);\n      this.$parent.postJson(`/api/cart`, prod).then(data => {\n        if (data.result === 1) {\n          this.cartItems.push(prod);\n        }\n      });\n    },\n\n    addQuantity(item) {\n      this.$parent.putJson(`/api/cart/${item.id_product}`, {\n        quantity: 1\n      }).then(data => {\n        if (data.result === 1) {\n          item.quantity++;\n        }\n      });\n    },\n\n    addProduct(item) {\n      this.showMessage(item.product_name); //корзина пуста?\n\n      if (this.cartItems.length === 0) {\n        this.addNewItem(item);\n      } else {\n        let find = this.cartItems.find(el => el.id_product === item.id_product);\n\n        if (find) {\n          this.$parent.putJson(`/api/cart/${find.id_product}`, {\n            quantity: 1\n          }).then(data => {\n            if (data.result === 1) {\n              find.quantity++;\n            }\n          });\n        } else {\n          this.addNewItem(item);\n        }\n      }\n    },\n\n    remove(item) {\n      this.$parent.getJson(`${API}/addToBasket.json`).then(data => {\n        if (data.result === 1) {\n          if (item.quantity > 1) {\n            item.quantity--;\n          } else {\n            this.cartItems.splice(this.cartItems.indexOf(item), 1);\n          }\n        }\n      });\n    },\n\n    PriceCart() {\n      price = 0;\n      this.cartItems.forEach(item => price += item.price * item.quantity);\n      return price.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, \" \");\n    }\n\n  },\n  template: `\n        <div class=\"modal_cart\" :class=\"{'hidden': visibility}\">\n            <div v-if=\"cartItems.length > 0\" class=\"modal\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\"><h4 class=\"modal-title\">Корзина</h4></div>\n                        <div class=\"modal-body\">\n                            <table class=\"table goods-item\">\n                                <thead>\n                                <tr class=\"ins2\">\n                                    <th scope=\"col\">#</th>\n                                    <th scope=\"col\">Title</th>\n                                    <th scope=\"col\">Количество</th>\n                                    <th scope=\"col\"></th>\n                                    <th scope=\"col\"></th>\n                                    <th scope=\"col\">Цена</th>\n                                    <th scope=\"col\">Итого</th>\n                                </tr>\n                                </thead>\n                                <tbody class=\"showcase_cart\">\n                                \n                                <cart-item v-for=\"item of cartItems\" :key=\"item.id_product\" :cart-item=\"item\" @addProduct=\"addQuantity\" @remove=\"remove\" :count=\"cartItems.indexOf(item)\">\n                                </cart-item>\n                                \n                                </tbody>\n                            </table>\n                        </div>\n                        <p class=\"ms-3\">Общая сумма товаров в корзине: <b> {{ PriceCart() }}</b> рублей.</p>\n                        <div class=\"modal-footer\">\n                            <button @click=\"clearCart()\" id=\"btn_clear\" type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">\n                                Очистить\n                            </button>\n                            <button @click=\"changeVisibility()\" type=\"button\" class=\"btn btn-secondary\"\n                                    data-bs-dismiss=\"modal\">\n                                Close\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div v-else class=\"modal\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h4 class=\"modal-title\">Корзина</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <h4>В корзине ничего нет</h4>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button @click=\"changeVisibility()\" type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    `\n});\nVue.component('cart-item', {\n  props: ['cartItem', 'count'],\n  template: `\n  <tr>\n      <th class=\"pt-3\" scope=\"col\">{{ count + 1 }}</th>\n      <th class=\"pt-3\" scope=\"col\">{{ cartItem.product_name }}</th>\n      <th class=\"pt-3 text-center\" scope=\"col\">{{ cartItem.quantity }}</th> \n      <th class=\"pt-2\" scope=\"col\">\n        <h3 @click=\"$emit('remove', cartItem)\" class=\"text-warning float ms-6\">       \n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-left-square-fill\" viewBox=\"0 0 16 16\">\n  <path d=\"M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z\"/>\n</svg></h3>\n      </th>\n      <th class=\"pt-2\" scope=\"col\"><h3 @click=\"$emit('addProduct', cartItem)\" class=\"text-success float\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-right-square-fill\" viewBox=\"0 0 16 16\">\n  <path d=\"M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z\"/>\n</svg>\n</h3></th>  \n      <th class=\"pt-3\" scope=\"col\">{{ cartItem.price }}</th>\n      <th class=\"pt-3\" scope=\"col\">{{cartItem.quantity*cartItem.price}}</th>\n      </tr>`\n});\n\n//# sourceURL=webpack://js_geekbrains/./public/js/CartComponent.js?");

/***/ }),

/***/ "./public/js/FooterComponent.js":
/*!**************************************!*\
  !*** ./public/js/FooterComponent.js ***!
  \**************************************/
/***/ (() => {

eval("Vue.component('comp_footer', {\n  data() {\n    return {\n      AllProduct: []\n    };\n  },\n\n  methods: {\n    calc() {\n      all = 0;\n      this.AllProduct.forEach(value => all += value.price);\n      return all.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, \" \");\n    }\n\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/products`).then(data => {\n      for (let item of data) {\n        this.$data.AllProduct.push(item);\n      }\n    });\n  },\n\n  template: `\n<nav class=\"navbar fixed-bottom navbar-light bg-light\">\n    <div class=\"container-fluid\">\n    <p class=\"footer\">Всего в магазине: <b>{{ AllProduct.length }}</b> вида товара на общую сумму <b>{{ calc() }}</b> рублей.</p>\n    </div>\n</nav>`\n});\n\n//# sourceURL=webpack://js_geekbrains/./public/js/FooterComponent.js?");

/***/ }),

/***/ "./public/js/ProductListComponent.js":
/*!*******************************************!*\
  !*** ./public/js/ProductListComponent.js ***!
  \*******************************************/
/***/ (() => {

eval("Vue.component('products', {\n  data() {\n    return {\n      catalogUrl: '/catalogData.json',\n      filtered: [],\n      products: [],\n      imgProduct: 'img/404.jpg'\n    };\n  },\n\n  methods: {\n    filter(userSearch) {\n      let regexp = new RegExp(userSearch, 'i');\n      this.filtered = this.products.filter(product => regexp.test(product.product_name));\n    }\n\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/products`).then(data => {\n      for (let item of data) {\n        this.$data.products.push(item);\n        this.$data.filtered.push(item);\n      }\n    });\n  },\n\n  template: `\n    <div v-if=\"filtered.length > 0\">\n        <div class=\"products\">\n            <product v-for=\"item of filtered\" \n                :key=\"item.id_product\" \n                :img= imgProduct\n                :product=\"item\"\n                @add-product=\"$parent.$refs.cart.addProduct\">\n                \n            </product>\n        </div>        \n    </div>\n    <div v-else>\n            <h4 class=\"text-center text-danger mt-3\">Товаров с заданным критерием не найдено.</h4>\n    </div>`\n});\nVue.component('product', {\n  props: ['product', 'img'],\n  template: `\n    \n<div class = \"card\">\n    <img :src= \"img\" class = \"card-img-top\">\n    <div class = \"card-body\">\n    <h5 class = \"card-title\">{{product.product_name}}</h5>\n    <p class=\"card-text\">Цена: <b>{{product.price}}</b> рублей.</p>\n    <button class=\"btn btn-success\" @click=\"$emit('add-product', product)\">Купить</button>\n    </div>\n</div>\n    `\n});\n\n//# sourceURL=webpack://js_geekbrains/./public/js/ProductListComponent.js?");

/***/ }),

/***/ "./public/js/SearchComponent.js":
/*!**************************************!*\
  !*** ./public/js/SearchComponent.js ***!
  \**************************************/
/***/ (() => {

eval("Vue.component('search', {\n  data() {\n    return {\n      userSearch: ''\n    };\n  },\n\n  template: `\n<form action=\"#\" class = \"d-flex ms-3\" >\n    <input class = \"form-control me-2\" v-model=\"userSearch\" type = \"search\" placeholder = \"Search\"\naria-label = \"Search\">\n    <button @click='$parent.$refs.products.filter(userSearch)' class = \"btn btn-info\"\ntype = \"submit\"> Search </button>\n</form>`\n});\n\n//# sourceURL=webpack://js_geekbrains/./public/js/SearchComponent.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\nconst app = new Vue({\n  el: '#app',\n  data: {\n    isNotVisibleCart: true,\n    userSearch: ''\n  },\n  methods: {\n    receiveClass(data) {\n      this.isNotVisibleCart = !data;\n    },\n\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => {});\n    },\n\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {});\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {});\n    }\n\n  },\n\n  mounted() {}\n\n});\n\n//# sourceURL=webpack://js_geekbrains/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/CartComponent.js"]();
/******/ 	__webpack_modules__["./public/js/FooterComponent.js"]();
/******/ 	__webpack_modules__["./public/js/ProductListComponent.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/SearchComponent.js"]();
/******/ 	
/******/ })()
;