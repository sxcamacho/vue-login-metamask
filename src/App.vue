<script>
import BrowserMixin from "./BrowserMixin";
export default {
  data() {
    return {
      challenge: "1234567",
      address: null,
    };
  },
  mixins: [BrowserMixin],
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
    doTestPopup() {
      alert("isMetamask: " + this.isMetamask);
      alert("hasMetamask: " + this.hasMetaMask);
      alert("window.ethereum: " + window.ethereum);
      alert("isMobileDevice: " + this.isMobileDevice);
    },
    doTest() {
      if (window.ethereum) {
        handleEthereum();
      } else {
        window.addEventListener("ethereum#initialized", handleEthereum, {
          once: true,
        });
        // If the event is not dispatched by the end of the timeout,
        // the user probably doesn't have MetaMask installed.
        setTimeout(handleEthereum, 3000); // 3 seconds
      }

      function handleEthereum() {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          alert("Ethereum successfully detected!");
          // Access the decentralized web!
        } else {
          alert("Please install MetaMask!");
        }
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
    <button @click="doTest">TEST</button>

    <a :href="url1" target="_blank" rel="noreferrer noopener"
      >test url dinamica</a
    >
    <button @click="doTestPopup">test popup</button>
    <!-- <div>
      <input type="text" v-model="message" />
      <button @click="doSign">SIGN</button>
    </div> -->
  </div>
</template>
