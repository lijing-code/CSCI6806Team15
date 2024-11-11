<template>
  <div class="div_class">
    <h3>You will be redirected to payment page</h3>

    <div class="alert alert-primary" role="alert">
      While making payment use card number 4242 4242 4242 4242 and enter random
      cvv(3 digit)
    </div>

    <button class="checkout_button" id="proceed-to-checkout" @click="goToCheckout()">
      Make payment
    </button>
  </div>
</template>
<script>

import axios from 'axios';//jiaru
import {loadStripe} from "@stripe/stripe-js"; // 导入 Axios，用于 HTTP 请求 AT
export default {
  data() {
    return {
      stripeAPIToken: 'pk_test_51Q4X7GRp4GPDgUggxaGdEI2Vp1a0DlzWnkjQmDkTVBeHkF0d54OjFCyj8F7zKPil6jnOVplXM77XpYP0Z2pp3Apu00QnMA9GnQ',
      baseURL: 'http://localhost:8080/',
      stripe: '',
      token: null,
      sessionId: null,
      checkoutBodyArray: [],
    };
  },

  name: 'Checkout',
  props: ['baseURL'],
  methods: {
    configureStripe() { },

    getAllItems() {
      axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
        (response) => {
          if (response.status === 200) {
            let products = response.data;
            let len = Object.keys(products.cartItems).length;
            for (let i = 0; i < len; i++)
              this.checkoutBodyArray.push({
                imageUrl: products.cartItems[i].product.imageURL,
                productName: products.cartItems[i].product.name,
                quantity: products.cartItems[i].quantity,
                price: products.cartItems[i].product.price,
                productId: products.cartItems[i].product.id,
                userId: products.cartItems[i].userId,
              });
          }
          console.log(this.checkoutBodyArray); // 输出数据到控制台AT20241231
        },
        (err) => {
          console.log(err);
        }
      );
    },

    goToCheckout() {
      console.log('Preparing checkout with data:', this.checkoutBodyArray);//AT 20241101
      axios
        .post(
          this.baseURL + 'order/checkout-session',
          this.checkoutBodyArray
        )
        .then((response) => {
          console.log(response.data); // 检查 response 中的数据AT20241101
          this.sessionId = response.data.sessionId;//AT 20241101
         //localStorage.setItem('sessionId', response.data.sessionId);AT20241101
          //return response.data;
          return response.data.sessionId; // 直接返回 sessionId AT20241101

        })
        .then((sessionId) => {
          console.log('Redirecting to checkout with sessionId:', sessionId);
          return this.stripe.redirectToCheckout({
            sessionId: sessionId,
          });
        })
    .catch((error) => {
        console.error('Checkout redirection error:', error);
      });
    },
  },
  async mounted() {

    this.token = localStorage.getItem('token');

   // this.stripe = Stripe(this.stripeAPIToken);AT20241031
    this.stripe = await loadStripe(this.stripeAPIToken);
    console.log(this.stripe);//AT 20241101
    this.getAllItems();
  },
};
</script>

<style>
.alert {
  width: 50%;
}

.div_class {
  margin-top: 5%;
  margin-left: 30%;
}

.checkout_button {
  background-color: #5d3dec;
  border: none;
  color: white;
  margin-left: 15%;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
}

.checkout_button:focus {
  outline: none;
  box-shadow: none;
}

.checkout_button:disabled {
  background-color: #9b86f7;
  border: none;
  color: white;
  margin-left: 15%;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
  cursor: not-allowed;
}
</style>
