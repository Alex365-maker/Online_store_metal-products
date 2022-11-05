import {Button, Nav} from "react-bootstrap";
import React from "react";
import {useHistory} from "react-router-dom";
import {ABOUT_ROUTE} from "../../../utils/consts";

const FullAuth = () => {
    const history = useHistory();

    return (
        <Nav className="ml-auto" style={{color: "white"}}>
            <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(ABOUT_ROUTE)}}
            >
                About company
            </Button>
        </Nav>
    );
};

export default FullAuth;