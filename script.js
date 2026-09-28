const CONTRACT_ADDRESS = "0xB8F48a2B584C0fb27c920C46e0d1E168D70eeeDE";
const TOKEN_SYMBOL = "PFX";
const TOKEN_DECIMALS = 18;


const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
}

// Copy contract address
const copyButton = document.getElementById("copyAddress");
const addressElement = document.getElementById("contractAddress");

if (copyButton && addressElement) {
  copyButton.addEventListener("click", function () {
    const address = addressElement.textContent.trim();

    navigator.clipboard.writeText(address)
      .then(function () {
        copyButton.textContent = "Copied! ✓";

        setTimeout(function () {
          copyButton.textContent = "Copy";
        }, 2000);
      })
      .catch(function () {
        alert("Could not copy the address.");
      });
  });
}


async function addPFXToMetaMask() {
  if (!window.ethereum) {
    alert("MetaMask is not installed.");
    return;
  }

  try {
    const added = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: CONTRACT_ADDRESS,
          symbol: TOKEN_SYMBOL,
          decimals: TOKEN_DECIMALS
        }
      }
    });

    const message = document.getElementById("walletMessage");

    if (message) {
      message.textContent = added
        ? "PFX added to MetaMask successfully! 🦊"
        : "PFX was not added.";
    }

  } catch (error) {
    console.error("MetaMask error:", error);

    const message = document.getElementById("walletMessage");

    if (message) {
      message.textContent = "MetaMask request failed.";
    }
  }
}

// First button
const addToken = document.getElementById("addToken");

if (addToken) {
  addToken.addEventListener("click", addPFXToMetaMask);
}

// Second button
const addToken2 = document.getElementById("addToken2");

if (addToken2) {
  addToken2.addEventListener("click", addPFXToMetaMask);
}

console.log("PFX website loaded successfully.");
console.log("PFX contract:", CONTRACT_ADDRESS);
