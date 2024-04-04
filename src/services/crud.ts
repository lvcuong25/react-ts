// import { ICart } from "../../interfaces/ICart";
// import { ICategory } from "../../interfaces/ICategory";
// import { IProduct } from "../../interfaces/IProduct";
// import { IUser } from "../../interfaces/IUser";
// import axiosApi from "../config/axios";

import axiosApi from "../components/config/axios";
import { ICart } from "../interface/ICart";
import { ICategory } from "../interface/ICategory";
import { IProduct } from "../interface/IProduct";
import { IUser } from "../interface/IUser";

export const getApi = async (url: string) => {
    try {
        const response = await axiosApi.get(url);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postApi = async (url: string, data: ICategory | IProduct | IUser | ICart) => {
    try {
        const response = await axiosApi.post(url, data);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const patchApi = async (url: string, data: ICategory | IProduct | IUser | ICart) => {
    try {
        const response = await axiosApi.patch(url, data);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const activeApi = async (url: string, data: ICategory | IProduct | IUser) => {
    try {
        const response = await axiosApi.patch(url, { ...data });
        return response.data;
    }
    catch (error) {
        return error;
    }
}
export const deleteApi = async (url: string) => {
    try {
        const response = await axiosApi.delete(url);
        return response.data;
    }
    catch (error) {
        return error;
    }
}
