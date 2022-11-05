import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from './../assets/star.png';
import {useParams} from 'react-router-dom';
import {addProductToBasket, addRating, checkRating, fetchOneProduct} from "../http/productAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import RatingStars from "../components/ratingStars";

const ProductPage = observer(() => {
    const {user, basket} = useContext(Context);
    const [product, setProduct] = useState({info: []});
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setSsAccessRating] = useState(false);
    const {id} = useParams();


    useEffect( () => {
        fetchOneProduct(id).then(data => setProduct(data));
        if(user.isAuth) {
            checkRating({productId: id}).then(res => setSsAccessRating(res.allow));
        }
    },[id, resRate]);

    const isProductInBasket = () => {
        const findProduct = basket.Basket.findIndex(item => Number(item.id) === Number(product.id));
        return findProduct < 0;
    }

    const addProductInBasket = (product) => {
        if(user.isAuth) {
            addProductToBasket(product).then(() => basket.setBasket(product, true))
        } else {
            basket.setBasket(product);
        }
    }

    const ratingChanged = (rate) => {
        addRating({
            rate,
            productId: id
        }).then(res => {
            setResRate(res);
        });
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={"100%"} src={process.env.REACT_APP_API_URL + product.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{product.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ background:`url(${bigStar}) no-repeat`, backgroundSize: "cover", width: 80, height: 80, fontSize: 28}}
                        >
                            {product?.rating || 0}
                        </div>
                        <RatingStars
                            ratingChanged={ratingChanged}
                            ratingVal={product?.rating || 0}
                            isAuth={user.isAuth}
                            isAccessRating={isAccessRating}
                        />
                        {resRate}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >

                        <h3>{product?.price_title || 0}</h3>
                        <h3>{product?.price || 0} RUB</h3>
                        <h3>{product?.weight || 0} KG</h3>
                        { isProductInBasket() ?
                            <Button variant="outline-dark" onClick={() => addProductInBasket(product)}>Add to Cart</Button>
                            :
                            <Button variant="outline-dark" disabled>Product already in basket</Button>
                        }

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Characteristics</h1>
                {product.info.map( (info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default ProductPage;


/**
 * @param {{rating}} rating of product
 * @param {{price}} price of product
 */