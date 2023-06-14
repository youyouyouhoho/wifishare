//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract testwifidemo {
    struct WifiPack {
        uint id;
        uint256 Price;
        string WifiPrint;
        string location;
        address Shop;
        address uploader;
        uint256 timestamp;
    }
    struct download_request {
        uint id;
        uint count;
        uint all_price;
        bool is_pay;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _wifipackIds;
    Counters.Counter private _downloadRequestIds;

    // 事件
    event PayeeAdded(address account, uint256 shares); // 增加受益人事件
    event PaymentReleased(address to, uint256 amount); // 受益人提款事件
    event downloadReceived(address to, uint256 amount);
    event Download_Wifiprint(string wifi, string location, uint256 time);
    event requestAdd(address request_address,uint requestId, uint256 price_need, uint wifi_count);
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
    mapping(address => WifiPack[]) DownloaderAddrToWifi;

    mapping(uint => WifiPack) private idToWifiPack;
    mapping(uint => download_request) private idTodownload_request;
    mapping(uint => WifiPack[]) private idToRequest_wifipack;
    mapping(uint => address) private requestIdtodownloader;
    function Upload_Wifiprint(
        string memory _wifiprint,
        string memory location,
        uint256 _price,
        address shop
    ) public {
        _wifipackIds.increment();
        uint wifiId = _wifipackIds.current();
        WifiPack storage wifi = idToWifiPack[wifiId];
        wifi.id = wifiId;
        wifi.location = location;
        wifi.Price = _price;
        wifi.Shop = shop;
        wifi.timestamp = block.timestamp;
        wifi.WifiPrint = _wifiprint;
        wifi.uploader = msg.sender;
        // require(AddrToUser_map[msg.sender].addr == msg.sender, "Uploader must be an existing user.");
        WifiPack memory wifipack = WifiPack(
            _wifipackIds.current(),
            _price,
            _wifiprint,
            location,
            shop,
            msg.sender,
            block.timestamp
        );
        LocationToWifi[location].push(wifipack);
        UploaderAddrToWifi[msg.sender].push(wifipack);
        emit upload_wifiprint(msg.sender, location, _price, block.timestamp);

        console.log(
            "Wifi has upload: %s , time %d",
            wifipack.WifiPrint,
            wifipack.timestamp
        );
    }

    /**
     * @dev 回调函数，收到ETH释放PaymentReceived事件
     */
    receive() external payable virtual {
        emit downloadReceived(msg.sender, msg.value);
    }

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
        emit requestAdd(msg.sender,request_s.id,request_s.all_price,request_s.count);
    }

    //返回uploader具有的wifi[]
    function fetch_wifi_byUploaderAddr(
        address uploader
    ) public view returns (WifiPack[] memory) {
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

    //返回downloader具有的wifi[]
    function fetch_wifi_byDownloaderAddr(
        address downloader
    ) public view returns (WifiPack[] memory) {
        WifiPack[] memory pack = DownloaderAddrToWifi[downloader];
        uint count = pack.length;
        require(count >= 0, "you haven't download wifi");
        WifiPack[] memory wifipack = new WifiPack[](count);

        uint index = 0;
        for (uint i = 0; i < pack.length; i++) {
            WifiPack storage wifi = idToWifiPack[pack[i].id];
            wifipack[index] = wifi;
            index++;
        }

        return wifipack;
    }

    //返回符合download_request条件的wifi[]
    function fetch_wifi_byRequestId(
        uint requestId
    ) public view returns (WifiPack[] memory) {
        require(requestId >= 0, "wrong requestid");
        download_request memory requestItem = idTodownload_request[requestId];
        require(requestItem.is_pay == true, "you need to pay for download");
        require(requestIdtodownloader[requestId] == msg.sender,"wrong user");
        
        uint count = requestItem.count;
        WifiPack[] memory pack = idToRequest_wifipack[requestId];
        WifiPack[] memory wifipack = new WifiPack[](count);

        uint index = 0;
        for (uint i = 0; i < pack.length; i++) {
            WifiPack storage wifi = idToWifiPack[pack[i].id];
            wifipack[index] = wifi;
            index++;
        }

        return wifipack;
    }

    //根据request信息交钱并分发
    function PayDownload_byRequestId(uint requestId) public payable {
        require(requestId >= 0, "wrong RequestId");

        download_request memory requestItem = idTodownload_request[requestId];
        require(requestItem.is_pay == false, "Already paid");

        uint256 all_price = requestItem.all_price;
        require(msg.value >= all_price, "More money need to pay");

        WifiPack[] memory pack = idToRequest_wifipack[requestId];
        uint256 count_payee = 0;
        require(pack.length > 0, "No suitable wifi");
        for (uint256 i = 0; i < pack.length; i++) {
            //添加受益人
            address uploader_addr = pack[i].uploader;
            address shop_addr = pack[i].Shop;
            if (!addressExists[uploader_addr]) {
                count_payee++;
                addressNumber[uploader_addr] = count_payee;
                addressExists[uploader_addr] = true;
            }
            if (!addressExists[shop_addr]) {
                count_payee++;
                addressNumber[shop_addr] = count_payee;
                addressExists[shop_addr] = true;
            }
        }

        address[] memory _payees = new address[](count_payee);
        uint256[] memory _shares = new uint256[](count_payee);

        for (uint256 i = 0; i < pack.length; i++) {
            uint256 up_id = addressNumber[pack[i].uploader] - 1;
            uint256 shop_id = addressNumber[pack[i].Shop] - 1;
            _payees[up_id] = pack[i].uploader;
            _shares[up_id] += (pack[i].Price * 8) / 10;
            _payees[shop_id] = pack[i].Shop;
            _shares[shop_id] += (pack[i].Price * 1) / 10;
            //把wifi数据给downloader
            DownloaderAddrToWifi[msg.sender].push(pack[i]);
            emit Download_Wifiprint(
                pack[i].WifiPrint,
                pack[i].location,
                pack[i].timestamp
            );
            emit PayeeAdded(_payees[up_id], _shares[up_id]);
            emit PayeeAdded(_payees[shop_id], _shares[shop_id]);
        }
        uint256 currelease = 0;

        for (uint256 i = 0; i < _payees.length; i++) {
            if (_shares[i] == 0) {
                continue;
            } else {
                address payable _account = payable(_payees[i]);
                _account.transfer(_shares[i]);
                emit PaymentReleased(_account, _shares[i]);
                currelease += _shares[i];
            }
            //清空状态
            addressNumber[_payees[i]] = 0;
            addressExists[_payees[i]] = false;
        }
        //此请求完成
        idTodownload_request[requestId].is_pay= true;
        requestIdtodownloader[requestId] = msg.sender;
        //如果钱转多了则返还
        if (msg.value - all_price > 0) {
            address payable _account2 = payable(msg.sender);
            _account2.transfer(msg.value - all_price);
            emit PaymentReleased(_account2, msg.value - all_price);
        }
    }
}
