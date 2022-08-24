const vm = Vue.createApp({
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    nextStep(event) {
        if(event) {
            console.log(event);
        }
        this.step++;
    },
    log(msg, event) {
         console.log(msg);
         if(event) {
            console.log(event);
         }
    }
  }    

}).mount("#app");
