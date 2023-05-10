import Final_Display from "./Components/Final_Display";
import Home from "./Components/Home";
import Other_medical_info from "./Components/Other_medical_info";
import Sche_appointment from "./Components/Sche_appointment";
import SymtomsList from "./Components/SymtomsList";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = ()=> {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/SymtomsList" element={<SymtomsList/>}/>
      <Route path="/Other_medical_info" element={<Other_medical_info/>}/>
      <Route path="/Sche_appointment" element={<Sche_appointment/>}/>
      <Route path="/Final_Display" element={<Final_Display/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
