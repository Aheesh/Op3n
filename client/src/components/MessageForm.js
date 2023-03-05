import React from "react";

function MessageForm() {
    const handleFormSubmit = (event) => {
        event.preventDefault();
      };

    return (
        <form id="message-form" onSubmit={handleFormSubmit}>
            <label className='formLabel'>To (ETH address)</label>
            <input type='text' placeholder="0xB01A..." className='formField'></input>
            <label className='formLabel'>Subject</label>
            <input type='text' placeholder="Subject" className='formField'></input>
            <label className='formLabel'>Message</label>
            <textarea placeholder="Message" className='formField' rows='20' ></textarea>
            <button type="submit">Send <i>[]</i></button>
        </form>
    );
}

export default MessageForm;
