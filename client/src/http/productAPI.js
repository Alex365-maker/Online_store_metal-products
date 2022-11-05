import {$authHost, $host} from "./index";
import alert from "bootstrap/js/src/alert";
export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/type/'+id});
    return data;
}

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category);
    return data;
}

export const fetchCategorys = async () => {
    const {data} = await $host.get('api/category');
    return data;
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/category/'+id});
    return data;
}

export const createProduct = async (category) => {
    const {data} = await $authHost.post('api/product', category);
    return data;
}

export const fetchProduct = async (typeId, categoryId, page, limit = 9, weight) => {
    const {data} = await $host.get('api/product', {params: {
            typeId, categoryId, page, limit, weight
        }});
    return data;
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get(`api/product/${id}`);
    return data;
}

export const fetchDeleteProduct = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/product/${id}`});
    return data;
}

export const updateProducts = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/product/${id}`, data: body});
    return data;
}

export const getAllProductsInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/product/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

export const addProductToBasket = async (product) => {
    const {data} = await $authHost.post('api/basket', product);
    return data;
}

export const getProductFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteProductFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}

export const addRating = async (body) => {
    const {data} = await $authHost.post('api/rating', body);
    return data;
}

export const checkRating = async (body) => {
    const {data} = await $authHost.post('api/rating/check-rating', body);
    return data;
}