// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LogoutButton = () => {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userData') !== null);

//     const handleLogout = () => {
//         // Xóa dữ liệu người dùng khỏi localStorage
//         localStorage.removeItem('userData');
//         // Cập nhật trạng thái đăng nhập thành false
//         setIsLoggedIn(false);
//         // Chuyển hướng người dùng đến trang đăng nhập
//         navigate('/');
//     };

//     return (
//         isLoggedIn && <button onClick={handleLogout}>Đăng Xuất</button>
//     );
// };

// export default LogoutButton;
