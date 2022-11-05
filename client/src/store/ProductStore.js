import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = [];
        this._categorys = [];
        this._products = [];
        this._selectedType = {};
        this._selectedCategory = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 9;
        makeAutoObservable(this);
    }

    setSelectedType(selectedType) {
        this.setPage(1);
        this._selectedType = selectedType;
    }
    setSelectedCategory(selectedCategory) {
        this.setPage(1);
        this._selectedCategory = selectedCategory;
    }
    setTypes(types) {
        this._types = types;
    }
    setCategorys(categorys) {
        this._categorys = categorys;
    }
    setProducts(products) {
        this._products = products;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get types() {
        return this._types;
    }
    get categorys() {
        return this._categorys;
    }
    get products() {
        return this._products;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedCategory() {
        return this._selectedCategory;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}