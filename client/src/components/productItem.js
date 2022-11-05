import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

import star from './../assets/star.png';
import {useHistory} from 'react-router-dom';
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    const history = useHistory();
    console.log(product);
    return (
        <Col md={3} className="mt-3" onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
            <Card
                className="p-2"
                style={{width: "190px", minHeight: "190px", cursor: "pointer"}}
                border={"Light"}
            >
                <Image style={{width: "130px"}} src={process.env.REACT_APP_API_URL + product.img}/>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="text-black-50">{product && product.category.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{product.rating}</div>
                        <Image className="ml-1" src={star} style={{width: "15px", height: "15px"}}/>
                    </div>
                </div>
                <div>{product.name}</div>
            </Card>
        </Col>
    );
};

export default ProductItem;