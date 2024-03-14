import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductContextProvider from './context/ProductContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
 <ProductContextProvider>
   <BrowserRouter>
    <App />
  </BrowserRouter>
 </ProductContextProvider>
)
