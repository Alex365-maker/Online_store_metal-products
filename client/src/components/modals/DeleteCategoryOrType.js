import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteCategory, deleteType, fetchCategorys, fetchTypes} from "../../http/productAPI";

const DeleteCategoryOrType = ({show, onHide, showSuccessMsgFunc}) => {
    const [categoryOrType, setCategoryOrType] = useState("Category");
    const [categorys, setCategorys] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectCategory, setSelectCategory] = useState({name: "A Category not selected"});
    const [selectType, setSelectType] = useState({name: "A type not selected"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
        fetchCategorys().then(data => setCategorys(data));
    }, []);

    const Delete = async () => {
        if(categoryOrType === "Category") {
            if(selectCategory.name !== "A Category not selected") {
                await deleteCategory(selectCategory.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectCategory({name: "A Category not selected"});
                });
            } else {
                setMsgErr("Please choose Category");
                setShowMsgErr(true);
            }
        } else {
            if(selectType.name !== "A Type not selected") {
                await deleteType(selectType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectType({name: "A type not selected"});
                });
            } else {
                setMsgErr("Please choose Type");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectType, selectCategory, categoryOrType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Type or Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Choose Category:
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {categoryOrType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {categoryOrType === "Category" ? <Dropdown.Item disabled>Category</Dropdown.Item> : <Dropdown.Item onClick={() => setCategoryOrType("Category")}>Category</Dropdown.Item>}
                        {categoryOrType === "Type" ? <Dropdown.Item disabled>Type</Dropdown.Item> : <Dropdown.Item onClick={() => setCategoryOrType("Type")}>Type</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Choose item of {categoryOrType === "Category" ? "Category" : "Type"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {categoryOrType === "Category" ? selectCategory.name : selectType.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {categoryOrType === "Category" ?
                            categorys.map(({id, name}) =>
                                selectCategory.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectCategory({id, name})}>{name}</Dropdown.Item>
                            )
                            :
                            types.map(({id, name}) =>
                                selectType.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectType({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={Delete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCategoryOrType;