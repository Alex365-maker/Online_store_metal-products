import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const CategoryBar = observer(()  => {
    const {product} = useContext(Context);
    return (
        <Row className="d-flex">
            {product.categorys.map(category =>
                <Card
                    style={{cursor: "pointer"}}
                    border={category.id === product.selectedCategory.id ? "danger" : "light"}
                    key={category.id}
                    className="p-3"
                    onClick={() => product.setSelectedCategory(category)}
                >
                    {category.name}
                </Card>
            )}
        </Row>
    );
});

export default CategoryBar;