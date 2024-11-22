<template>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center" style="margin-bottom: 80px;">
  
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="Request a test drive" name="one">
              <h2>Request a test drive</h2>
              <el-form ref="form" :model="form" label-width="180px" style="width: 500px;">
                <el-form-item label="Name：">
                  <el-input v-model="form.name" placeholder="Please enter your name"></el-input>
                </el-form-item>
                <el-form-item label="Phone：">
                  <el-input v-model="form.phone" placeholder="Please enter your phone number"></el-input>
                </el-form-item>
                <el-form-item label="Email：">
                  <el-input v-model="form.to" placeholder="Please enter your email address"></el-input>
                </el-form-item>
                <el-form-item label="Date：">
                  <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    placeholder="Please select a time"
                    >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="Note：">
                  <el-input v-model="form.text" type="textarea" placeholder="Please enter the content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="changeBtn()" style="width: 100%;">Submit</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="Maintenance Schedule" name="two">
              <h2>Maintenance Schedule</h2>
              <el-form ref="form2" :model="form" label-width="180px" style="width: 500px;">
                <el-form-item label="Name：">
                  <el-input v-model="form2.name" placeholder="Please enter your name"></el-input>
                </el-form-item>
                <el-form-item label="Phone：">
                  <el-input v-model="form2.phone" placeholder="Please enter your phone number"></el-input>
                </el-form-item>
                <el-form-item label="Email：">
                  <el-input v-model="form2.to" placeholder="Please enter your email address"></el-input>
                </el-form-item>
                <el-form-item label="Date：">
                  <el-date-picker
                    v-model="form2.time"
                    type="datetime"
                    placeholder="Please select a time"
                    >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="Note：">
                  <el-input v-model="form2.text" type="textarea" placeholder="Please enter the content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="changeBtn2()" style="width: 100%;">Submit</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import { ElDatePicker,ElMessage } from 'element-plus';
  export default {
    components: {
      ElDatePicker
    },
    data() {
      return {
        activeName:'one',
        form:{
          to:'',
          subject:'You have an appointment for a test drive message',
          text:'',
          time:'',
          name:'',
          phone: ''
        },
        form2:{
          to:'',
          subject:'You have an appointment for maintenance information',
          text:'',
          time:'',
          name:'',
          phone: ''
        },
        cartItems: [],
        token: null,
        totalcost: 0,
      };
    },
    name: 'Cart',
    props: ['baseURL'],
    methods: {
      handleClick (tab, event){
        // this.activeName = tab
        // console.log(tab, event)
      },
      changeBtn(){
        const {to,subject,text,time,name,phone} = this.form
        const cloneTime = `Name：${name}<br/>${text}<br/>Phone：${phone}<br/>The appointment time is：${this.timeChange(time)}`
  
        axios.get(`${this.baseURL}sendmail/sendTextMail?to=${to}&subject=${subject}&text=${cloneTime}`).then(
          (response) => {
            ElMessage.success(response.data)
          },
          (error) => {
            console.log(error);
          }
        );
      },
      changeBtn2(){
        const {to,subject,text,time,name,phone} = this.form2
        const cloneTime = `Name：${name}<br/>${text}<br/>Phone：${phone}<br/>The appointment time is：${this.timeChange(time)}`
    
        axios.get(`${this.baseURL}sendmail/sendTextMail?to=${to}&subject=${subject}&text=${cloneTime}`).then(
          (response) => {
            ElMessage.success(response.data)
          },
          (error) => {
            console.log(error);
          }
        );
      },
      timeChange(val){
        const date = new Date(val);
        // 提取年、月、日、时、分、秒
        const year = date.getFullYear(); // 2024
        const month = date.getMonth() + 1; // 10（月份从0开始，所以加1）
        const day = date.getDate(); // 18
        return `${year}年${month}月${day}日`
      },
      isDisabled() {
        if (this.cartItems.length === 0) {
          return true;
        }
        return false;
      },
      listCartItems() {
        axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
          (response) => {
            if (response.status == 200) {
              const result = response.data;
              this.cartItems = result.cartItems;
              this.totalcost = result.totalCost;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // go to checkout page
      checkout() {
        this.$router.push({ name: 'Checkout' });
      },
      deleteItem(itemId) {
        axios
          .delete(`${this.baseURL}cart/delete/${itemId}?token=${this.token} `) //delete / before ?token
          .then(
            (response) => {
              if (response.status == 200) {
                //this.$router.go(0);delete this, change to the next two rows
                this.cartItems = this.cartItems.filter(item => item.id !== itemId);
                this.totalcost = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
              }
              this.$emit('fetchData');
            },
            (error) => {
              console.log(error);
            }
          );
      },
      showDetails(productId) {
        this.$router.push({
          name: 'ShowDetails',
          params: { id: productId },
        });
      },
    },
    mounted() {
      this.token = localStorage.getItem('token');
      this.listCartItems();
    },
  };
  </script>
  
  <style scoped>
  
  </style>