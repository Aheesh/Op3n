import React from "react";
import { useState } from "react";

function MessageForm() {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        content: ''
    })

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
      };
    

    const handleFormSubmit = (event) => {
        event.preventDefault();
        //SEND MESSAGE USING STATE DATA
      };

    return (
        <form id="message-form" onSubmit={handleFormSubmit}>
            <label htmlFor='to' className='formLabel'>To (ETH address)</label>
            <input id='to' type='text' placeholder="0xB01A..." className='formField' onChange={handleInputChange}></input>
            <label htmlFor='subject' className='formLabel'>Subject</label>
            <input id='subject' type='text' placeholder="Subject" className='formField' onChange={handleInputChange}></input>
            <label htmlFor='content' className='formLabel'>Message</label>
            <textarea id='content' placeholder="Message" className='formField' rows='20' onChange={handleInputChange}></textarea>
            <button type="submit">Send <i>[]</i></button>
        </form>
    );
}

export default MessageForm;
