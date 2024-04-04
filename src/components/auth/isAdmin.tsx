// // isAdmin.tsx
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const isAdmin = (WrappedComponent: React.ComponentType) => {
//     const CheckAdmin: React.FC = () => {
//       const navigate = useNavigate();
      
//       useEffect(() => {
//         const userDataString = localStorage.getItem('userData');
//         if (!userDataString) {
//           navigate('/signin');
//           return;
//         }
        
//         const userData = JSON.parse(userDataString);
        

//         if (userData && userData.role && userData.role !== 1) {
//             navigate('/');
//           }
          
//       }, [navigate]);
  
//       return <WrappedComponent />;
//     };
  
//     return CheckAdmin;
//   };
  

// export default isAdmin;
