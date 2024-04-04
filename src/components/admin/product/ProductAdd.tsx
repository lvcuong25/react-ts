import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

import { IProduct } from "../../../interface/IProduct";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../interface/ICategory";
import { useState } from "react";

const ProductAdd = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    defaultValues:{
      name:"",
      price:0,
      image:"",
      description:"",
      categoryID:"",
      stock:""
    }
  });

  const { data: category } = useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/category");
      return data;
    },
  });

  const {mutate ,isPending}=useMutation({
    mutationFn:async(product:IProduct)=>{
      const {data} = await axios.post(`http://localhost:3000/products`,product)
      return data
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["PRODUCT"]
      });
      navigate("/admin");
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // Dữ liệu form có thêm categoryID từ giá trị selectedCategory
    const productWithCategory = { ...data, categoryID: selectedCategory };
    mutate(productWithCategory);
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCategoryChange = (event:any) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("name", { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Tên Sản Phẩm
              </label>
              {errors.name && <span>không được để trống</span>}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("price", { required: true })}
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Giá Sản Phẩm
              </label>
              {errors.price && <span>Không được để trống</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("image", { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ảnh Sản Phẩm
              </label>
              {errors.image && <span>Không được để trống</span>}
            </div>

            <select value={selectedCategory} onChange={handleCategoryChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Chọn danh mục</option>
              {category?.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>


            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("stock", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />

              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Số Lượng
              </label>
              {errors.stock && <span>Không được để trống</span>}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("description", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />

              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Mô tả Sản Phẩm
              </label>
            </div>

            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">{isPending?"Đang Thêm...":"Thêm"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
