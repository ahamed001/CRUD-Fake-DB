import './App.css';
import { Crud } from './components/crud';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllFruits from './components/cards';
import AddFruit from './components/addfruit';
import UpdateFruit from './components/updatefruit';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Crud/><br/>

      
      <Routes>
        
        <Route path='/'  element={<AllFruits />}></Route>
        <Route path='/add'  element={<AddFruit />}></Route>
        <Route path="/update/:id" element={<UpdateFruit />}></Route>
      </Routes> 
      
    </div>
    </BrowserRouter>
  );
}

export default App;
