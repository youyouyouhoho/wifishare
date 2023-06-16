//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract wifishare {
    struct WifiPack {
        uint id;
        uint256 Price;
        string WifiPrint;
        string location;
        string shop_information;
        address Shop;
        address uploader;
        uint256 timestamp;
    }
    struct wifiInfo {
        uint id;
        uint256 Price;
        uint256 timestamp;
        string WifiPrint;
        string shop_information;
        string key;
    }
    struct download_request {
        uint id;
        uint count;
        uint all_price;
        address downloader;
        string downloader_information;
        string downloader_pubilickey;
        bool is_pay;
    }
    struct message_foruploader {
        uint wifiid;
        uint requestId;
        string downloader_information;
        string downloader_pubilickey;
        uint256 time;
        bool isRead;
    }
    using Counters for Counters.Counter;
    Counters.Counter private _wifipackIds;
    Counters.Counter private _downloadRequestIds;

    // 事件
    event PayeeAdded(address account, uint256 shares); // 增加受益人事件
    event PaymentReleased(address to, uint256 amount); // 受益人提款事件
    event downloadReceived(address to, uint256 amount);
    event Download_Wifiprint(address downloader);
    event sendMessage(uint requestId, uint256 time);
    event requestAdd(
        address request_address,
        uint requestId,
        uint256 price_need,
        uint wifi_count
    );
    event upload_wifiprint(
        address indexed addr,
        string indexed location,
        uint256 price,
        uint256 time
    );
    //用于支付
    mapping(address => bool) addressExists;
    mapping(address => uint256) addressNumber;

    //由地点指向WifiPack的map，便于查询
    mapping(string => WifiPack[]) LocationToWifi;
    //由账户指向WifiPack的map
    mapping(address => WifiPack[]) UploaderAddrToWifi;
    mapping(address => wifiInfo[]) DownloaderAddrToWifi;

    mapping(uint => WifiPack) private idToWifiPack;
    mapping(uint => download_request) private idTodownload_request;
    mapping(uint => WifiPack[]) private idToRequest_wifipack;
    mapping(uint => wifiInfo[]) private requestIdtoWifiInfo;
    mapping(address => message_foruploader[]) private uploader_message;

    function Upload_Wifiprint(
        string memory _wifiprint,
        string memory province,
        string memory city,
        string memory district,
        uint256 time,
        uint256 _price,
        string memory shop_information,
        address uploader,
        address shop
    ) public {
        require(msg.sender == uploader, "Need right uploader");
        _wifipackIds.increment();
        uint wifiId = _wifipackIds.current();
        WifiPack storage wifi = idToWifiPack[wifiId];
        wifi.id = wifiId;
        string memory location = string(
            abi.encodePacked(province, city, district, shop_information)
        );
        wifi.location = location;
        wifi.Price = _price;
        wifi.Shop = shop;
        wifi.timestamp = time;
        wifi.WifiPrint = _wifiprint;
        wifi.uploader = msg.sender;
        wifi.shop_information = shop_information;
        // require(AddrToUser_map[msg.sender].addr == msg.sender, "Uploader must be an existing user.");
        WifiPack memory wifipack = WifiPack(
            _wifipackIds.current(),
            _price,
            _wifiprint,
            location,
            shop_information,
            shop,
            msg.sender,
            time
        );

        string memory pcdstr = string(
            abi.encodePacked(province, city, district)
        );
        string memory pcity = string(abi.encodePacked(province, city, "No"));
        string memory pstr = string(abi.encodePacked(province, "No", "No"));
        LocationToWifi[pcity].push(wifipack);
        LocationToWifi[location].push(wifipack);
        LocationToWifi[pcdstr].push(wifipack);
        LocationToWifi[pstr].push(wifipack);
        
        UploaderAddrToWifi[msg.sender].push(wifipack);
        emit upload_wifiprint(msg.sender, location, _price, time);
        
    }

    /**
     * @dev 回调函数，收到ETH释放PaymentReceived事件
     */
    receive() external payable virtual {
        emit downloadReceived(msg.sender, msg.value);
    }

    //最精确查询
    function request_wifiDownload(string memory location, uint256 time) public {
        //新增查询请求
        _downloadRequestIds.increment();
        uint dRequestId = _downloadRequestIds.current();

        WifiPack[] memory pack = LocationToWifi[location];
        uint256 count = 0;
        uint256 all_price = 0;
        require(pack.length > 0, "No suitable length");
        for (uint256 i = 0; i < pack.length; i++) {
            if (pack[i].timestamp >= time) {
                count++;
                all_price += pack[i].Price;
                //将符合条件的wifi添加至对应查询请求的wifipack[]中
                idToRequest_wifipack[dRequestId].push(pack[i]);
            }
        }

        //将请求存入map，后续通过id找到请求，判断状态
        download_request storage request_s = idTodownload_request[dRequestId];
        request_s.all_price = all_price;
        request_s.count = count;
        request_s.id = dRequestId;
        request_s.is_pay = false;
        request_s.downloader = msg.sender;
       
        emit requestAdd(
            msg.sender,
            request_s.id,
            request_s.all_price,
            request_s.count
        );
    }

    //根据request信息交钱并分发
    function PayDownload_byRequestId(
        uint requestId,
        string memory publickey_downloader,
        string memory information_downloader
    ) public payable {
        require(requestId >= 0, "wrong RequestId");

        download_request memory requestItem = idTodownload_request[requestId];
        require(
            requestItem.downloader == msg.sender,
            "you can't pay for other's request"
        );
        require(requestItem.is_pay == false, "Already paid");

        uint256 all_price = requestItem.all_price;
        require(msg.value >= all_price, "More money need to pay");

        WifiPack[] memory pack = idToRequest_wifipack[requestId];

        require(pack.length > 0, "No suitable wifi");
        idTodownload_request[requestId]
            .downloader_information = information_downloader;
        idTodownload_request[requestId].is_pay = true;

        for (uint256 i = 0; i < pack.length; i++) {
            //将wifipack放入相应的wifiinfo内
            wifiInfo memory wifiinfo;
            wifiinfo.id = pack[i].id;
            wifiinfo.Price = pack[i].Price;
            wifiinfo.timestamp = pack[i].timestamp;
            wifiinfo.WifiPrint = pack[i].WifiPrint;
            wifiinfo.shop_information = pack[i].shop_information;
            wifiinfo.key = "No";
            requestIdtoWifiInfo[requestId].push(wifiinfo);
            //向相应用户提出申请
            message_foruploader memory message;
            message.time = pack[i].timestamp;
            message.requestId = requestId;
            message.wifiid = pack[i].id;
            message.downloader_information = information_downloader;
            message.downloader_pubilickey = publickey_downloader;
            message.isRead = false;
            uploader_message[pack[i].uploader].push(message);
            emit sendMessage(requestId, pack[i].timestamp);
        }
    }

    function uploader_confirm(
        address up
    ) public view returns (message_foruploader[] memory) {
        require(msg.sender == up, "wrong uploader do not have permission");
        message_foruploader[] storage messagePack = uploader_message[up];
        return messagePack;
    }

    function uploader_sendPDkey(
        string memory PDkey,
        uint requestId,
        uint WIfiId
    ) public {
        require(idToWifiPack[WIfiId].uploader == msg.sender, "wrong uploader");
        message_foruploader[] storage messagePack = uploader_message[
            msg.sender
        ];
        uint256 index = messagePack.length;
        for (uint256 i = 0; i < messagePack.length; i++) {
            if (
                messagePack[i].isRead == false &&
                messagePack[i].wifiid == WIfiId &&
                messagePack[i].requestId == requestId
            ) {
                messagePack[i].isRead = true;
                index = i;
            }
        }
        require(index != messagePack.length, "request doesn't have this wifi");
        // 移除指定索引的消息
        for (uint256 i = index; i < messagePack.length - 1; i++) {
            messagePack[i] = messagePack[i + 1];
        }
        messagePack.pop();
        wifiInfo[] storage wifiinfo = requestIdtoWifiInfo[requestId];
        if (keccak256(bytes(PDkey)) != keccak256(bytes("No"))) {
            for (uint256 i = 0; i < wifiinfo.length; i++) {
                if (wifiinfo[i].id == WIfiId) {
                    wifiinfo[i].key = PDkey;
                    address downloader = idTodownload_request[requestId]
                        .downloader;
                    DownloaderAddrToWifi[downloader].push(wifiinfo[i]);
                    break;
                }
            }
            address payable upload_addr = payable(
                idToWifiPack[WIfiId].uploader
            );
            address payable shop_addr = payable(idToWifiPack[WIfiId].Shop);
            upload_addr.transfer((idToWifiPack[WIfiId].Price * 8) / 10);
            shop_addr.transfer((idToWifiPack[WIfiId].Price * 2) / 10);
            emit PaymentReleased(
                upload_addr,
                (idToWifiPack[WIfiId].Price * 8) / 10
            );
            emit PaymentReleased(
                shop_addr,
                (idToWifiPack[WIfiId].Price * 2) / 10
            );
            emit Download_Wifiprint(idTodownload_request[requestId].downloader);
        } else {
            address payable downloader_addr = payable(
                idTodownload_request[requestId].downloader
            );
            downloader_addr.transfer(idToWifiPack[WIfiId].Price);
            emit PaymentReleased(downloader_addr, idToWifiPack[WIfiId].Price);
        }
    }

    //返回符合download_request条件的wifi[]
    function fetch_wifi_byRequestId(
        uint requestId
    ) public view returns (wifiInfo[] memory) {
        require(requestId >= 0, "wrong requestid");
        download_request memory requestItem = idTodownload_request[requestId];
        require(requestItem.is_pay == true, "you need to pay for download");
        require(requestItem.downloader == msg.sender, "wrong downloader");

        wifiInfo[] memory pack = requestIdtoWifiInfo[requestId];
        return pack;
    }

    //返回符合downloader的wifi[]
    function fetch_wifi_byDownloaderAddr(
        address downloader
    ) public view returns (wifiInfo[] memory) {
        require(msg.sender == downloader, "sender must bu downloader him self");
        wifiInfo[] memory pack = DownloaderAddrToWifi[downloader];
        return pack;
    }

    //返回uploader具有的wifi[]
    function fetch_wifi_byUploaderAddr(
        address uploader
    ) public view returns (WifiPack[] memory) {
        require(msg.sender == uploader, "you are not correct uploader");
        WifiPack[] memory pack = UploaderAddrToWifi[uploader];
        uint count = pack.length;
        require(count >= 0, "you haven't upload wifi");
        WifiPack[] memory wifipack = new WifiPack[](count);

        uint index = 0;
        for (uint i = 0; i < pack.length; i++) {
            WifiPack storage wifi = idToWifiPack[pack[i].id];
            wifipack[index] = wifi;
            index++;
        }

        return wifipack;
    }
}
