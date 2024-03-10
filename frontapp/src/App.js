import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header_Componets from './Components/js/Header_Componets';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Approvider from './Context';
import Community from './Components/js/Community';
function App(){
  return (
    <Router>
      <Approvider>
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Header_Componets/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/community' element={<Community/>}/>
      </Routes>
    </div>
    </Approvider>
    </Router>
  );
}

export default App;
