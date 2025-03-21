const contractAddress = "0x05B9A7D8a48e975168EE634B65EBc6bF3d3aC354";
const contractABI = [ 
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "PhotoMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "PhotoTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "approvals",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getCreator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getPhotoDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			}
		],
		"name": "mintPhoto",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "photos",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transferPhoto",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}

    
];

let web3;
let contract;

window.onload = async function () {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask to interact with the contract.");
    }
};

async function mintPhoto() {
    const accounts = await web3.eth.getAccounts();
    const photoUrl = document.getElementById("photoUrl").value;

    if (!photoUrl) {
        alert("Enter a valid Photo URL!");
        return;
    }

    await contract.methods.mintPhoto(photoUrl).send({ from: accounts[0] });
    alert("NFT Minted Successfully!");
}

async function transferPhoto() {
    const accounts = await web3.eth.getAccounts();
    const tokenId = document.getElementById("tokenId").value;
    const recipient = document.getElementById("recipient").value;

    if (!tokenId || !recipient) {
        alert("Enter valid details!");
        return;
    }

    await contract.methods.transferPhoto(recipient, tokenId).send({ from: accounts[0] });
    alert("NFT Transferred Successfully!");
}

async function getPhotoDetails() {
    const tokenId = document.getElementById("queryTokenId").value;

    if (!tokenId) {
        alert("Enter a valid Token ID!");
        return;
    }

    const details = await contract.methods.getPhotoDetails(tokenId).call();
    document.getElementById("photoDetails").innerHTML = `
        <p><strong>Image URL:</strong> ${details[0]}</p>
        <p><strong>Creator:</strong> ${details[1]}</p>
        <p><strong>Owner:</strong> ${details[2]}</p>
    `;
}
