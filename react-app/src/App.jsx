import Developers from './Developers.jsx'
import NavBar from './NavBar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Settings from './Settings.jsx';
import Collabs from './Collabs.jsx';

function App() {
  return (
    <main className="h-screen text-white bg-dark-bg-secondary">
      <BrowserRouter>
        
        <NavBar />
        <div className="routes">
          <Routes>
            <Route path="/" element={<Developers />}/>
            <Route path='/collabs' element={<Collabs />}/>
            <Route path='/settings' element={<Settings />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App
