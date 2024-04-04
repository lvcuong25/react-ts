/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { postApi, patchApi, activeApi, deleteApi } from "../services/crud"
import { IProduct } from './../../interfaces/IProduct';
import { ICategory } from "../../interfaces/ICategory";
import { IUser } from "../../interfaces/IUser";
import { ICart } from "../../interfaces/ICart";
import { toast } from "sonner";

export const useProductMutation = (action: "CREATE" | "UPDATE" | "DELETE", navigatePage: string, success?: string) => {
    const path = 'products'
    const queryClient = useQueryClient()
    const form = useForm<IProduct>()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: IProduct) => {
            if (action === "CREATE") {
                return await postApi(path, data)
            } else if (action === "UPDATE") {
                return await patchApi(`${path}/${data.id}`, data)
            } else if (action === "DELETE") {
                return await activeApi(`${path}/${data.id}`, data)
            }
            return null
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path],
            })
            success && toast.success(success)
            if (navigatePage != 'none') {
                navigate(navigatePage)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data: IProduct) => {
        mutate(data)
    }
    return { mutate, form, onSubmit, ...rest }
}

export const useCategoryMutation = (action: "CREATE" | "UPDATE" | "DELETE", navigatePage: string, success?: string) => {
    const path = 'category'
    const queryClient = useQueryClient()
    const form = useForm<ICategory>()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: ICategory) => {
            if (action === "CREATE") {
                return await postApi(path, data)
            } else if (action === "UPDATE") {
                return await patchApi(`${path}/${data.id}`, data)
            } else if (action === "DELETE") {
                return await activeApi(`${path}/${data.id}`, data)
            }
            return null
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path],
            })
            success && toast.success(success)
            if (navigatePage != 'none') {
                navigate(navigatePage)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data: ICategory) => {
        mutate(data)
    }
    return { mutate, form, onSubmit, ...rest }
}

export const useUserMutation = (action: "CREATE" | "UPDATE" | "ACTIVE", navigatePage: string, success?: string) => {
    const path = 'users'
    const queryClient = useQueryClient()
    const form = useForm<IUser>()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: IUser) => {
            if (action === "CREATE") {
                return await postApi(path, data)
            } else if (action === "UPDATE") {
                return await patchApi(`${path}/${data.id}`, data)
            } else if (action === "ACTIVE") {
                return await activeApi(`${path}/${data.id}`, data)
            }
            return null
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path],
            })
            success && toast.success(success)
            if (navigatePage != 'none') {
                navigate(navigatePage)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data: IUser) => {
        mutate(data)
    }
    return { mutate, form, onSubmit, ...rest }
}

export const useCartMutation = (action: "CREATE" | "UPDATE" | "DELETE", success?: string) => {
    const path = 'cart'
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: ICart) => {
            if (action === "CREATE") {
                return await postApi(path, data)
            } else if (action === "UPDATE") {
                return await patchApi(`${path}/${data.id}`, data)
            } else if (action === "DELETE") {
                return await deleteApi(`${path}/${data.id}`)
            }
            return null
        },
        onSuccess: () => {
            success && toast.success(success)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    return { mutate, ...rest }
}