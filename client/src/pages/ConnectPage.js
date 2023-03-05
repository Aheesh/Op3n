import React from "react";
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { useState } from "react";
import { Navigate } from "react-router-dom";
// import { InjectedConnector } from 'wagmi/connectors/injected'
//import { ConnectButton } from "@rainbow-me/rainbowkit";

function ConnectPage() {

    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()

    const connectorsList = () => {
        let tempList = []
        let tempListNames = []
        for (let i = 0; i < connectors.length; i++) {
            if(!tempListNames.includes(connectors[i].name)){
                tempList.push(connectors[i]);
                tempListNames.push(connectors[i].name);
            }
        }
        return tempList;
    }

    const render = () => {
        if (!isConnected) {
            return <>{error && <div>{error.message}</div>}
            {connectorsList().map((connector, index) => (
                <button className='wallet-btn connection-option' disabled={!connector.ready} key={index} onClick={() => connect({ connector })}>
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                </button>
            ))} 
            </>
        }
        else {
            return<>
                <div>Connected to {ensName ?? address}</div>
                <button className='wallet-btn' onClick={disconnect}>Disconnect</button>
            </>
        }
    };

    const [action, setAction] = useState('none')
    function sendAction(event){
        setAction(event.target.getAttribute('action'));
    }
    const render2 = () => {
        if (action == "back") {
            return <Navigate to='/' />;
        }
    };

    return (
        <>
            <div>
                <h2>Connect Wallet</h2>
                <button action='back' onClick={sendAction}>Cancel <i>[]</i></button>
            </div>
            <div className='connection-menu'>
                {render()}
            </div>
            {/* {isConnected ? <div>Connected to {ensName ?? address}</div> : <button onClick={() => connect()}>Connect Wallet</button>} */}
            {render2()}
        </>
    );
}

export default ConnectPage;