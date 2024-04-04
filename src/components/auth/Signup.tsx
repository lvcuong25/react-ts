import { useMutation, } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { ICategory } from "../../../interface/ICategory";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interface/IUser";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (user: IUser) => {
      // Thêm trường role với giá trị mặc định là 2 vào đối tượng user
      const userWithRole = { ...user, role: 2 };
  
      const { data } = await axios.post(
        `http://localhost:3000/register`, userWithRole
      );
      return data;
    },
    onSuccess: () => {
      // Xử lý thành công nếu cần
    },
  });
  
  const onSubmit = (user: IUser) => {
    mutate(user);
    navigate("/signin");
  };
  
  return (
    <div >
      <div >
        <div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                required
              />
              {errors.name && <span>không được để trống</span>}
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
              />
              {errors.email && <span>không được để trống</span>}
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.password && <span>không được để trống</span>}
            </div>

            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              type="submit"
            >
              {isPending ? "Đang Thêm..." : "Thêm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
