import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/index.css';
import UseContextProvider from './context/UseContextProvider.tsx'
// import UseContextProvider from './context/UseContextProvider.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
 <QueryClientProvider client={queryClient}>
   <UseContextProvider>
   <BrowserRouter>
    <App />
  </BrowserRouter>
   </UseContextProvider>
 </QueryClientProvider>
)
