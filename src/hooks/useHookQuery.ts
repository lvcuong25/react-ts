import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services/crud";

// Định nghĩa các props cho custom hook useHookQuery
type props = {
    path: string,
    limitProductOnPage?: number,
    id?: number,
    mustHaveID?: boolean
    active?: boolean
}

// Custom hook useHookQuery để thực hiện yêu cầu truy vấn API
const useHookQuery = ({ path, limitProductOnPage, id, mustHaveID, active }: props) => {
    // Sử dụng useQuery từ react-query
    const { data, ...rest } = useQuery({
        // Tạo queryKey dựa trên các tham số nhận được
        queryKey: [path, limitProductOnPage, id, active],
        // Hàm queryFn để thực hiện yêu cầu truy vấn API
        queryFn: async () => {
            // Xây dựng URL dựa trên các tham số và thực hiện yêu cầu truy vấn
            if (limitProductOnPage! > 0) {
                return await getApi(`${path}?_sort=id&_order=desc&_limit=${limitProductOnPage}${active != undefined ? `&active=${active}` : ''}`)
            }
            if (id! > 0) {
                return await getApi(`${path}/${id}${active != undefined ? `?active=${active}` : ''}`)
            }
            if (mustHaveID && !id) {
                return null
            }
            return await getApi(`${path}?_sort=id&_order=desc${active != undefined ? `&active=${active}` : ''}`)
        }
    });
    return { data, ...rest };
};

// Custom hook useCartQuery để lấy thông tin giỏ hàng của một người dùng
export const useCartQuery = (id: number | undefined) => {
    // Sử dụng useQuery từ react-query
    const { data, ...rest } = useQuery({
        // Tạo queryKey dựa trên id của người dùng
        queryKey: ['cart', id],
        // Hàm queryFn để thực hiện yêu cầu truy vấn API
        queryFn: async () => {
            // Xây dựng URL dựa trên id và thực hiện yêu cầu truy vấn
            if (id != undefined) {
                return await getApi(`cart?user=${id}`)
            }
            return null
        }
    });
    return { data, ...rest };
}

export default useHookQuery;
