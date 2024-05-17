import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
  import {Clients, Dashboard, MainLayout, Orders, Services, SignIn, SignUp} from "@pages";
  
  const index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route index element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/main/*" element={<MainLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="clients" element={<Clients />} />
          <Route path="services" element={<Services />} />
          </Route>
        </Route>
      )
    );
    return <RouterProvider router={router} />;
  };
  
  export default index;
  