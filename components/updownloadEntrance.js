import { abi, contractAddress } from "config"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "@web3uikit/core"
import { ethers } from "ethers"
export default function updownloadEntrance() {
    const [entranceFee, setEntranceFee] = useState("0")
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()

    const dispatch = useNotification()

    const [wifiPrice, setWifiPrice] = useState('');
    const [shopId, setShopId] = useState('');
    const [locationUpload, setLocationUpload] = useState('');
    const [wifiUpload, setWifiUpload] = useState('');

    const handleWifiPriceChange = (event) => {
        setWifiPrice(event.target.value);
    };

    const handleShopIdChange = (event) => {
        setShopId(event.target.value);
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
            contractAddress: contractAddress,
            functionName: "Upload_Wifiprint",
            msgValue: entranceFee,
            params: {
                _wifiprint: wifiUpload,
                location: locationUpload,
                _price: ethers.utils.parseEther(wifiPrice), // Your price value (uint256)
                shop: ethers.utils.getAddress(shopId)
            },
        })

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
                
                handleNewNotification(tx)
            } catch (error) {
                console.log(error)
            }
        }
    


  return (
    <div>
      <div>
        hi from entrance
      </div>
      <input type="text" value={wifiPrice} onChange={handleWifiPriceChange} placeholder="Enter your price" />
      <input type="text" value={shopId} onChange={handleShopIdChange} placeholder="Enter your shopId" />
      <input type="text" value={locationUpload} onChange={handleLocationUploadChange} placeholder="Enter your location" />
      <input type="text" value={wifiUpload} onChange={handleWifiUploadChange} placeholder="Enter your Wifi" />
      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await Upload_Wifiprint({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Enter Raffle"
                        )}
                    </button>  
    </div>
  );
}