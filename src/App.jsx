import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"; 
import  Home  from './pages/Home'
import Selecoes from './pages/Selecoes';
import Artilheiros from './pages/Artilheiros';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/selecoes/:id" element={<Selecoes/>}/>
          <Route path="/jogadores/artilheiros/:id" element={<Artilheiros/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}


