<script>
// import Web3 from "web3";
export default {
  data() {
    return {
      challenge: "123456",
      address: null,
    };
  },
  methods: {
    async doLogin() {
      if (window.ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.address = window.ethereum.selectedAddress;
      } else {
        alert("Provider is missing!");
      }
    },
    // async loadAccount() {
    //   if (window.ethereum && window.ethereum.selectedAddress) {
    //     this.address = window.ethereum.selectedAddress;
    //   }
    //   window.ethereum.on("accountsChanged", (accounts) => {
    //     this.address = accounts[0];
    //   });
    // },
    // async doSign() {
    //   const message = Web3.utils.toUtf8(
    //     `Welcome message: ${this.challenge}`
    //   );
    //   const request = {
    //     method: "personal_sign",
    //     params: [message, this.address],
    //   };
    //   const signature = await window.ethereum.request(request);
    //   console.log("**** signature", signature);
    // },
  },
  // async created() {
  //   await this.loadAccount();
  // },
};
</script>

<template>
  <div>
    <h1>{{ address || "UNKNOWN" }}</h1>
    <button @click="doLogin">LOGIN</button>
    <!-- <div>
      <input type="text" v-model="message" />
      <button @click="doSign">SIGN</button>
    </div> -->
  </div>
</template>
