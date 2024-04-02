import Users from './Users.jsx'

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Settings from './Settings.jsx';
import Collabs from './Collabs.jsx';
import GithubCallback from './GithubCallback.jsx';
import Header from './Header.jsx';


function App() {
  return (
    <main className="h-screen text-dark-text bg-dark-bg-secondary">
      <BrowserRouter>
        <Header />
        
        <div className="routes">
          <Routes>
            <Route path="/" element={<Users />}/>
            <Route path="/collabs" element={<Collabs />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/callback" element={<GithubCallback />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App
