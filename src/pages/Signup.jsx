import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setlastName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [department, setDepartment] = useState("");
   const [pass1, setPass1] = useState("");
   const [pass2, setPass2] = useState("");
   const [isLoading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         setLoading(true);
         const res = await axios.post(
            "http://localhost:8080/api/users/register",
            {
               firstName: firstName,
               lastName: lastName,
               email: email,
               department: department,
               phone: phone,
               pwd: pass1,
            }
         );

         setSuccess(true);
         setLoading(false);

         const userInfo = {
            firsName: res.data.firstName,
            id: res.data.id,
         };

         localStorage.setItem("user", userInfo);
         localStorage.setItem("token", res.data.tokenInfo.token);
         localStorage.setItem("expiresIn", res.data.tokenInfo.expiresIn);

         setTimeout(function () {
            navigate("/", { replace: true });
         }, 2000);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Form onSubmit={handleSubmit}>
         <Row>
            <Alert variant="success" show={success}>
               Account was Created Successfully
            </Alert>
         </Row>
         <Row>
            <Form.Group as={Col}>
               <Form.Label>First Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
               <Form.Label>Last Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
               ></Form.Control>
            </Form.Group>
         </Row>
         <br />
         <Row>
            <Form.Group as={Col}>
               <Form.Label>Email</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
               <Form.Label>Phone</Form.Label>
               <Form.Control
                  type="tel"
                  placeholder="(ex. 123-456-7890)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
               <Form.Label>Department</Form.Label>
               <Form.Select
                  aria-label="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
               >
                  {[
                     "-Select One-",
                     "IT - Networking",
                     "IT - Security",
                     "IT - Admins",
                     "IT - Help Desk",
                  ].map((dpt) => (
                     <option key={dpt}>{dpt}</option>
                  ))}
               </Form.Select>
            </Form.Group>
         </Row>
         <br />
         <Row>
            <Form.Group as={Col}>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Password"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
               ></Form.Control>
            </Form.Group>
         </Row>
         <br />
         <Row>
            <Form.Group as={Col}>
               <Form.Label>Re-Enter Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="One More Time.."
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
               ></Form.Control>
               {pass1 === pass2 && pass1.length > 0 ? (
                  <Form.Text style={{ color: "#00ff00" }}>
                     Passwords Match
                  </Form.Text>
               ) : (
                  <Form.Text style={{ color: "#dc143c" }}>
                     Passwords Need To Match
                  </Form.Text>
               )}
            </Form.Group>
         </Row>
         <br />
         <Button
            type="submit"
            disabled={!(pass1 === pass2 && pass1.length > 0) || isLoading}
         >
            {isLoading ? "Creating Account..." : "Create Account"}
         </Button>
      </Form>
   );
};

export default SignUp;
