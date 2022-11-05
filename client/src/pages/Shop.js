import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategorys, fetchProduct, fetchTypes} from "../http/productAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {product} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchCategorys().then(data => product.setCategorys(data));
        fetchProduct(null, null, 1, 9).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(product.selectedType === "all") {
                    fetchProduct(null, product.selectedCategory.id, product.page, 9).then(data => {
                        product.setProducts(data.rows);
                        product.setTotalCount(data.count);
                    });
                } else {
                    fetchProduct(product.selectedType.id, product.selectedCategory.id, product.page, 9).then(data => {
                        product.setProducts(data.rows);
                        product.setTotalCount(data.count);
                    });
                }
        }, [product.page, product.selectedType, product.selectedCategory],
    );

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <CategoryBar/>
                    <ProductList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;