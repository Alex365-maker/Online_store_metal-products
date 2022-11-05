import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {createProduct, fetchCategorys, fetchTypes} from "../../http/productAPI";
import {observer} from "mobx-react-lite";

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [price_title, setPrice_title] = useState('');
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchCategorys().then(data => product.setCategorys(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addProduct = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('weight', `${weight}`);
        formData.append('price_title', `${price_title}`);
        formData.append('img', file);
        formData.append('categoryId', product.selectedCategory.id);
        formData.append('typeId', product.selectedType.id);
        formData.append('info', JSON.stringify(info));
        console.log(formData);
        createProduct(formData).then(() => onHide());
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{product.selectedType.name || "Choose your Type"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => product.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{product.selectedCategory.name || "Choose your Category"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.categorys.map(category =>
                                <Dropdown.Item
                                    key={category.id}
                                    onClick={() => product.setSelectedCategory(category)}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Input name your product..."
                    />
                    <Form.Control
                        value={price_title}
                        onChange={e => setPrice_title(e.target.value)}
                        className="mt-3"
                        placeholder="Input price title..."
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice((e.target.value))}
                        className="mt-3"
                        placeholder="Input name price for the product..."

                    />
                    <Form.Control
                        value={weight}
                        onChange={e => setWeight((e.target.value))}
                        className="mt-3"
                        placeholder="Input name price for the weight..."

                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant="outline-dark"
                        onClick={() => addInfo()}
                    >
                        Add new property
                    </Button>
                    {info.map(item =>
                        <Row key={item.number} className="mt-3">
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Input title for the product..."
                                    value={item.title}
                                    onChange={e => changeInfo('title', e.target.value, item.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Input description for the product..."
                                    value={item.description}
                                    onChange={e => changeInfo('description', e.target.value, item.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => deleteInfo(item.number)}
                                >
                                    Delete new property
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addProduct}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;