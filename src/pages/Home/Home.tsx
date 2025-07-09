import BooksTable from "./BooksTable"
import HeroSection from "./HeroSection"

const Home = () => {

  console.log(import.meta.env.VITE_BASE_API)
  return (
    <div className="">
      <HeroSection />
      <BooksTable />
    </div>  
  )
}

export default Home