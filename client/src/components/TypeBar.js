import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {product} = useContext(Context);

    const getAllProducts = () => {
        product.setSelectedType("all");
        product.setSelectedCategory("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                active={"all" === product.selectedType}
                onClick={getAllProducts}
            >
                All
            </ListGroup.Item>
            {product.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === product.selectedType.id}
                    key={type.id}
                    onClick={() => product.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;