import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Form from "./pages/Form";
import Stack from "react-bootstrap/Stack";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";

const App = () => {
   return (
      <BrowserRouter>
         <div className="App">
            <Header />
            <br />
         </div>
         <Stack
            gap={2}
            className="col-md-10 mx-auto"
            style={{ color: "#f1f3f4" }}
         >
            <Routes>
               <Route path="/ticket" Component={Form} />
               <Route path="/user" Component={SignUp} />
               <Route path="/user/login" Component={Signin} />
               <Route path="/user/myaccount" Component={Account} />
               <Route path="/" Component={Dashboard} />
               <Route path="/unauthorized" Component={Unauthorized} />
               <Route path="*" Component={NotFound} />
            </Routes>
         </Stack>
      </BrowserRouter>
   );
};

export default App;
