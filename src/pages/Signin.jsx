import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
   const [email, setEmail] = useState("");
   const [pass, setPass] = useState("");
   const [isLoading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   const navigate = useNavigate();

   // This code defines an asynchronous function called handleSubmit with one parameter, event.
   const handleSubmit = async (event) => {
      // Prevents the default action of the event to occur. Here it prevents the form from being submitted and the page from refreshing.
      event.preventDefault();
      try {
         // Set loading state to true for when the post request is being executed
         setLoading(true);
         // Axios.post method is used to make a POST request to the API endpoint http://localhost:8080/api/users/login, sending an object with email and pass (password) fields as its body.
         const res = await axios.post("http://localhost:8080/api/users/login", {
            email: email,
            pwd: pass,
         });
         // If the login is successful,
         // the JWT token received from server is stored in localStorage along with the time at which it will expire.
         // Success state is set to true that will show a message on the screen
         // A setTimeout() function with 2s delay is implemented to redirect the user back to homepage using react-router-dom's navigate() function
         // replace: true means the previous URL will be replaced instead of creating a new entry in browser history
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("expiresIn", res.data.expiresIn);
         localStorage.setItem("user", res.data.user);

         setSuccess(true);
         setTimeout(function () {
            navigate("/", { replace: true });
         }, 2000);
      } catch (error) {
         // Catches any errors thrown while making the API call, logs them to console.
         console.log("Unable to sign in due to" + error);
      }
   };

   return (
      <Form onSubmit={handleSubmit}>
         <Row>
            <Alert variant="success" show={success}>
               Sign in successful, switching to Dashboard...
            </Alert>
         </Row>
         <Row className="justify-content-center" md={3}>
            <Form.Group as={Col}>
               <Form.Label>Email</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>
         </Row>
         <br />
         <Row className="justify-content-center" md={3}>
            <Form.Group as={Col}>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
               ></Form.Control>
            </Form.Group>
         </Row>
         <br />
         <Row className="justify-content-center" md={5}>
            <Button type="submit" disabled={isLoading}>
               {isLoading ? "Signing in..." : "Sign in"}
            </Button>
         </Row>
      </Form>
   );
};

export default Signin;
