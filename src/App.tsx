import { HomeComponent } from "./Components/Home/Home"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ListProduct } from "./Components/ListProducts/ListProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/products" element={<ListProduct />} />
    </>
  )
)

function App() {
  

  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App;
