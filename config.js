//https://mumbai.polygonscan.com/address/0xacb330d1959a80daaa02cd3c1ffecaacca6c40b1 查看合约情况
    export const chainId_mumbai = "80001"
    export const contractAddress_local = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    export const contractAddress_mumbai = "0x1E92f5d51ce89566A858962F544C9D35835E9075"
    export const ownerAddress_mumbai = "0xAcb330d1959A80daaA02cd3C1FFecaaCca6C40B1"
    export const abi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "wifi",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "name": "Download_Wifiprint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "shares",
            "type": "uint256"
          }
        ],
        "name": "PayeeAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "PaymentReceived",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "PaymentReleased",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "name": "create_user",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "downloadReceived",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "a",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "b",
            "type": "uint256"
          }
        ],
        "name": "show_price",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "name": "upload_wifiprint",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "name": "Download_Wifiprint2",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "Price",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "WifiPrint",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "Shop",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "uploader",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct WifiPrintPack.WifiPack[]",
            "name": "wifipack",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_wifiprint",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "shop",
            "type": "address"
          }
        ],
        "name": "Upload_Wifiprint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "is_shop",
            "type": "bool"
          }
        ],
        "name": "createUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getVaultBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "bal",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
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
        "name": "payees",
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
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "released",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "shares",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ab",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "c",
            "type": "string"
          }
        ],
        "name": "test",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalReleased",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalShares",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ]