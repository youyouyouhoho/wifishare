import { ConnectButton } from "@web3uikit/web3";
import Link from "next/link";

export default function Header() {
    const fontStyle = {
        width: 360, height: 66,
        display: "flex", alignItems: "center",
        justifyContent: "center", backgroundColor: "white", color: "black",
        borderRadius: 10, margin: 10, fontSize: 36
    }

    const buttonStyle = {
        width: 789, height: 100,
        display: "flex", // 取消位置固定
        backgroundColor: "white",
        justifyContent: "right", // 行居中
        alignItems: "center", // 列居中
        color:"#534d4c",
        fontSize: 30
    }

    return (
        <nav className="p-5 border-b-2 flex flex-row">
            <div className="logo" >
                <img src="/logo.ico"></img>
            </div>

            <div style={fontStyle}> 
                <Link id="wifi share demo" href={"."} onMouseOver={
                    async() =>{
                        var button = document.getElementById("wifi share demo");
                        button.style.backgroundColor="#f2e4e4";

                        button.onmouseout = function() {
                            this.style.backgroundColor = "";
                        }
                    }}>Wifi Share Demo</Link>  
            </div>

            <div style={buttonStyle} align="right">
                <ConnectButton/>
            </div>
        </nav>
    )
}