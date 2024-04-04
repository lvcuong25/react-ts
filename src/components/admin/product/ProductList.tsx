import { IProduct } from '../../../interface/IProduct';
import { Link } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ICategory } from '../../../interface/ICategory';
import { useState } from 'react';

const ProductList = () => {
  const queryClient = useQueryClient();
  const [categoriesMap, setCategoriesMap] = useState<{ [key: number]: string }>({});

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['PRODUCT'],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products`);
      return data;
    }
  });

  const { isLoading: isLoadingCategories } = useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/category");
      // Tạo một đối tượng map từ ID của danh mục sang tên của danh mục
      const categoriesMap = data.reduce((acc: { [key: number]: string }, category: ICategory) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
      setCategoriesMap(categoriesMap);
      return data;
    }
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: number | string) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        await axios.delete(`http://localhost:3000/products/${id}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT"]
      });
    }
  });

  if (isLoadingProducts || isLoadingCategories) return <div>Loading...</div>;

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className='container'>
          <h1 className='text-center font-bold text-2xl'>Quản Lý Sản Phẩm</h1>
          <Link to={`add`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm Sản Phẩm</Link>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-8">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-5 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: IProduct, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">
                    <img width={'100px'} src={product.image} alt="" />
                  </td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    {categoriesMap[product.categoryID] || 'Unknown'}
                  </td>
                  <td>
                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => deleteProduct(product.id!)}>Xóa</button>
                    <Link  to={`edit/${product.id}`}><button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" >Sửa</button></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
