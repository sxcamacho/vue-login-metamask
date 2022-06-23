const devices = [/Android/i, /webOS/i, /iPhone/i, /iPad/i];

export default {
  data() {
    return {
      hasBrave: false,
      hasMetaMask: false
    };
  },
  computed: {
    isMobileDevice() {
      return devices.some(device => {
        return navigator.userAgent.match(device);
      });
    },
    isBrave() {
      return this.hasBrave;
    },
    isMetamask() {
      return this.isMobileDevice && this.hasMetaMask;
    },
    isChrome() {
      return (
        ["chrome", "crios"].some(el =>
          navigator.userAgent.toLowerCase().includes(el)
        ) &&
        !this.isBrave &&
        !this.isOpera &&
        !this.isMetamask
      );
    },
    isSafari() {
      return /^((?!chrome|android|crios|fxios).)*safari/i.test(
        navigator.userAgent
      );
    },
    isFirefox() {
      return ["firefox", "fxios"].some(el =>
        navigator.userAgent.toLowerCase().includes(el)
      );
    },
    isOpera() {
      return (
        navigator.userAgent.toLowerCase().includes("opera") ||
        navigator.userAgent.toLowerCase().includes("opr/") ||
        navigator.userAgent.includes("opt/")
      );
    },
    isEdge() {
      return /edge/i.test(navigator.userAgent);
    },
    browserName() {
      if (this.isOpera) {
        return "Opera";
      } else if (this.isChrome) {
        return "Google Chrome";
      } else if (this.isBrave) {
        // we must to check isBrave before isSafari
        // because of userAgent conflicts
        return "Brave";
      } else if (this.isSafari) {
        return "Safari";
      } else if (this.isFirefox) {
        return "Firefox";
      } else if (this.isEdge) {
        return "Edge";
      } else if (this.isMetamask) {
        return "Metamask";
      } else {
        return null;
      }
    }
  },
  methods: {
    checkMetamask() {
      if (window.ethereum) {
        this.handleEthereum();
      } else {
        window.addEventListener("ethereum#initialized", this.handleEthereum, {
          once: true
        });
        setTimeout(this.handleEthereum, 3000);
      }
    },
    handleEthereum() {
      const { ethereum } = window;
      this.hasMetaMask = ethereum && ethereum.isMetaMask;
      alert("entro a handleEthereum: " + this.hasMetaMask)
    },
    async checkBrave() {
      this.hasBrave =
        (navigator.brave && (await navigator.brave.isBrave())) || false;
    }
  },
  async mounted() {
    this.checkMetamask();
    await this.checkBrave();
  }
};
