import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      exchangeData: {},
      selectedRate: {},
      amount: null,
      answer: null,
      direction: null,
      currency: null,
      desiredRate: null
    },
    mounted: function () {
      this.getRates()
    },
    methods: {
      getRates: function(){
        fetch("https://api.exchangeratesapi.io/latest")
        .then(resource => resource.json())
        .then(rates => this.exchangeData = rates)
      },
      calculateNewAmount: function() {
        // console.log("thing works");
        if (this.direction === "fromEuros"){
          const total = this.selectedRate.rate * this.amount
          this.answer = Math.round(total * 100) / 100
        } else {
          const total = this.amount / this.selectedRate.rate
          this.answer = total.toFixed(2)
        }
      },
      getCurrency: function() {
        this.currency = this.selectedRate.currency
      },
      convert: function() {
        const total = this.amount / this.selectedRate.rate
        // this.answer = Math.round(total * 100) / 100
        const result = this.desiredRate.rate * total
        // this.answer = Math.round(result * 100) / 100
        this.answer = result.toFixed(2)

      }
    }
  });
});
