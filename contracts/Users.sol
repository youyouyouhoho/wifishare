// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
import"./WifiInfos.sol";
import "hardhat/console.sol";
contract users is WifiPrintPack{
    struct User{
        address addr;
        string name;
        uint256 account_balance;
        bool is_shop; 
    }
    mapping (address => User) AddrToUser_map;

    mapping(string => string) testmap;

    event upload_wifiprint(address indexed addr,string indexed  location,uint256 price,uint256 time);
    event create_user(address indexed addr,string indexed name);

    modifier _checkIfOlduser() {
        User memory user = AddrToUser_map[msg.sender];
        require(user.addr == address(0), "User account already exists");
        _;
    }

    function createUser(string memory username, bool is_shop) public _checkIfOlduser() {

        User memory user = User(msg.sender, username, 0, is_shop);
        AddrToUser_map[msg.sender] = user;
        emit create_user(msg.sender, username);
    }


    function Upload_Wifiprint(string memory _wifiprint , string memory location,uint256  _price , address shop ) public 
    { 
        // require(AddrToUser_map[msg.sender].addr == msg.sender, "Uploader must be an existing user.");
        WifiPack memory wifipack = WifiPack(_price,_wifiprint,location,shop,msg.sender,block.timestamp);
        LocationToWifi[location].push(wifipack);
        AddrToWifi[msg.sender].push(wifipack);
        emit upload_wifiprint(msg.sender, location, _price,block.timestamp);

        console.log("Wifi has upload: %s , time %d" , wifipack.WifiPrint,wifipack.timestamp);

    }
    


    function getVaultBalance() public view returns (uint256 bal) {
        bal = address(this).balance;
    }

    function test (string memory ab,string memory c) public {
        testmap[ab] = c;
    }
}

