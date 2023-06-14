//https://mumbai.polygonscan.com/address/0xacb330d1959a80daaa02cd3c1ffecaacca6c40b1 查看合约情况
    export const chainId_mumbai = "80001"
    export const contractAddress_local = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    export const contractAddress_mumbai = "0xF25DB8FD594760D2F24E8cf2Cea774016045eC05"
    export const ownerAddress_mumbai = "0x0760C505878A6A605d5A499B328b4db7Dc89Ed00"
    export const abi =  [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "downloader",
            "type": "address"
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
            "indexed": false,
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "name": "sendMessage",
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
          },
          {
            "internalType": "string",
            "name": "publickey_downloader",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "information_downloader",
            "type": "string"
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
            "name": "province",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "district",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "shop_information",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "uploader",
            "type": "address"
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
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "WifiPrint",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "shop_information",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "key",
                "type": "string"
              }
            ],
            "internalType": "struct wifishare.wifiInfo[]",
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
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "WifiPrint",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "shop_information",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "key",
                "type": "string"
              }
            ],
            "internalType": "struct wifishare.wifiInfo[]",
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
                "internalType": "string",
                "name": "shop_information",
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
            "internalType": "struct wifishare.WifiPack[]",
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
        "inputs": [
          {
            "internalType": "address",
            "name": "up",
            "type": "address"
          }
        ],
        "name": "uploader_confirm",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "wifiid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "downloader_information",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "downloader_pubilickey",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isRead",
                "type": "bool"
              }
            ],
            "internalType": "struct wifishare.message_foruploader[]",
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
            "name": "PDkey",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "WIfiId",
            "type": "uint256"
          }
        ],
        "name": "uploader_sendPDkey",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ]
