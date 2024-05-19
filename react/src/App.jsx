import Users from './Users.jsx'

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Collabs from './Collabs.jsx';
import GithubCallback from './GithubCallback.jsx';
import Header from './Header.jsx';
import Profile from './Profile.jsx';


function App() {
  return (
    <main className="h-screen overflow-y-auto text-dark-text bg-dark-bg-secondary">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Users />}/>
          <Route path="/collabs" element={<Collabs />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/callback" element={<GithubCallback />}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
