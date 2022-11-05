import {Button, Nav} from "react-bootstrap";
import React, {useContext} from "react";
import {Context} from "../../../index";
import {useHistory} from "react-router-dom";
import {ADMIN_ROUTE, ORDERS_ROUTE} from "../../../utils/consts";
import BasketNavBar from "../BasketNavBar";

const TrueAuth = () => {
    const {user, basket} = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        basket.resetBasket();
    }
if(user.User.role==="ADMIN"){
    let adminPanel = <Button
    className={"mr-3"}
    variant={"outline-light"}
    onClick={() => {history.push(ADMIN_ROUTE)}}
>
    Admin panel
</Button>
}
    return (
        <Nav className="ml-auto" style={{color: "white"}}>
            <BasketNavBar/>
            {user.isAuth && user.User.role === "ADMIN" && <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(ORDERS_ROUTE)}}
            >
                Orders
            </Button>}

            {
               user.User.role === "ADMIN" ? <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(ADMIN_ROUTE)}}
            >
                Admin panel
            </Button> : <></>
            } 
            
            
            <Button
                variant={"outline-light"}
                onClick={() => logOut()}
            >
                Log off
            </Button>
        </Nav>
    );
};

export default TrueAuth;