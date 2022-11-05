import React, {useContext, useRef, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";
import {useHistory} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {ContactUs} from "../components/ContactUs";
import emailjs from "@emailjs/browser";

const Ordering = () => {
    const {basket, user} = useContext(Context);
    const [phone, setPhone] = useState(null);
    const history = useHistory();

    // const buy = () => {
    //     let order = {
    //         mobile: phone,
    //         basket: basket.Basket
    //     }
    //
    //     if(user.isAuth) {
    //         order.auth = true;
    //     }
    //
    //     sendOrder(order).then(data => {
    //         console.log(data);
    //         basket.setDeleteAllProductFromBasket();
    //         history.push(SHOP_ROUTE);
    //     });
    // }

    const form = useRef();

    const sendEmail = (e) => {
e.preventDefault()
        console.log(form.current);
        emailjs.sendForm('service_dtgcv1a', 'template_jl1hese', form.current, 'sQ0enj6nlhuhTSXG-')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        let order = {
            mobile: phone,
            basket: basket.Basket
        }

        if(user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            console.log(data);
            basket.setDeleteAllProductFromBasket();
            history.push(SHOP_ROUTE);
        });
    };

    return (
        <>
            {/*<Form>*/}
            {/*    <Form.Control*/}
            {/*        placeholder="Input your phone..."*/}
            {/*        value={phone}*/}
            {/*        onChange={e => setPhone(e.target.value)}*/}
            {/*    />*/}
            {/*</Form>*/}
            <form ref={form} onSubmit={sendEmail}>
                <input     placeholder="Input your phone..."
                           value={phone}
                           onChange={e => setPhone(e.target.value)} />
                <label>Email</label>
                <input type="email" name="user_email" />
                {/*<input type="submit" value="Send" />*/}
                <Row className="mt-3">
                    <Col xs={12}>
                        <Button type={"submit"} value="Send" variant="secondary">Buy</Button>
                    </Col>
                </Row>
            </form>
            {/*<ContactUs />*/}

        </>
    );
};

export default Ordering;