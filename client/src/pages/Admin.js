import React, {useEffect, useState} from 'react';
import {
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";

import CreateProduct from "../components/modals/CreateProduct";
import CreateCategory from "../components/modals/CreateCategory";
import CreateType from "../components/modals/CreateType";
import {getAllProductsInAdminPage} from "../http/productAPI";
import {NavLink} from "react-router-dom";
import {PRODUCT_EDIT_ROUTE} from "../utils/consts";
import DeleteCategoryOrType from "../components/modals/DeleteCategoryOrType";

const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [deleteCategoryOrType, setDeleteCategoryOrType] = useState(false);

    const [searchProduct, setSearchProduct] = useState('');
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    //pagination
    const limit = 5;
    //const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < 16; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    useEffect(() => {
        getAllProductsInAdminPage(searchProduct, currentPage, filter).then(({count, rows}) => {
            setSearchedProduct(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllProductsInAdminPage(searchProduct, 1, filter).then(({count, rows}) => {
            setSearchedProduct(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchProduct = () => {
        getAllProductsInAdminPage(searchProduct, currentPage, filter).then(({count, rows}) => {
            setSearchedProduct(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    return (
        <Container className="d-flex flex-column">
            {showSuccessMsg && <p>{successMsg}</p>}
            <Button
                onClick={() => setTypeVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add type
            </Button>
            <Button
                onClick={() => setCategoryVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add category
            </Button>
            <Button
                onClick={() => setProductVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add product
            </Button>
            <Button
                onClick={() => setDeleteCategoryOrType(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Delete type of category
            </Button>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteCategoryOrType show={deleteCategoryOrType} onHide={() => setDeleteCategoryOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>

            <Dropdown className="mt-5 mb-3" style={{margin: "0 auto"}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {filter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {filter === "All" ? <Dropdown.Item disabled>All</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("All")}>All</Dropdown.Item>}
                    {filter === "Without Category or Type" ? <Dropdown.Item disabled>Without Category or Type</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Without Category or Type")}>Without Category or Type</Dropdown.Item>}
                </Dropdown.Menu>
            </Dropdown>

            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchProduct}
                    onChange={e => setSearchProduct(e.target.value)}
                    placeholder="Input product name..."
                />
                <Button
                    onClick={fetchProduct}
                    variant="outline-dark"
                    className="ml-2"
                >
                    Search
                </Button>
            </InputGroup>

            <ListGroup>
                {searchedProduct && searchedProduct.map( ({id, img, category, type, price, name}) => {
                    return (
                        <ListGroup.Item className="mt-3" key={id}>
                            <Row>
                                <Col xs={2}>
                                    <Image width={150} src={process.env.REACT_APP_API_URL + img}/>
                                </Col>
                                <Col xs={8}>
                                    <Row>
                                        <Col xs={12}>
                                            <NavLink to={PRODUCT_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Name: {name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Price: {price}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Category: {category.name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Type: {type.name}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <NavLink to={PRODUCT_EDIT_ROUTE + `/${id}`}>Edit</NavLink>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {searchedProduct && searchedProduct.length > 0 ? pages : false}
            </Pagination>
        </Container>
    );
};

export default Admin;