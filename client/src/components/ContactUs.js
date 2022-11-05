import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(form.current);
        emailjs.sendForm('service_dtgcv1a', 'template_jl1hese', form.current, 'sQ0enj6nlhuhTSXG-')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Email</label>
            <input type="email" name="user_email" />
            <input type="submit" value="Send" />
        </form>
    );
};