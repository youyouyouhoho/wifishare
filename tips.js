import { abi, contractAddress_mumbai } from "config"
import {  useWeb3Contract } from "react-moralis"

const {
    runContractFunction: Upload_Wifiprint,
    data: uploadTxResponse,
    isLoading,
    isFetching,
} = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress_mumbai,
    functionName: "Upload_Wifiprint",
    msgValue: entranceFee,
    params: {
        //传入参数
        _wifiprint: wifiUpload,//string
        location: locationUpload,//string
        _price:wifiPrice, // Your price value (uint256)
        shop:shopid//(address类型)如: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    },
})

const handleSuccess = async (tx) => {
    try {
        await tx.wait(1)
        
        console.log("success")
    } catch (error) {
        console.log(error)
    }
}

<button
onClick={async () =>
    await Upload_Wifiprint({

        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
    })
}
disabled={isLoading || isFetching}
>upload</button>

//另一种方法：
import { ethers } from "ethers"
{/* <label for="wifi_upload">wifi_upload</label>
<input id="wifi_upload" placeholder="0.1" type="text" />
<label for="location_upload">location_upload</label>
<input id="location_upload" placeholder="0.1" type="text" />
<label for="shop_id">shop_id</label>
<input id="shop_id" placeholder="0.1" type="text" />
<label for="wifi_price">wifi_price</label>
<input id="wifi_price" placeholder="0.1" type="number" />
<button id="uploadButton">upload</button> */}
async function upload() {
    const wifi_price = document.getElementById("wifi_price").value
    const shop_id = document.getElementById("shop_id").value
    const location_upload = document.getElementById('location_upload').value
    const wifi_upload = document.getElementById('wifi_upload').value
    const _ETHER = ethers.utils.parseEther(wifi_price);
    const shop_address = ethers.utils.getAddress(shop_id);
    console.log(`uploading ...`)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const wifidemo = new ethers.Contract(contractAddress_mumbai, abi, signer)
      try {
        //监听事件，合约中每成功上传一次wifi，会emit一个事件  emit upload_wifiprint(msg.sender, location, _price,block.timestamp);
        wifidemo.on("upload_wifiprint",(sender_address,location,time)=>
        {console.log("sender_address :",sender_address , "location: ", location,"time: ", time )});
        const transactionResponse = await wifidemo.Upload_Wifiprint(wifi_upload, location_upload, _ETHER, shop_address)

      } catch (error) {
        console.log(error)
      }
    } else {
      fundButton.innerHTML = "Please install MetaMask"
    }
  }