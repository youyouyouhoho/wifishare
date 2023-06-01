import Head from "next/head";
import styles from "../styles/home.module.css";
import Header from "components/header";
import { useMoralis } from "react-moralis";

import { abi, contractAddress_local,contractAddress_mumbai } from "config"
import { useWeb3Contract } from "react-moralis"
import { useEffect, useState ,useRef} from "react"
import { useNotification } from "@web3uikit/core"
import { ethers } from "ethers"

const supportedChains = ["31337", "11155111"]

function isValidWifiprice(wifi_price) {
  if (wifi_price >= 0) {
    return true;
  }
  else {
    return false;
  }
}
function isValidshopid(shopid) {
  const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  if (ethereumAddressRegex.test(shopid)) {
    return true;
  }
  else {
    return false;
  }
}
export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  const [entranceFee, setEntranceFee] = useState("0")

  const dispatch = useNotification()

  const [wifiPrice, setWifiPrice] = useState('');
  const [shopId, setShopId] = useState('');
  const [locationUpload, setLocationUpload] = useState('');
  const [wifiUpload, setWifiUpload] = useState('');
  // let _wifiprice_up = ethers.utils.parseEther('0');
  // let _shop_id;
  // let _wifixinxi;
  // let _location;
  const [_wifiprice_up, set_wifiprice_up] = useState('');
  const [_shop_id, set_shop_id] = useState('');
  const [_wifixinxi, set_wifixinxi] = useState('');
  const [_location, set_location] = useState('');
  const handleWifiPriceChange = (event) => {
    const value = event.target.value;
    setWifiPrice(value);
  };

  const handleShopIdChange = (event) => {
    const address = event.target.value;
    setShopId(address);
  };

  const handleLocationUploadChange = (event) => {
    setLocationUpload(event.target.value);
  };

  const handleWifiUploadChange = (event) => {
    setWifiUpload(event.target.value);
  };


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
      _wifiprint: _wifixinxi,
      location: _location,
      _price: _wifiprice_up,
      shop: _shop_id,
    },
  })

  const handlewifiprice = () => {
    dispatch({
      type: "info",
      message: "wifi price cannot < 0",
      title: "wifi price Notification",
      position: "topR",
      icon: "bell",
    })
  }

  const handleaddress = () => {
    dispatch({
      type: "info",
      message: "check your shop address",
      title: "shop address Notification",
      position: "topR",
      icon: "bell",
    })
  }

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    })
  }

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1)
      console.log(`response: ${downloadTxResponse}`);
      handleNewNotification(tx)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
    console.log(`_wifixinxi:${_wifixinxi}`);

  }, [_wifixinxi]);
  useEffect(() => {
    
    console.log(`_location:${_location}`);

  }, [_location]);
  useEffect(() => {
    
    console.log(`_wifiprice_up:${_wifiprice_up}`);

  }, [_wifiprice_up]);
  useEffect(() => {
    const handleUpload = async () => {
      try {
        await Upload_Wifiprint({
          // onComplete:
          // onError:
          onSuccess: handleSuccess,
          onError: (error) => console.log(error),
        });
      } catch (error) {
        console.log(error);
      }
    };
    console.log("about to func")
    console.log(`_wifixinxi:${_wifixinxi}`);
    console.log(`_location:${_location}`);
    console.log(`_wifiprice_up:${_wifiprice_up}`);
    console.log(`_shop_id:${_shop_id}`);   
    handleUpload();

  }, [_shop_id]);
  //download
  const [location_download, setlocation_download] = useState('');
  const [time_download, settime_download] = useState('');
  const [price_download, setprice_download] = useState('');
  const [_price_download, set_price_download] = useState('');
  const [_location_download, set_location_download] = useState('');
  const [_time_download, set_time_download] = useState('');
  const handlelocation_download = (event) => {
    const value = event.target.value;
    setlocation_download(value);
  };

  const handletime_download = (event) => {
    const value = event.target.value;
    settime_download(value);
  };
  

  const handleprice_download = (event) => {
    setprice_download(event.target.value);
  };


  const {
    runContractFunction: Download_Wifiprint2,
    data: downloadTxResponse,
    isLoading2,
    isFetching2,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress_mumbai,
    functionName: "Download_Wifiprint2",
    msgValue: _price_download,
    params: {
      location: _location_download,
      time: _time_download,
    },
  })

    
  useEffect(() => {
    
    console.log(`price_download:${_price_download}`);

  }, [_price_download]);
  useEffect(() => {
    
    console.log(`_location_download:${_location_download}`);
    
  }, [_location_download]);
  useEffect(() => {
    const handledownload = async () => {
      try {
        await Download_Wifiprint2({
          // onComplete:
          // onError:
          onSuccess: handleSuccess,
          onError: (error) => console.log(error),
        });
      } catch (error) {
        console.log(error);
      }
    };
    console.log(`_time_download:${_time_download}`);
    // 在params更新后执行操作
    // 这里可以放置任何需要在params更新后执行的代码
    handledownload();
  }, [_time_download]);

  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isWeb3Enabled ? (<div className="flex flex-row">
        <div>
          <input type="number" value={wifiPrice} onChange={handleWifiPriceChange} placeholder="Enter your price" />
          <input type="text" value={shopId} onChange={handleShopIdChange} placeholder="Enter your shopId" />
          <input type="text" value={locationUpload} onChange={handleLocationUploadChange} placeholder="Enter your location" />
          <input type="text" value={wifiUpload} onChange={handleWifiUploadChange} placeholder="Enter your Wifi" />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () => {
              if (isValidWifiprice(wifiPrice) && isValidshopid(shopId)) {
                let _wifiprice_up2 = ethers.utils.parseEther(wifiPrice);
                let _shop_id2 = ethers.utils.getAddress(shopId);
                set_wifixinxi(wifiUpload);
                set_location(locationUpload);
                set_wifiprice_up(_wifiprice_up2);
                set_shop_id(_shop_id2);
              }
              else {
                if (!isValidWifiprice(wifiPrice)) {
                  handlewifiprice();
                }
                else {
                  handleaddress();
                }
              }
            }

            }
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Upload"
            )}
          </button>
          <hr></hr>
          <input type="number" value={time_download} onChange={handletime_download} placeholder="time for download" />
          <input type="text" value={location_download} onChange={handlelocation_download} placeholder="location for download" />
          <input type="number" value={price_download} onChange={handleprice_download} placeholder="price for download" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () => {
              if (isValidWifiprice(price_download) && isValidWifiprice(time_download))
              {
                let _price_download2 = ethers.utils.parseEther(price_download);
                
                set_price_download(_price_download2)
                set_location_download(location_download)
                set_time_download(time_download)
                
                
              }
              

            }

            }
            disabled={isLoading2 || isFetching2}
          >
            {isLoading2 || isFetching2 ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Download"
            )}
          </button>
        
        </div>
      </div>

      ) : (
        <div>Please connect to a Wallet</div>
      )}
    </div>
  );
}


