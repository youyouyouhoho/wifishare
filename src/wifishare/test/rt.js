const { expect } = require("chai");
const { ethers } = require("hardhat")
describe("Test contract", function () {
    it("Create account", async function () {
        const [owner,addr1,addr2,addr3,addr4] = await ethers.getSigners();

        const Wifidemo = await ethers.getContractFactory("Ourwifidapp");
        console.log("Deploy contract .....")
        const wifidemo = await Wifidemo.deploy()

        await wifidemo.deployed();
        console.log("Deploy finish .....")
        const half_ETHER = ethers.utils.parseEther("1");
        const Upload_wifiprint = await wifidemo.connect(addr1).Upload_Wifiprint("123", "BJ", half_ETHER, await addr2.getAddress())
        const Upload_wifiprint2 = await wifidemo.connect(addr2).Upload_Wifiprint("456", "BJ", half_ETHER, await addr3.getAddress())
   
        let baldefore_uploader = await ethers.provider.getBalance(addr1.address)
        let baldefore_uploader2 = await ethers.provider.getBalance(addr3.address)
        let baldefore_shop = await ethers.provider.getBalance(addr2.address)
        let baldefore_shop2 = await ethers.provider.getBalance(addr4.address)

        const ONE_ETHER = ethers.utils.parseEther("3");
        wifidemo.on("Download_Wifiprint",(wifi,location,timestamp)=>
        {console.log("wifi :",wifi , "location: ", location,timestamp )});
        let baldefore_owner = await ethers.provider.getBalance(owner.address)

        const Download_wifiprint = await wifidemo.connect(owner).Download_Wifiprint2("BJ",0,{ value: ONE_ETHER });
        const download_result = await  Download_wifiprint.wait();
        console.log(`wifi1 : ${Download_wifiprint[0]}`)
        console.log(`download_result:  ${JSON.parse(JSON.stringify(Download_wifiprint))}`)
        let balafter_owner = await ethers.provider.getBalance(owner.address)

        const events = download_result.events;
        // 遍历事件 
        console.log(events);
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if(event.event == "Download_Wifiprint")
            {
                // 提取参数
                const wifi = event.args[0];
                const location = event.args[1];
                const time = event.args[2].toString();
                console.log("Event:", event.event);
                console.log("wifi:", wifi);
                console.log("location:", location);
                console.log("time:", time);
            }
            
        }
    
        let balafter_uploader = await ethers.provider.getBalance(addr1.address)
        let balafter_uploader2 = await ethers.provider.getBalance(addr3.address)
        let balafter_shop = await ethers.provider.getBalance(addr2.address)
        let balafter_shop2 = await ethers.provider.getBalance(addr4.address)
        console.log('Download Transaction confirmed');
        console.log("Before uploader: ", baldefore_uploader.toString());
        console.log("After uploader: ", balafter_uploader.toString());
        console.log("Before shop: ", baldefore_shop.toString());
        console.log("After shop: ", balafter_shop.toString());
        console.log("Before uploader2: ", baldefore_uploader2.toString());
        console.log("After uploader2: ", balafter_uploader2.toString());
        console.log("Before shop2: ", baldefore_shop2.toString());
        console.log("After shop2: ", balafter_shop2.toString());
        console.log("Before downloader: ", baldefore_owner.toString());
        console.log("After downloader: ", balafter_owner.toString());

    });
});
