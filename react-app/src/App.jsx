import Users from './Users.jsx'
import NavBar from './NavBar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Settings from './Settings.jsx';
import Collabs from './Collabs.jsx';
import GitHubLoginBtn from './GithubLoginBtn.jsx';
import GithubCallback from './GithubCallback.jsx';


function App() {
  return (
    <main className="h-screen text-white bg-dark-bg-secondary">
      <BrowserRouter>
        
        <NavBar />
        <div className="routes">
          <Routes>
            <Route path="/" element={<Users />}/>
            <Route path="/collabs" element={<Collabs />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/callback" element={<GithubCallback />}/>

          </Routes>
        </div>
        <GitHubLoginBtn />
      </BrowserRouter>
    </main>
  )
}

export default App
