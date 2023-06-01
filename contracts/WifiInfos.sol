// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

contract WifiPrintPack{
    struct WifiPack{
        uint256 Price;
        string WifiPrint;
        string location;
        address Shop;
        address uploader;
        uint256 timestamp;
    }

    //由地点指向WifiPack的map，便于查询
    mapping (string => WifiPack[]) LocationToWifi;
    //由账户指向WifiPack的map
    mapping (address => WifiPack[]) AddrToWifi;

    

}

