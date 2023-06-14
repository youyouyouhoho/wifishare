import Header from "./header";
import { ConnectButton } from "@web3uikit/web3";

export default function PleaseConnectWallet() {
    const backgroundStyle = {
        width: 1200, height: 600, display: "flex", alignItems: "center",
        justifyContent: "center", backgroundColor: "#ebf6f4", color: "black",
        borderRadius: 10, margin: 10
    }

    const fontStyle = {
        width: 1200, height: 55, display: "flex", alignItems: "center",
        justifyContent: "center", color: "#534d4c",
        borderRadius: 10, fontSize: 30, position: "absolute", top: 300
    }

    return (
        <nav className="connect page">
            <div>
                <Header />
                <div style={backgroundStyle}>
                    <p style={fontStyle}>Please connect to a Wallet</p>
                    <ConnectButton/>
                </div>
            </div>
        </nav>
    )
}