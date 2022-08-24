const vm = Vue.createApp({
  data() {
    return {
      isUnderlined: false,
      isBigFont: false,
      isRed: false,
      highlightClass: "under-line",
      errorClass: "red",
      theText : "",
    };
  },
  computed: {
    classes() {
      return {
        red: this.isRed,
        'under-line': this.isUnderlined,
        bigfont: this.isBigFont,
      };
    },
    isOk() {
        return this.theText === 'okay'; 
    } 
  },
}).mount("#app");
