import react from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { RoutesApp } from './routes';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';


function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
      <RoutesApp/>
      </BrowserRouter>
    </>
  )
}

export default App
