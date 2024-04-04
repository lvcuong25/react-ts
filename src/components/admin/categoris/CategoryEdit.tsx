import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { IProduct } from "../../../interface/IProduct";
import { useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../../interface/ICategory";

const CategoryEdit = () => {
const {id}=useParams();
const queryClient = useQueryClient();
const navigate= useNavigate();
  const {
   
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(
    {
      defaultValues:{
        name:"",
      }
    }
  );

  // const navigate = useNavigate();

useQuery({
    queryKey:["CATEGORY_DETAIL",id],
    queryFn:async()=>{
      const {data}= await axios.get(`http://localhost:3000/category/${id}`)
      reset(data)
      return data
      
    }
  })
  const {mutate ,isPending}=useMutation({
    mutationFn:async(category:ICategory)=>{
      const {data} = await axios.put(`http://localhost:3000/category/${category.id}`,category)
      return data
    },
    
   
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["CATEGORY"]
      })
   
    }
  })
  const onSubmit = (product:ICategory) => {
    mutate(product);
    navigate("/admin/category")
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
                Tên Danh Mục
              </label>
              {errors.name && <span>không được để trống</span>}
            </div>

        

            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">{isPending?"Đang Sửa..":"Sửa"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
