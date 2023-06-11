const { expect } = require("chai");
const { ethers } = require("hardhat")
describe("Test contract", function () {
    it("Should upload a wifi", async function () {
        const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        const Wifidemo = await ethers.getContractFactory("wifishare")
        console.log("Deploy contract .....")
        const wifidemo = await Wifidemo.deploy()
        await wifidemo.deployed()
        await wifidemo.connect(addr1).Upload_Wifiprint("1--wifiprint--haha", "xj","BJ","district", 10,1000,"shop3", await addr1.getAddress(),await addr3.getAddress())
        await wifidemo.connect(addr1).Upload_Wifiprint("2--wifiprint--haha", "xj","BJ","district2" ,10,1000, "shop4",await addr1.getAddress(),await addr4.getAddress())

        const results =  await wifidemo.connect(addr3).request_wifiDownload("xjNoNo",0);
        const Results = await results.wait();
        const events = Results.events;
        let price =0 ;
        let count = 0;
        let requestid = 0;
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if(event.event == "requestAdd")
            {
                // 提取参数
                const request_address = event.args[0];
                requestid = event.args[1];
                price = event.args[2];
                count = event.args[3];
                console.log("request_address:", request_address);
                console.log("requestid:", requestid);
                console.log("price:", price);
                console.log("count:", count);
            }
            
        }
        // const results2 =  await wifidemo.connect(addr3).PayDownload_byRequestId(requestid,"12345678","woshishabi",{ value: price });
        // const Results2 = await results2.wait();

        // const results3 =  await wifidemo.connect(addr1).uploader_confirm(addr1.address);
        // let wifiid = results3[0].wifiid;
        // let requestId = results3[0].requestId;
        // console.log("wifiid1:", wifiid);
        // console.log("requestId1:", requestId);
        // let wifiid2 = results3[1].wifiid;
        // let requestId2 = results3[1].requestId;
        // console.log("wifiid2:", wifiid2);
        // console.log("requestId2:", requestId2);
        // const results4 =  await wifidemo.connect(addr1).uploader_sendPDkey("addr1pdkey",requestId,wifiid);
        // const Results4 = await results4.wait();
        // const events4 = Results4.events;
        

        // const results5 =  await wifidemo.connect(addr3).fetch_wifi_byRequestId(requestId);
        // console.log(results5);
        

    })

   


});
