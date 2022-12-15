import { ethers } from "ethers";
import React, { useState } from "react";
import Button1 from "../../utils/Buttons/Button1/Button1";

const CheckoutCrypto = ({ amount }) => {
    const [error, setError] = useState("");
    const sendTrans = async (e) => {
        e.preventDefault();
        try {
            if (!window.ethereum) {
                return setError("No crypto wallet found. Please install it.");
            }

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(
                "0x98475D04ECe6B74F9C391A778Dd672e2a95e934d"
            );
            const tx = await signer.sendTransaction({
                to: "0x98475D04ECe6B74F9C391A778Dd672e2a95e934d",
                value: ethers.utils.parseEther(amount.toString()),
            });
            const confirm = [tx];
            if (confirm.length >= 1) {
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Button1
                onClick={sendTrans}
                txt="Kirim Etherium"
                bck="var(--primary)"
                hovBck="blue"
                color="var(--white)"
                extraCss={{
                    fontSize: "1rem",
                    border: "none",
                    borderRadius: "5px",
                    width: "100%",
                    margin: "0.5rem 0",
                    padding: "1rem",
                }}
            />
            {error && <span style={{ color: "red" }}>{error}</span>}
        </>
    );
};

export default CheckoutCrypto;
