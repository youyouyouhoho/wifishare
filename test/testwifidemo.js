const { expect } = require("chai");
const { ethers } = require("hardhat")
describe("Test contract", function () {
    it("Should upload a wifi", async function () {
        const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        const Wifidemo = await ethers.getContractFactory("testwifidemo")
        console.log("Deploy contract .....")
        const wifidemo = await Wifidemo.deploy()
        await wifidemo.deployed()
        await wifidemo.connect(addr1).Upload_Wifiprint("1--wifiprint--haha", "BJ", 1000, await addr2.getAddress())

        const wifis = await wifidemo.fetch_wifi_byUploaderAddr(addr1.getAddress())
        console.log("uploadwifi: ", wifis[0].WifiPrint)
        expect(wifis[0].WifiPrint).to.equal("1--wifiprint--haha")
    })

    it("Should upload two wifi", async function () {
        const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        const Wifidemo = await ethers.getContractFactory("testwifidemo")
        console.log("Deploy contract .....")
        const wifidemo = await Wifidemo.deploy()
        await wifidemo.deployed()
        await wifidemo.connect(addr1).Upload_Wifiprint("1--wifiprint--haha", "BJ", 1000, await addr2.getAddress())
        await wifidemo.connect(addr1).Upload_Wifiprint("2--wifiprint--haha", "BJ", 1000, await addr2.getAddress())
        const wifis = await wifidemo.fetch_wifi_byUploaderAddr(addr1.getAddress())
        console.log(wifis.length)
        console.log("uploadwifi: ", wifis[0].WifiPrint)
        expect(wifis[0].WifiPrint).to.equal("1--wifiprint--haha")
        expect(wifis[1].WifiPrint).to.equal("2--wifiprint--haha")
    })

    it("Should download return request", async function () {
        const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        const Wifidemo = await ethers.getContractFactory("testwifidemo")
        console.log("Deploy contract .....")
        const wifidemo = await Wifidemo.deploy()
        await wifidemo.deployed()
        await wifidemo.connect(addr1).Upload_Wifiprint("1--wifiprint--haha", "BJ", 1000, await addr2.getAddress())
        await wifidemo.connect(addr2).Upload_Wifiprint("2--wifiprint--haha", "BJ", 1000, await addr3.getAddress())

        // wifidemo.on("requestAdd",(id,all_price,count)=>
        //     {console.log("id :",id , "all_price: ", all_price,"count: ",count )});        
        // const request = await wifidemo.request_wifiDownload("BJ", 0)
        const Download_wifiprint = await wifidemo.connect(owner).request_wifiDownload("BJ", 0);
        const download_result = await Download_wifiprint.wait();
        const events = download_result.events;
        let price = 0;
        // 遍历事件 
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.event == "requestAdd") {
                // 提取参数
                const id = event.args[0];
                const allPrice = event.args[1];
                const count = event.args[2];
                console.log("request_id:", id);
                console.log("allprice:", allPrice);
                console.log("count:", count);
                price = allPrice;
                expect(count).to.equal(2);
            }

        }
        console.log(price);
    })

    it("Should download return download wifi", async function () {
        const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        const Wifidemo = await ethers.getContractFactory("testwifidemo")
        console.log("Deploy contract .....")
        const wifidemo = await Wifidemo.deploy()
        await wifidemo.deployed()

        let baldefore_uploader = await ethers.provider.getBalance(addr1.address)
        let baldefore_uploader2 = await ethers.provider.getBalance(addr2.address)
        let baldefore_shop = await ethers.provider.getBalance(addr3.address)
        let baldefore_shop2 = await ethers.provider.getBalance(addr4.address)
        const ONE_ETHER = ethers.utils.parseEther("0.01");
        await wifidemo.connect(addr1).Upload_Wifiprint("1--wifiprint--haha", "BJ", ONE_ETHER, await addr4.getAddress())
        await wifidemo.connect(addr2).Upload_Wifiprint("2--wifiprint--haha", "BJ", ONE_ETHER, await addr3.getAddress())

        //这个request id=1,price应该为2000
        const Request_wifiprint = await wifidemo.connect(owner).request_wifiDownload("BJ", 0);
        const request_wifiprint = await Request_wifiprint.wait();
        const events = request_wifiprint.events;

        let price = 0;
        let rid = 0;
        // 遍历事件 
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.event == "requestAdd") {
                // 提取参数
                const id = event.args[0];
                const allPrice = event.args[1];
                const count = event.args[2];
                rid = id;
                price = allPrice;
            }

        }
        let baldefore_owner = await ethers.provider.getBalance(owner.address)

        const Download_wifiprint = await wifidemo.connect(owner).PayDownload_byRequestId(rid, { value: price });
        const download_result = await Download_wifiprint.wait();
        const events2 = download_result.events;

        let balafter_owner = await ethers.provider.getBalance(owner.address)

        // 遍历事件 
        for (let i = 0; i < events2.length; i++) {
            const event = events2[i];
            if (event.event == "Download_Wifiprint") {
                // 提取参数
                const WifiPrint = event.args[0];
                const location = event.args[1];
                const timestamp = event.args[2];
                console.log("WifiPrint:", WifiPrint);
                console.log("location:", location);
                console.log("timestamp:", timestamp);

            }

        }
        //检测出钱的人是否有了WiFi
        const wifis = await wifidemo.connect(owner).fetch_wifi_byDownloaderAddr(owner.getAddress())

        for (let i = 0; i < wifis.length; i++) {
            console.log("downloader does own request_wifi: ", wifis[i].WifiPrint);
        }

        //钱成功支付后通过请求id便能查到此次请求获得的wifi
        const wifis_request = await wifidemo.connect(owner).fetch_wifi_byRequestId(1);
        for (let i = 0; i < wifis_request.length; i++) {
            console.log("request does own request_wifi: ", wifis[i].WifiPrint);
        }
        let balafter_uploader = await ethers.provider.getBalance(addr1.address)
        let balafter_uploader2 = await ethers.provider.getBalance(addr2.address)
        let balafter_shop = await ethers.provider.getBalance(addr3.address)
        let balafter_shop2 = await ethers.provider.getBalance(addr4.address)

        console.log('Download confirmed');
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


    })

    // it("Create account", async function () {
    //     const [owner,addr1,addr2,addr3,addr4] = await ethers.getSigners();

    //     const Wifidemo = await ethers.getContractFactory("testwifidemo");
    //     console.log("Deploy contract .....")
    //     const wifidemo = await Wifidemo.deploy()

    //     await wifidemo.deployed();
    //     console.log("Deploy finish .....")
    //     const half_ETHER = ethers.utils.parseEther("1");
    //     const Upload_wifiprint = await wifidemo.connect(addr1).Upload_Wifiprint("123", "BJ", half_ETHER, await addr2.getAddress())
    //     const Upload_wifiprint2 = await wifidemo.connect(addr3).Upload_Wifiprint("456", "BJ", half_ETHER, await addr4.getAddress())

    //     let baldefore_uploader = await ethers.provider.getBalance(addr1.address)
    //     let baldefore_uploader2 = await ethers.provider.getBalance(addr3.address)
    //     let baldefore_shop = await ethers.provider.getBalance(addr2.address)
    //     let baldefore_shop2 = await ethers.provider.getBalance(addr4.address)

    //     const ONE_ETHER = ethers.utils.parseEther("3");
    //     wifidemo.on("Download_Wifiprint",(wifi,location,timestamp)=>
    //     {console.log("wifi :",wifi , "location: ", location,timestamp )});
    //     let baldefore_owner = await ethers.provider.getBalance(owner.address)

    //     const eventFilter = wifidemo.filters.Download_Wifiprint();
    //     wifidemo.on(eventFilter,(wifi,location,timestamp)=>
    //     {console.log("wifi :",wifi , "location: ", location,timestamp )});


    //     const Download_wifiprint = await wifidemo.connect(owner).Download_Wifiprint2("BJ",0,{ value: ONE_ETHER });
    //     console.log(`--------downloadwifi1:${Download_wifiprint[0].WifiPrint}`)
    //     expect(Download_wifiprint[0].WifiPrint).to.equal("123")
    //     const download_result = await  Download_wifiprint.wait();
    //     let balafter_owner = await ethers.provider.getBalance(owner.address)

    //     const events = download_result.events;
    //     // 遍历事件 
    //     console.log(events);
    //     for (let i = 0; i < events.length; i++) {
    //         const event = events[i];
    //         if(event.event == "Download_Wifiprint")
    //         {
    //             // 提取参数
    //             const wifi = event.args[0];
    //             const location = event.args[1];
    //             const time = event.args[2].toString();
    //             console.log("Event:", event.event);
    //             console.log("wifi:", wifi);
    //             console.log("location:", location);
    //             console.log("time:", time);
    //         }

    //     }

    //     let balafter_uploader = await ethers.provider.getBalance(addr1.address)
    //     let balafter_uploader2 = await ethers.provider.getBalance(addr3.address)
    //     let balafter_shop = await ethers.provider.getBalance(addr2.address)
    //     let balafter_shop2 = await ethers.provider.getBalance(addr4.address)
    //     console.log('Download Transaction confirmed');
    //     console.log("Before uploader: ", baldefore_uploader.toString());
    //     console.log("After uploader: ", balafter_uploader.toString());
    //     console.log("Before shop: ", baldefore_shop.toString());
    //     console.log("After shop: ", balafter_shop.toString());
    //     console.log("Before uploader2: ", baldefore_uploader2.toString());
    //     console.log("After uploader2: ", balafter_uploader2.toString());
    //     console.log("Before shop2: ", baldefore_shop2.toString());
    //     console.log("After shop2: ", balafter_shop2.toString());
    //     console.log("Before downloader: ", baldefore_owner.toString());
    //     console.log("After downloader: ", balafter_owner.toString());

    // });
});
