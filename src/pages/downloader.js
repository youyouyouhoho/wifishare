import styles from "../styles/home.module.css";
import { useMoralis } from "react-moralis";
import { useEffect, useState, useRef } from "react"
import { useNotification } from "@web3uikit/core"
import { ethers } from "ethers"
import { abi, contractAddress_local, contractAddress_mumbai } from "config"
import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import NodeRSA from 'node-rsa';
import sjcl from 'sjcl';
function downloader() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const dispatch = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading_jiemi, setisLoading_jiemi] = useState(false);
  const [decrypted, setdecrypted] = useState('');
  const [decrypted2, setdecrypted2] = useState('');
  const [private_key, setprivate_key] = useState('');
  const [loc_sheng, setloc_sheng] = useState('');
  const [loc_shi, setloc_shi] = useState('');
  const [loc_qu, setloc_qu] = useState('');
  const [time_download, settime_download] = useState('');
  const [isLoading_paying, setisLoading_paying] = useState(false);
  const [requestID, setrequestID] = useState('');
  const [price_download, setprice_download] = useState('');
  const [downloader_info, setdownloader_info] = useState('');
  const [downloder_publickey, setdownloder_publickey] = useState('');
  const [downloader_addr, setdownloader_addr] = useState('');
  const [event_downloadAddr_Data, setEvent_downloadAddr_Data] = useState([]);
  const [isLoading_showdown, setisLoading_showdown] = useState(false);
  const [isLoading_request, setisLoading_request] = useState(false);
  const [isLoading_generatekey, setisLoading_generatekey] = useState(false);
  const [isLoading_jiemiwifi, setisLoading_jiemiwifi] = useState(false);
  const [downloader_gpbkey, setdownloader_gpbkey] = useState('');
  const [downloder_gskey, setdownloder_gskey] = useState('');


  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    })
  }
  const handleprivate_key = (event) => {
    const value = event.target.value;
    setprivate_key(value);
  };
  const handledownloader_gpbkey = (event) => {
    const value = event.target.value;
    setdownloader_gpbkey(value);
  };

  const handledownloder_gskey = (event) => {
    const value = event.target.value;
    setdownloder_gskey(value);
  };
  const handledownloader_addr = (event) => {
    const value = event.target.value;
    setdownloader_addr(value);
  };

  const handledownloader_info = (event) => {
    const value = event.target.value;
    setdownloader_info(value);
  };

  const handledownloder_publickey = (event) => {
    const value = event.target.value;
    setdownloder_publickey(value);
  };


  const handleloc_sheng = (event) => {
    const value = event.target.value;
    setloc_sheng(value);
  };

  const handleloc_shi = (event) => {
    const value = event.target.value;
    setloc_shi(value);
  };

  const handleloc_qu = (event) => {
    const value = event.target.value;
    setloc_qu(value);
  };

  const handletime_download = (event) => {
    const value = event.target.value;
    settime_download(value);
  };

  const handleprice_download = (event) => {
    const value = event.target.value;
    setprice_download(value);
  };

  const handlerequestID = (event) => {
    const value = event.target.value;
    setrequestID(value);
  };

  const handlewifiprice = () => {
    dispatch({
      type: "info",
      message: "wifi price cannot < 0",
      title: "wifi price Notification",
      position: "topR",
      icon: "bell",
    })
  }

  return (
    <div className={styles.container}>
      {isWeb3Enabled ? (
        <div >
          <input type="text" value={loc_sheng} onChange={handleloc_sheng} placeholder="省" />
          <input type="text" value={loc_shi} onChange={handleloc_shi} placeholder="市" />
          <input type="text" value={loc_qu} onChange={handleloc_qu} placeholder="区" />
          <input type="number" value={time_download} onChange={handletime_download} placeholder="time for download" />
          <hr></hr>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () => {
              setisLoading_request(true)
              try {
                if (loc_qu != "" && loc_sheng != "" && loc_shi != "") {

                  const provider = new ethers.providers.Web3Provider(window.ethereum)
                  const signer = provider.getSigner()
                  const contract = new ethers.Contract(contractAddress_mumbai, abi, signer)
                  try {
                    let location = loc_sheng + loc_shi + loc_qu;
                    console.log(location)
                    const val = await contract.request_wifiDownload(location, time_download)
                    const results = await val.wait()
                    //等待event
                    const events = results.events
                    console.log('events: ', events)
                    const sender = events[0].args[0];
                    const rid = events[0].args[1];
                    const all_price = events[0].args[2];
                    const count = events[0].args[3];

                    setrequestID(rid);
                    setprice_download(all_price);
                    setisLoading_request(false)
                  }
                  catch (err) {
                    setisLoading_request(false)
                  }
                }
                if (loc_qu == "" && loc_sheng != "" && loc_shi != "") {
                  const provider = new ethers.providers.Web3Provider(window.ethereum)
                  const signer = provider.getSigner()
                  const contract = new ethers.Contract(contractAddress_mumbai, abi, signer)
                  try {
                    let location = loc_sheng + loc_shi + "No";
                    const val = await contract.request_wifiDownload(location, time_download)
                    const results = await val.wait()
                    //等待event
                    const events = results.events
                    console.log('events: ', events)
                    const sender = events[0].args[0];
                    const rid = events[0].args[1];
                    const all_price = events[0].args[2];
                    const count = events[0].args[3];

                    setrequestID(rid);
                    setprice_download(all_price);
                    setisLoading_request(false)

                  }
                  catch (err) {
                    setisLoading_request(false)
                  }
                }
                if (loc_shi == "" && loc_qu == "" && loc_sheng != "") {
                  const provider = new ethers.providers.Web3Provider(window.ethereum)
                  const signer = provider.getSigner()
                  const contract = new ethers.Contract(contractAddress_mumbai, abi, signer)
                  try {
                    let location = loc_sheng + "NoNo";
                    const val = await contract.request_wifiDownload(location, time_download)
                    const results = await val.wait()
                    //等待event
                    const events = results.events
                    console.log('events: ', events)
                    const sender = events[0].args[0];
                    const rid = events[0].args[1];
                    const all_price = events[0].args[2];
                    const count = events[0].args[3];

                    setrequestID(rid);
                    setprice_download(all_price);
                    setisLoading_request(false)
                  }
                  catch (err) {
                    setisLoading_request(false)
                  }
                }
                else {
                  setisLoading_request(false)

                }
              } catch (error) {
                console.error(error);
              }
            }} disabled={isLoading_request}>
            {isLoading_request ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              " "
            )}Request for Wifi</button>
          <hr></hr>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={() => {
              setisLoading_generatekey(true)
              // // 创建 RSA 密钥对
              const key = new NodeRSA({ b: 2048 });

              // 获取公钥和私钥
              const publicKey = key.exportKey('public');
              const privateKey = key.exportKey('private');
              setdownloader_gpbkey(publicKey);
              setdownloder_publickey(publicKey);
              setdownloder_gskey(privateKey);
              console.log('publicKey', publicKey)
              console.log('privateKey', privateKey)
              setisLoading_generatekey(false)
              // // 要加密的数据
              // const data = 'Hello, world!';

              // // 使用公钥加密数据
              // const encryptedData = key.encrypt(data, 'base64');
              // console.log('Encrypted Data:', encryptedData);

              // // 使用私钥解密数据
              // const decryptedData = key.decrypt(encryptedData, 'utf8');
              // console.log('Decrypted Data:', decryptedData);


            }} disabled={isLoading_generatekey}>生成密钥</button>
          <hr></hr>
          <div>
            <input type="text" value={downloader_gpbkey} onChange={handledownloader_gpbkey} placeholder="Public key" />
            <input type="text" value={downloder_gskey} onChange={handledownloder_gskey} placeholder="privateKey" />
          </div>
          <div>
            <input type="number" value={requestID} onChange={handlerequestID} placeholder="RequestId" />
            <input type="number" value={price_download} onChange={handleprice_download} placeholder="Price to pay" />
            <input type="text" value={downloader_info} onChange={handledownloader_info} placeholder="downloader information" />
            <input type="text" value={downloder_publickey} onChange={handledownloder_publickey} placeholder="Publickey" />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () => {
              setisLoading_paying(true);
              const provider2 = new ethers.providers.Web3Provider(window.ethereum)
              const signer2 = provider2.getSigner()
              const contract2 = new ethers.Contract(contractAddress_mumbai, abi, signer2)
              try {
                const val = await contract2.PayDownload_byRequestId(requestID, downloader_info, downloder_publickey, { value: price_download })
                const results = await val.wait()
                try {
                  const events = results.events
                  console.log('events: ', events)

                  for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    if (event.event == "sendMessage") {

                      // 提取参数
                      const requestId = event.args[0];
                      const timestamp = event.args[1];

                      console.log("requestId:", requestId);
                      console.log("timestamp:", timestamp);


                    }
                  }

                  setisLoading_paying(false);

                }
                catch (err) {
                  console.log(err)
                  setisLoading_paying(false);
                }
                handleNewNotification()
              } catch (err) {
                console.log(err)
                setisLoading_paying(false);
              }


            }} disabled={isLoading_paying}
          >
            {isLoading_paying ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              " "
            )}
            pay for download
          </button>
          <hr></hr>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () => {
              setisLoading_showdown(true);
              const provider2 = new ethers.providers.Web3Provider(window.ethereum)
              const signer2 = provider2.getSigner()
              const contract2 = new ethers.Contract(contractAddress_mumbai, abi, signer2)
              try {
                let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                const val = await contract2.fetch_wifi_byDownloaderAddr(accounts[0])
                for (let i = 0; i < val.length; i++) {

                  let id = val[i].id
                  let Price = val[i].Price
                  let timestamp = val[i].timestamp
                  let WifiPrint = val[i].WifiPrint
                  let shop_information = val[i].shop_information
                  let key = val[i].key

                  const newEvent = { id, Price, timestamp, WifiPrint, shop_information, key };
                  setEvent_downloadAddr_Data((prevData) => [...prevData, newEvent])
                }

                handleNewNotification()
                setisLoading_showdown(false);
              } catch (err) {
                console.log(err)
                setisLoading_showdown(false);
              }


            }} disabled={isLoading_showdown}
          >
            {isLoading_showdown ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              " "
            )}
            show wifi by downloaderAddress
          </button>
          <div>
            {event_downloadAddr_Data.map((event, index) => (
              <div key={index}>
                <ul>
                  <li><strong>Wifi_id: </strong>{event.id.toString()}</li>
                  <li><strong>wifi_Price: </strong>{event.Price.toString()}</li>
                  <li><strong>timestamp: </strong>{event.timestamp.toString()}</li>
                  <li><strong>WifiPrint: </strong>{event.WifiPrint.toString()}</li>
                  <li><strong>shop_information: </strong>{event.shop_information.toString()}</li>
                  <li><strong>jiamide key: </strong>{event.key.toString()}</li>
                </ul>
                <hr></hr>
                <input type="text" value={private_key} onChange={handleprivate_key} placeholder="Input your private key" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                  onClick={async () => {
                    setisLoading_jiemi(true)
                    let priKey = new NodeRSA(private_key, 'pkcs1-private');
                    setdecrypted(priKey.decrypt(event.key, 'utf8'));
                    setisLoading_jiemi(false)
                    var hash = sjcl.hash.sha256.hash("yzq030212" + event.timestamp.toString());
                    let res = sjcl.codec.hex.fromBits(hash)
                    console.log(res)
                  }} disabled={isLoading_jiemi}>将对称密钥解密</button>
                <hr></hr>
                <li><strong>jiemide key: </strong>{decrypted}</li>
                <hr></hr>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                  onClick={async () => {
                    setisLoading_jiemiwifi(true)
                    const truncatedStr = decrypted.toString().slice(0, 16);
                    const keyBuffer = Buffer.from(truncatedStr, 'utf8');
                    
                    const ivBuffer = Buffer.from(truncatedStr, 'utf8');

                    const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, ivBuffer);
                    let decrypted3 = decipher.update(event.WifiPrint, 'base64', 'utf8');
                    decrypted3 += decipher.final('utf8');
                    setdecrypted2(decrypted3)
                    
                    setisLoading_jiemiwifi(false)
                  }} disabled={isLoading_jiemiwifi}>将wifi解密</button>
                <hr></hr>
                <li><strong>jiemide wifi: </strong>{decrypted2}</li>
              </div>

            ))

            }
            {event_downloadAddr_Data.length > 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                onClick={() => setEvent_downloadAddr_Data([])}
              >
                清空
              </button>
            )}
          </div>

        </div>

      ) : (
        <div>Please connect to a Wallet</div>
      )}
    </div>

  );

}
export default downloader