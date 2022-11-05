import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createCategory} from "../../http/productAPI";

const CreateCategory = ({show, onHide}) => {
    const [value, setValue] = useState('');
    const addCategory = () => {
        createCategory({name: value}).then(data => {
            setValue('')
            onHide();
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Input name your category..."
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={() => addCategory()}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;