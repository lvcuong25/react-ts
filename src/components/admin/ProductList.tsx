import { IProduct } from '../../interface/IProduct'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductContextProvider'

const ProductList = () => {
  const { products, onHandleRemove } = useContext(ProductContext);
  console.log(products);

  return (
    <div>
        <Link to={`product/add`}>ADD PRODUCT</Link>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>image</th>
            <th>description</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item: IProduct, index: number) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <img src={item.image} alt="" />
              </td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => onHandleRemove(item.id!)}>delete</button>
                <Link to={`product/edit/${item.id}`}>edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
