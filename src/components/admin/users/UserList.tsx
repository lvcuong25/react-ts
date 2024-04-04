import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../../../interface/IUser';

const UserList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['USER'],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/users`);
      return data;
    }
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number | string) => {
      window.confirm('Are you sure you want to delete this category') && (await axios.delete(`http://localhost:3000/users/${id}`));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["USER"]
      });
    }
  });

  const roleMapping: { [key: number]: string } = {
    1: "Admin",
    2: "User"
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className='container'>
          <h1 className='text-center font-bold text-2xl'>Quản Lý Tài Khoản</h1>
          <Link to={`add`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm Tài Khoản</Link>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-8">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Họ Và Tên</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Quản Trị</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: IUser, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{roleMapping[item.role]}</td>
                  <td>
                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => mutate(item.id!)}>Xóa</button>
                    <Link to={`edit/${item.id}`}><button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Sửa</button></Link>
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

export default UserList;
