
// import Navbar from '../components/Navbar'
import Auth from '../src/components/Auth/Auth'
import { Routes, Route } from 'react-router-dom';
import Problems from '../src/components/Pages/Problems';
import CodeEditor from '../src/components/Pages/CodeEditor';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/problems' element={<Problems/>} />
        <Route path='/editor/:pid/' element={<CodeEditor/>}/>
      </Routes>
      {/* <Auth/> */}
    </div>
  )
}

export default App
