
import './App.css';
import Navbar from './components/Navbar';

import PageSwitch from './components/app-router/PageSwitch';
import { BrowserRouter } from 'react-router-dom';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      
      <BrowserRouter>
        <Navbar />
          <div>
            <PageSwitch />
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
