//https://mumbai.polygonscan.com/address/0xacb330d1959a80daaa02cd3c1ffecaacca6c40b1 查看合约情况
    export const chainId_mumbai = "80001"
    export const contractAddress_local = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    export const contractAddress_mumbai = "0xAc84bE78D48D4c27C236FEbbc5795c709D32aA7F"
    export const ownerAddress_mumbai = "0xAcb330d1959A80daaA02cd3C1FFecaaCca6C40B1"
    export const abi =  [
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
            "internalType": "address",
            "name": "request_address",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "price_need",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "wifi_count",
            "type": "uint256"
          }
        ],
        "name": "requestAdd",
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
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          }
        ],
        "name": "PayDownload_byRequestId",
        "outputs": [],
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
            "internalType": "address",
            "name": "downloader",
            "type": "address"
          }
        ],
        "name": "fetch_wifi_byDownloaderAddr",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
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
            "internalType": "struct testwifidemo.WifiPack[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          }
        ],
        "name": "fetch_wifi_byRequestId",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
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
            "internalType": "struct testwifidemo.WifiPack[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "uploader",
            "type": "address"
          }
        ],
        "name": "fetch_wifi_byUploaderAddr",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
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
            "internalType": "struct testwifidemo.WifiPack[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
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
        "name": "request_wifiDownload",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ]
