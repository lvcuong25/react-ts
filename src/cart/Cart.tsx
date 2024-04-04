import { useState } from "react"
import image18 from'../assets/icons/18.svg'
// import { useNavigate } from "react-router-dom"
import useHookQuery, { useCartQuery } from "../hooks/useHookQuery"
import { useCartMutation } from "../hooks/useHookMutation"
import { ICart } from "../interface/ICart"
import { IProduct } from "../interface/IProduct"
import Service from "../home/Service"
import Banner from "../home/Banner"
// import { useNavigate } from "react-router-dom"

const Cart = () => {
    // const navigate = useNavigate()
    // useEffect(() => {
        // navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    const { data, isLoading, refetch } = useCartQuery(0)
    const { data: listProduct, isLoading: isLoadingProduct } = useHookQuery({ path: 'products' })
    const [confirm, setConfirm] = useState(0)
    const subtotal: number[] = []
    let total: number = 0
    const { mutate } = useCartMutation('DELETE', 'Delete cart successfully')

    return (
        <div>
            <Banner/>
            <div className="container md:flex md:justify-between gap-8 py-12">
                {isLoading || isLoadingProduct ? <div>Loading...</div> :
                    <table className='table-fixed w-full'>
                        <thead>
                            <tr className='bg-[#F9F1E7]'>
                                <td className='font-medium text-black py-4'></td>
                                <td className='font-medium text-black py-4'>Product</td>
                                <td className='font-medium text-black py-4'>Price</td>
                                <td className='font-medium text-black py-4'>Quantity</td>
                                <td className='font-medium text-black py-4'>Subtotal</td>
                                <td className='font-medium text-black py-4'></td>
                            </tr>
                        </thead>
                        <tbody>
                            {!data?.length ? <tr><td colSpan={6} className='text-center'>No product in cart</td></tr> :
                                data.map((item: ICart) => {
                                    const product = listProduct?.find((product: IProduct) => product.id === item.product);
                                    subtotal.push(product?.price * item.quantity)
                                    return (
                                        <tr key={item.id}>
                                            <td className='text-black py-4'><img className='w-16 h-16 object-cover' src={product?.image} alt={product?.name} /></td>
                                            <td className='text-black py-4'>{product?.name}</td>
                                            <td className='text-black py-4'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product?.price)}</td>
                                            <td className='text-black py-4'>{item.quantity}</td>
                                            <td className='text-black py-4'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product?.price * item.quantity)}</td>
                                            <td className='text-black py-4'>
                                                <button onClick={() => {
                                                    if (confirm == product.id) {
                                                        mutate(item)
                                                        refetch()
                                                        refetch()
                                                        setConfirm(0)
                                                    } else {
                                                        setConfirm(product.id)
                                                    }
                                                }}>
                                                    {confirm == product.id ? <h1 className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">confirm</h1> : <img src={image18} alt="" />}
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
                <div className='w-2/5'>
                    <div className='bg-[#F9F1E7] px-16 py-4 w-full'>
                        <h2 className='text-center text-[32px] font-semibold mb-12'>Cart Totals</h2>
                        <div className='flex justify-between mb-6'>
                            <h3 className='font-medium'>Subtotal</h3>
                            <div className="text-right">
                                {subtotal.map((item, index) => {
                                    total = total + item
                                    return <span key={index} className='text-[#9F9F9F] block'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item)}đ</span>
                                })}
                            </div>
                        </div>
                        <div className='flex justify-between mb-8'>
                            <h3 className='font-medium'>Total</h3>
                            <span className='text-xl text-[#B88E2F]'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(total)}đ</span>
                        </div>
                        <a className='flex justify-center mb-16' href="/checkout"><button className='text-xl py-3 px-12 border-black border-[1px] rounded-2xl block self-center'>Check Out</button></a>
                    </div>
                </div>
            </div>
            <Service />
        </div>
    )
}

export default Cart
