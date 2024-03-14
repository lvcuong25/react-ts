
import React, { createContext, useEffect, useState } from 'react'
import { IProduct } from '../interface/IProduct';
import axios from 'axios';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductContext=createContext({}as any)
const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [products,setProducts]=useState<IProduct[]>([]);
  useEffect(()=>{
    (async()=>{
      try {
        const {data}= await axios.get(`http://localhost:3000/products`)
        setProducts(data)
      } catch (error) { /* empty */ }
    })();
  },[])
  const onHandleRemove = async (id:number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((item) => item.id !== id));
    } catch (error) { /* empty */ }
  };

 

  const onHandleAdd= async (product:IProduct)=>{
    try {
      const {data}= await axios.post(`http://localhost:3000/products`,product);
      setProducts([...products,data])
    } catch (error) { /* empty */ }
  }
    
  const onHandleEdit= async (product:IProduct) => {
    try {
        await axios.put(`http://localhost:3000/products/${product.id}`,product )
        setProducts(products.map((item)=>(item.id===product.id?product:item)))
    } catch (error) { /* empty */}
  }


  return (
    <div>
      
      <ProductContext.Provider 
      value={{products,onHandleRemove,onHandleEdit,onHandleAdd}}>
        {children}
      </ProductContext.Provider>
    </div>
  )
}



export default ProductContextProvider
