import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import DisplayMessage from "../components/DisplayMessage";

function ViewMessagePage() {
    const { msgAddress } = useParams();
    //TODO: GET MESSAGE DATA FROM BACKEND USING THE ADDRESS PARAM GOTTEN ABOVE FROM URL
    const msgData = {
        address: 'ADDRESS',
        sender: 'SENDER',
        date: 'DATE',
        subject: 'SUBJECT',
        content: 'CONTENT'
    }

    const [action, setAction] = useState('none')
    function sendAction(event){
        setAction(event.target.getAttribute('action'));
    }
    const render = () => {
        if (action == "send") {
            return <Navigate to='/send' />;
        }
    };

    return (
        <>
            <div>
                <h2>View Message</h2>
                <button action='send' onClick={sendAction}>Reply <i>[]</i></button>
            </div>
            <DisplayMessage messageData={msgData}/>
            {render()}
        </>
    );
}

export default ViewMessagePage;