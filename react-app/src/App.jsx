import Developers from './Developers.jsx'
import NavBar from './NavBar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Settings from './Settings.jsx';
import Profile from './Profile.jsx';

function App() {
  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <div className="routes">
          <Routes>
            <Route path="/" element={<Developers />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/settings' element={<Settings />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App
