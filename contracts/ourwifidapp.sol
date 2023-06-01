// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;


import "./Users.sol";
import "hardhat/console.sol";

contract Ourwifidapp is users {
        // 事件
    event PayeeAdded(address account, uint256 shares); // 增加受益人事件
    event PaymentReleased(address to, uint256 amount); // 受益人提款事件
    event PaymentReceived(address from, uint256 amount); // 合约收款事件

    uint256 public totalShares; // 总份额
    uint256 public totalReleased; // 总支付

    mapping(address => uint256) public shares; // 每个受益人的份额
    mapping(address => uint256) public released; // 支付给每个受益人的金额
    address[] public payees; // 受益人数组

    mapping(address => bool)addressExists;
    mapping(address => uint256)addressNumber;
    event downloadReceived(address to, uint256 amount);
     
    event show_price(uint256 a,uint256 b);

    event Download_Wifiprint(string wifi,string location,uint256 time);

    /**
     * @dev 回调函数，收到ETH释放PaymentReceived事件
     */
    receive() external payable virtual {
        emit downloadReceived(msg.sender, msg.value);
    }

    function Download_Wifiprint2(string memory location, uint256 time) public payable returns (WifiPack[] memory wifipack) {
        WifiPack[] memory pack = LocationToWifi[location];
        uint256 count = 0;
        uint256 count_payee = 0;
        uint256 all_price = 0;
        require(pack.length > 0, "No suitable length");
        for (uint256 i = 0; i < pack.length; i++) {
            if (pack[i].timestamp >= time) {
                count++;
                all_price += pack[i].Price;
                address uploader_addr = pack[i].uploader;
                address shop_addr = pack[i].Shop;
                if(!addressExists[uploader_addr])
                {
                    
                    count_payee++;
                    addressNumber[uploader_addr] = count_payee;
                    addressExists[uploader_addr] = true;
                }
                if(!addressExists[shop_addr])
                {
                    count_payee++;
                    addressNumber[shop_addr] = count_payee;
                    addressExists[shop_addr] = true;
                }
            }
        }

        require(
            msg.value >= all_price ,
            string(abi.encodePacked("More funds required to download all WifiPrints. Please send at least ", all_price, " wei to download all WifiPrints"))
        );
        require(count > 0, "No suitable WifiPrints found");

        address[] memory _payees = new address [](count_payee);
        uint256[] memory _shares = new uint256[](count_payee);
        wifipack = new WifiPack[](count);
        uint256 index = 0;
 
        for (uint256 i = 0; i < pack.length; i++) {
            if (pack[i].timestamp >= time) {
                uint256 up_id = addressNumber[pack[i].uploader] - 1;
                uint256 shop_id = addressNumber[pack[i].Shop] - 1;
                _payees[up_id] =  pack[i].uploader;
                _shares[up_id] += (pack[i].Price*4)/10;
                _payees[shop_id] =  pack[i].Shop;
                _shares[shop_id] += (pack[i].Price*1)/10;

                emit PayeeAdded(_payees[up_id],_shares[up_id]);
                emit PayeeAdded(_payees[shop_id],_shares[shop_id]);
                wifipack[index] = pack[i];
                index++;
               
            }
        }  
        uint256 currelease = 0;
        for(uint256 i = 0; i < index ; i++)
        {
        emit Download_Wifiprint(wifipack[i].WifiPrint, wifipack[i].location,wifipack[i].timestamp);
        }
        for (uint256 i = 0; i < _payees.length; i++) {
            if(_shares[i] == 0)
            {
                continue;
            }
            else
            {
                address payable _account = payable(_payees[i]);
                _account.transfer(_shares[i]);
                emit PaymentReleased(_account, _shares[i]);
                currelease += _shares[i];
            }
            addressNumber[_payees[i]] = 0;
            addressExists[_payees[i]] = false;
        }
        if(msg.value - all_price > 0)
        {
        address payable _account2 = payable(msg.sender);
        _account2.transfer(msg.value - all_price);
        emit PaymentReleased(_account2, msg.value - all_price); 
        }
        
        return wifipack;
    }
   
      
}
