import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import Game from './Game'
import Login from "./Login.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route index element={<Game />}/>
            <Route path="login" element={<Login />}/>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
