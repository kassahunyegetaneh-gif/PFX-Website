const CONTRACT_ADDRESS = "0xB8F48a2B584C0fb27c920C46e0d1E168D70eeeDE";
const TOKEN_SYMBOL = "PFX";
const TOKEN_DECIMALS = 18;
const TOKEN_NAME = "Phila Forex Trading";

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
menuBtn.addEventListener("click", () => {
nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
link.addEventListener("click", () => {
nav.classList.remove("open");
});
});
}

// Copy contract address
const copyAddress = document.getElementById("copyAddress");
const contractAddress = document.getElementById("contractAddress");

if (copyAddress && contractAddress) {
copyAddress.addEventListener("click", async () => {
try {
await navigator.clipboard.writeText(
contractAddress.textContent.trim()
);

```
  copyAddress.textContent = "Copied! ✓";

  setTimeout(() => {
    copyAddress.textContent = "Copy";
  }, 2000);

} catch (error) {
  alert("Could not copy the contract address.");
}
```

});
}

// Add PFX to MetaMask
async function addPFXToMetaMask() {
if (typeof window.ethereum === "undefined") {
alert("MetaMask is not installed.");
return;
}

try {
const wasAdded = await window.ethereum.request({
method: "wallet_watchAsset",
params: {
type: "ERC20",
options: {
address: CONTRACT_ADDRESS,
symbol: TOKEN_SYMBOL,
decimals: TOKEN_DECIMALS,
image: new URL("logo.png", window.location.href).href
}
}
});

```
const message = document.getElementById("walletMessage");

if (message) {
  message.textContent = wasAdded
    ? "PFX was added to MetaMask successfully! 🦊"
    : "PFX was not added.";
}
```

} catch (error) {
console.error("MetaMask error:", error);

```
const message = document.getElementById("walletMessage");

if (message) {
  message.textContent = "MetaMask request was cancelled or failed.";
}
```

}
}

// First MetaMask button
const addToken = document.getElementById("addToken");

if (addToken) {
addToken.addEventListener("click", addPFXToMetaMask);
}

// Second MetaMask button
const addToken2 = document.getElementById("addToken2");

if (addToken2) {
addToken2.addEventListener("click", addPFXToMetaMask);
}

console.log("PFX website loaded successfully.");
console.log("PFX Contract:", CONTRACT_ADDRESS);
