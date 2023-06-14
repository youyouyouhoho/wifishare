import styles from "../styles/home.module.css";
import { useMoralis } from "react-moralis";
import { useEffect, useState, useRef } from "react"
import { useNotification } from "@web3uikit/core"
import { ethers } from "ethers"
import { abi, contractAddress_local, contractAddress_mumbai } from "config"
import crypto from "crypto";
import CryptoJS from 'crypto-js';
import sjcl from 'sjcl';
import NodeRSA from 'node-rsa';
import Header from "./header";
import { ConnectButton } from "@web3uikit/web3";
import { isAbsolute, relative } from "path";
import PleaseConnectWallet from "./connect";
import Link from "next/link";

// import { jswvalue } from "../../jsvalue";


function mouseOn(item) {
    item.style.backgroundColor = "#c6a199"
  }
  
function mouseOut(item) {
item.style.backgroundColor = "#f8cac0"
}
  

function Uploader() {
    const blankStyle = {
        width: 1200, height: 600,
    } 

    const backgroundStyle = {
        width: 1200, height: 500,
        backgroundColor: "#ebf6f4",
        margin: 10,
    }

    const wifibuttonStyle = {
        width: 300, height: 66,
        backgroundColor: "#f8cac0",
        justifyContent: "center", // 行居中
        alignItems: "center", // 列居中
        color:"#534d4c",
        fontSize: 30,
        display: "flex",
        position: "absolute",
        top: 266,
        left: 466
    }

    const requestStyle = {
        width: 300, height: 66,
        backgroundColor: "#f8cac0",
        justifyContent: "center", // 行居中
        alignItems: "center", // 列居中
        color:"#534d4c",
        fontSize: 30,
        display: "flex",
        position: "absolute",
        top: 366,
        left: 466
    }

    const showStyle = {
        width: 300, height: 88,
        backgroundColor: "#f8cac0",
        justifyContent: "center", // 行居中
        alignItems: "center", // 列居中
        color:"#534d4c",
        fontSize: 30,
        display: "flex",
        position: "absolute",
        top: 466,
        left: 466
    }

    // const buttonStyle = {
    //     width: 256, height: 66,
    //     display: "flex",
    //     justifyContent: "center", // 行居中
    //     alignItems: "center", // 列居中
    //     color:"#534d4c",
    //     fontSize: 30
    // }

    const downloaderButtonStyle = {
        width: 180, height: 66,
        display: "flex",
        justifyContent: "center", // 行居中
        alignItems: "center", // 列居中
        color:"#534d4c",
        fontSize: 25,
        backgroundColor: "#efe0d2",
        position: "absolute",
        top: 160,
        left: 1050
    }

    const { isWeb3Enabled, chainId } = useMoralis();
    const dispatch = useNotification()
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading_getuploaderMail, setisLoading_getuploaderMail] = useState(false);
    const [nestedJsonObjects, setNestedJsonObjects] = useState([]);
    const [event_requestId_Data, setEvent_requestId_Data] = useState([]);
    const [private_key, setprivate_key] = useState('');
    const [isLoading_showup, setisLoading_showup] = useState(false);
    const [isLoading_shenqing, setisLoading_shenqing] = useState(false);
    const [event_uploadAddr_Data, setEvent_uploadAddr_Data] = useState([]);

    const handleprivate_key = (event) => {
        const value = event.target.value;
        setprivate_key(value);
    };
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }
    <Header />
    const handleUpload = async (nestedJsonObject) => {
        setIsLoading(true);
        //与智能合约交互
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress_mumbai, abi, signer)
        let wifiprint = nestedJsonObject["wifi fingerprints"]
        let price = nestedJsonObject["price"]
        let province = nestedJsonObject["location"]["province"]
        let district = nestedJsonObject["location"]["district"]
        let city = nestedJsonObject["location"]["city"]
        let time = nestedJsonObject["timestamp"]
        let shop_indormation = nestedJsonObject["shop location information"]
        let shop_account = nestedJsonObject["shop account"]
        let upload_account = nestedJsonObject["upload account"]
        try {
            const val = await contract.Upload_Wifiprint(wifiprint,
                province,
                city,
                district,
                time,
                price,
                shop_indormation, upload_account,
                shop_account)
            const results = await val.wait()
            setIsLoading(false);
            setNestedJsonObjects(prevState => prevState.filter(obj => obj !== nestedJsonObject));
        }
        catch (err) {
            setIsLoading(false);
            console.log(err)
        }

    };

    const handleCancel = (index) => {
        // 从数组中移除目标对象
        setNestedJsonObjects(prevState => prevState.filter((_, idx) => idx !== index));
    };
    function encryptData(plaintext, keyString) {
        const key = CryptoJS.enc.Utf8.parse(keyString);

        const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();
    }
    return (
        <div className={styles.container}>
            {isWeb3Enabled ? (
                <div >
                <Header />

                <div id="downloader page button" style={downloaderButtonStyle} onMouseOver={async() =>{
                    var button = document.getElementById("downloader page button");
                    button.style.backgroundColor = "#d8cfc6";
    
                    button.onmouseout = function() {
                        this.style.backgroundColor = "#efe0d2";
                    }}}>
                    <Link href={"/downloader"}>downloader</Link>
                </div>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={() => {
                            // const key = CryptoJS.enc.Utf8.parse("0123456789abcdef");

                            // let decrypted_wifi = CryptoJS.AES.decrypt("CzoHNR12ncVAWzsFjmoXIA==", key, {
                            //     mode: CryptoJS.mode.ECB,
                            //     padding: CryptoJS.pad.Pkcs7
                            // });
                            // console.log(decrypted_wifi.toString())
                            var hash = sjcl.hash.sha256.hash("yzq030212" + "1686246350478");
                            let res = sjcl.codec.hex.fromBits(hash)
                            console.log(res)
                            const truncatedStr = res.toString().slice(0, 16);
                            const keyBuffer = Buffer.from(truncatedStr, 'utf8');
                            const ivBuffer = Buffer.from(truncatedStr, 'utf8');

                            const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, ivBuffer);
                            let decrypted = decipher.update("bcy/1tO96a+qakBWQdaxjqMo5DLaF6po34ARC8q+4pPQn3xshfxA/kU4FxPoO1dr6USbwkGuwTwcUIAXNBwptyjYyoqNccQEVesiDYHnqWVAE+W65fHLSwOeZnBoc9jMmojY7rcPXclqT0xDj7NAtyKAgcqwpU/CH+U0ybZ3Qszdn2oNmBNE6WQPBtVUVEcyg0opFDP+y97umEmh1WvWY/IX7IL7gQ74MJZ9NKR6j/eB71kx8crsNJ/oLFcoFQqMPLQuqASxQREiA9pB9mP80PpO1g05qcKwx2q7/XR/TWJxh2Z+DqsjSlQWI9qy3nDlb4C/NIWTUYa7Flrq4rLKY3T6uw2EQPo7EZP67u3kd+hWkYoTcVRnYkgM3dylh35reka5z7vNq4IipMM90mNxgzFWTF4IOpvuzX0W0JHaekjNwZGJwXvzEwMY7gjXDcS521UNFvDLMAiK5fI2f7XZ7lKTJEOUstjSimIL+LhtEgXTvylOzqXd8WR786A6zxhTgr6QqX4QGaSjYFW+kxIDERsUue4OlwgV4sbJBPE9RsuMMUHLsXAneYwv9aFYVp9q2pbilJByuh4VTYRQMOZKIeKj4KMA3+DQ9L3KT8Xb7ymMx/rp03FArBTJzIJmRWYgsWz8EVIEsf1rfECzdmB2FjvRPHVleXQvTaccx2ZEWOAfVVwfQEQ2rc1fLPwTR/2zrrCCCKUefI/RsSL3GlQItEBIElIhSKelREENFDx17m6WshydJuSRJj/ySiJRsAkGxRvehGKi7aWLm18gWLEmKtcRQKodW7JPsAcQeW/Mo1sOp6NaPzvRheE3JkbfgxYToPuO7u0fe43J1KJD8ZzygeFSaGwiYWfltKtlpyGlaDvSUqdx51I6p0k5uwpm126X==", 'base64', 'utf8');
                            decrypted += decipher.final('utf8');

                            console.log(decrypted)
                            // // // 创建 RSA 密钥对
                            // const key = new NodeRSA({ b: 2048 });

                            // // 获取公钥和私钥
                            // const publicKey = key.exportKey('public');
                            // const privateKey = key.exportKey('private');
                            // console.log('publicKey', publicKey)
                            // console.log('privateKey', privateKey)
                            // // 要加密的数据
                            // const data = 'Hello, world!';

                            // // 使用公钥加密数据
                            // const encryptedData = key.encrypt(data, 'base64');
                            // console.log('Encrypted Data:', encryptedData);

                            // // 使用私钥解密数据
                            // const decryptedData = key.decrypt(encryptedData, 'utf8');
                            // console.log('Decrypted Data:', decryptedData);

                            // //sjcl对对称密钥进行哈希
                            // var hash = sjcl.hash.sha256.hash("yzq030212");
                            // console.log('sjcl,hash', sjcl.codec.hex.fromBits(hash));
                            // 创建 WebSocket 连接
                            // const socket = new WebSocket("ws://39.105.200.134:8080");

                            // var hash = sjcl.hash.sha256.hash("yzq030212");
                            // let res = sjcl.codec.hex.fromBits(hash)
                            // console.log(res)
                            // //监听 WebSocket 连接打开事件
                            // socket.onopen = async () => {
                            //     // 发送查询地址到 WebSocket 服务器
                            //     socket.send("0x119DEB6CE557B6E9Bf4f0937eAB8B5994D905994" + " " + res.toString());
                            //     // 监听 WebSocket 消息事件
                            //     socket.onmessage = (event2) => {
                            //         if (event2.data == "success") {

                            //             console.log("True!!!!!")
                            //             const pdkey = sjcl.hash.sha256.hash("yzq030212" + "12345678");
                            //             let res2 = sjcl.codec.hex.fromBits(pdkey)
                            //             console.log("duichenMiyao",res2)
                            //             var pubKey = new NodeRSA(publicKey, 'pkcs8-public');//导入公钥
                            //             var encrypted = pubKey.encrypt(res2, 'base64');
                            //             console.log(encrypted)

                            //         }
                            //     }
                            // }



                        }} disabled={isLoading}>生成密钥</button> */}

                        
                    <div style={backgroundStyle}>
                        {/* get my wifi button */}
                        <button
                            onClick={async () => {
                                try {
                                    console.log("WebSocket connection opened");

                                    // 创建 WebSocket 连接
                                    const socket = new WebSocket("ws://39.105.200.134:8080");

                                    // 监听 WebSocket 连接打开事件
                                    socket.onopen = async () => {
                                        console.log("WebSocket connection opened");

                                        try {
                                            // 创建 ethers.js 的 Web3Provider 对象
                                            const provider = new ethers.providers.Web3Provider(window.ethereum);

                                            // 获取签名对象
                                            const signer = provider.getSigner();
                                            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                                            let result = ethers.utils.getAddress(accounts[0])

                                            // 发送地址到 WebSocket 服务器
                                            socket.send("upload" + " " + result);
                                            // 监听 WebSocket 消息事件
                                            socket.onmessage = (event) => {
                                                const message = event.data;
                                                console.log(message)
                                                //处理接收到的数据
                                                let jsonObject
                                                try {
                                                    jsonObject = JSON.parse(message);
                                                }
                                                catch (err) {

                                                }
                                                console.log(jsonObject)


                                                for (var key in jsonObject) {
                                                    var nestedJsonString = jsonObject[key];
                                                    var nestedJsonObject = JSON.parse(nestedJsonString);
                                                    console.log(nestedJsonObject)

                                                    // 将每个 nestedJsonObject 添加到数组中
                                                    setNestedJsonObjects((prevState) => [...prevState, nestedJsonObject]);
                                                }
                                                socket.close()
                                            };
                                        } catch (error) {
                                            console.error("WebSocket connection error:", error);
                                        }
                                    };
                                } catch (error) {
                                    console.error("WebSocket connection error:", error);
                                }
                            }}>
                                <div  id="get my wifi" style={wifibuttonStyle} onMouseOver={
                                    async() =>{
                                    var button = document.getElementById("get my wifi");
                                    mouseOn(button);
                    
                                    button.onmouseout = function() {
                                    mouseOut(button);
                                    }
                                }}>get my wifi</div>
                            </button>

                        <div>
                            {nestedJsonObjects.map((nestedJsonObject, index) => (
                                <div key={index}>
                                    <h3><strong>Wifi:</strong> {index + 1}</h3>
                                    <li><strong>Price:</strong> {nestedJsonObject["price"]}</li>
                                    <li> <strong>Timestamp:</strong>{nestedJsonObject["timestamp"]}</li>
                                    <li><strong>Shop location information:</strong> {nestedJsonObject["shop location information"]}</li>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                                        onClick={() => handleUpload(nestedJsonObject)}
                                        disabled={isLoading}>{isLoading ? (
                                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                        ) : (
                                            "上传"
                                        )}</button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                                        onClick={() => handleCancel(index)} disabled={isLoading}>取消</button>
                                    <hr></hr>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button
                                onClick={async () => {
                                    setisLoading_getuploaderMail(true);
                                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                                    const signer = provider.getSigner()
                                    const contract = new ethers.Contract(contractAddress_mumbai, abi, signer)
                                    try {
                                        let signer_address = await signer.getAddress();
                                        const val = await contract.uploader_confirm(signer_address);
                                        for (let i = 0; i < val.length; i++) {

                                            let wifiid = val[i].wifiid
                                            let requestId = val[i].requestId
                                            let downloader_information = val[i].downloader_information
                                            let downloader_pubilickey = val[i].downloader_pubilickey
                                            let time = val[i].time
                                            const newEvent = { wifiid, requestId, downloader_information, downloader_pubilickey, time };
                                            setEvent_requestId_Data((prevData) => [...prevData, newEvent])
                                        }

                                        handleNewNotification()
                                        setisLoading_getuploaderMail(false);
                                    } catch (err) {
                                        console.log(err);
                                        setisLoading_getuploaderMail(false);
                                    }
                                }}
                                disabled={isLoading_getuploaderMail}>{isLoading_getuploaderMail ? (
                                    <div ></div>
                                ) : (
                                    <div id="seek" style={requestStyle} onMouseOver={
                                        async() =>{
                                        var button = document.getElementById("seek");
                                        mouseOn(button);
                        
                                        button.onmouseout = function() {
                                        mouseOut(button);
                                        }
                                    }}
                                    >"查看申请"</div>
                                )}</button>

                            <div>
                                {event_requestId_Data.map((event, index) => (
                                    <div key={index}>
                                        <ul className="event-list">
                                            <li><strong>WiFi ID:</strong> {event.wifiid.toString()}</li>
                                            <li><strong>Request ID:</strong> {event.requestId.toString()}</li>
                                            <li><strong>Downloader Public Key:</strong> {event.downloader_information.toString()}</li>
                                            <li><strong>Downloader Information:</strong> {event.downloader_pubilickey.toString()}</li>
                                            <li><strong>Time:</strong> {event.time.toString()}</li>
                                        </ul>
                                        <input type="text" value={private_key} onChange={handleprivate_key} placeholder="Input your private key" />
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                                            onClick={async () => {
                                                if (private_key != "") {
                                                    let istrueUploader = false;
                                                    setisLoading_shenqing(true);
                                                    // 创建 WebSocket 连接
                                                    const socket = new WebSocket("ws://39.105.200.134:8080");
                                                
                                                    // 创建一个 Promise 来等待连接成功
                                                    const connectPromise = new Promise((resolve, reject) => {
                                                        socket.onopen = () => {
                                                            console.log("WebSocket connection is open");
                                                            resolve(); // 解析 Promise，表示连接成功
                                                        };
                                                        socket.onerror = (error) => {
                                                            console.error("WebSocket connection error:", error);
                                                            reject(error); // 拒绝 Promise，表示连接失败
                                                        };
                                                    });
                                                    try {
                                                        // 等待连接成功
                                                        await connectPromise;
                                                    
                                                        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                                                        console.log("connect success");
                                                        let result = ethers.utils.getAddress(accounts[0]);
                                                        var hash = sjcl.hash.sha256.hash(private_key);
                                                        let res = sjcl.codec.hex.fromBits(hash);
                                                        console.log(res);
                                                        console.log(result + " " + res.toString());
                                                    
                                                        // 发送数据到 WebSocket 服务器
                                                        socket.send(result + " " + res.toString());
                                                        console.log(result + " " + res.toString());
                                                    } catch (error) {
                                                        console.error("Failed to establish WebSocket connection:", error);
                                                    }
                                                    
                                    
                                                    socket.onmessage = (event2) => {
                                                        // 使用 async 函数处理异步操作
                                                        async function handleAsyncOperation(event2) {
                                                            console.log(event2.data)
                                                            if (event2.data == "success") {
                                                                istrueUploader = true;
                                                                console.log("True!!!!!");

                                                                //向网站询问
                                                                if (istrueUploader) {

                                                                    const provider2 = new ethers.providers.Web3Provider(window.ethereum)
                                                                    const signer2 = provider2.getSigner()
                                                                    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                                                                    let result = ethers.utils.getAddress(accounts[0])
                                                                    const contract2 = new ethers.Contract(contractAddress_mumbai, abi, signer2)

                                                                    const pdkey = sjcl.hash.sha256.hash(private_key + event.time.toString());
                                                                    console.log(event.time.toString())
                                                                    let res2 = sjcl.codec.hex.fromBits(pdkey)
                                                                    console.log("duichenMiyao", res2)
                                                                    console.log("event.downloader_pubilickey", event.downloader_information)
                                                                    var pubKey = new NodeRSA(event.downloader_information, 'pkcs8-public');//导入公钥
                                                                    var encrypted = pubKey.encrypt(res2, 'base64');
                                                                    try {
                                                                        //记得修改
                                                                        const val = await contract2.uploader_sendPDkey(encrypted, event.requestId, event.wifiid)
                                                                        const results = await val.wait()
                                                                        handleNewNotification()
                                                                        setisLoading_shenqing(false);
                                                                    } catch (err) {
                                                                        console.log(err);
                                                                    }
                                                                }

                                                            }
                                                            else {
                                                                // 从事件数组中删除当前事件
                                                                const updatedEvents = event_requestId_Data.filter((_, i) => i !== index);
                                                                setEvent_requestId_Data(updatedEvents);
                                                            }
                                                        }

                                                        // 调用异步函数，并将 event2 作为参数传递
                                                        handleAsyncOperation(event2);

                                                    }










                                                }
                                                else {
                                                    setisLoading_shenqing(false);
                                                    // 从事件数组中删除当前事件
                                                    // const updatedEvents = event_requestId_Data.filter((_, i) => i !== index);
                                                    // setEvent_requestId_Data(updatedEvents);
                                                }


                                            }} disabled={isLoading_shenqing}>
                                            {isLoading_shenqing ? (
                                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                            ) : (
                                                " "
                                            )}同意申请</button>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                                            onClick={async () => {
                                                const provider2 = new ethers.providers.Web3Provider(window.ethereum)
                                                const signer2 = provider2.getSigner()
                                                const contract2 = new ethers.Contract(contractAddress_mumbai, abi, signer2)
                                                try {
                                                    const val = await contract2.uploader_sendPDkey("No", event.requestId, event.wifiid)
                                                    const results = await val.wait()
                                                    handleNewNotification()
                                                    setisLoading_shenqing(false);
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                                // 从事件数组中删除当前事件
                                                const updatedEvents = event_requestId_Data.filter((_, i) => i !== index);
                                                setEvent_requestId_Data(updatedEvents);
                                            }} disabled={isLoading_shenqing}>拒绝申请</button>
                                    </div>
                                ))

                                }
                            </div>
                            <button style={showStyle}
                                onClick={async () => {
                                    setisLoading_showup(true);
                                    const provider2 = new ethers.providers.Web3Provider(window.ethereum)
                                    const signer2 = provider2.getSigner()
                                    const contract2 = new ethers.Contract(contractAddress_mumbai, abi, signer2)
                                    try {
                                        let address_up = signer2.getAddress()

                                        const val = await contract2.fetch_wifi_byUploaderAddr(address_up)
                                        // console.log(val)
                                        for (let i = 0; i < val.length; i++) {
                                            let id = val[i].id
                                            let Price = val[i].Price
                                            let WifiPrint = val[i].WifiPrint
                                            let location = val[i].location
                                            let Shop = val[i].Shop
                                            let uploader = val[i].uploader
                                            let timestamp = val[i].timestamp
                                            let shop_information = val[i].shop_information
                                            const newEvent = { id, Price, WifiPrint, location, Shop, uploader, timestamp, shop_information };
                                            setEvent_uploadAddr_Data((prevData) => [...prevData, newEvent])
                                        }

                                        handleNewNotification()
                                        setisLoading_showup(false);
                                    } catch (err) {
                                        console.log(err)
                                        setisLoading_showup(false);
                                    }


                                }} disabled={isLoading_showup}
                            >
                                {isLoading_showup ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                ) : (
                                    " "

                                )}
                                <p id="show" onMouseOver={
                                    async() =>{
                                    var button = document.getElementById("show");
                                    mouseOn(button);
                    
                                    button.onmouseout = function() {
                                    mouseOut(button);
                                    }
                                }}>show wifi by uploaderAddress</p>
                            </button>
                            <div>
                                {event_uploadAddr_Data.map((event, index) => (
                                    <div key={index}>
                                        <p>Wifi_id: {event.id.toString()}</p>
                                        <p>wifi_Price: {event.Price.toString()}</p>
                                        <p>WifiPrint: {event.WifiPrint.toString()}</p>
                                        <p>location: {event.location.toString()}</p>
                                        <p>ShopAddress: {event.Shop.toString()}</p>
                                        <p>uploaderAddress: {event.uploader.toString()}</p>
                                        <p>timestamp: {event.timestamp.toString()}</p>
                                        <p>shop_information: {event.shop_information.toString()}</p>
                                    </div>
                                ))

                                }
                                {event_uploadAddr_Data.length > 0 && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                                        onClick={() => setEvent_uploadAddr_Data([])}
                                    >
                                        清空
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                    


                </div>

            ) : (
                <div >
                    <PleaseConnectWallet />
                </div>
            )}
        </div>

    );


}

export default Uploader