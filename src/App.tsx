import { Outlet } from 'react-router'
import Footer from './components/Footer/Footer'
import { Header } from './components/Header/Header'
function App() {

  return (
    <div className='container mx-auto'>
      <div className='px-4'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
