import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      if (localStorage.getItem("user")) {
         setUser(localStorage.getItem("user"));
      }
   }, []);

   return (
      <Navbar bg="dark" variant="dark">
         <Container>
            <Navbar.Brand href="/">Ticket System</Navbar.Brand>
            <Nav className="me-auto">
               <Nav.Link as={Link} to="/">
                  Dashboard
               </Nav.Link>
               <Nav.Link as={Link} to="ticket">
                  Open Ticket
               </Nav.Link>
               <Nav.Link as={Link}>Admin</Nav.Link>
               <Nav.Link as={Link}>Knowledge Base</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
               <Nav>
                  {user ? (
                     <Nav.Link
                        style={{ color: "#f1f3f4" }}
                        as={Link}
                        to="/user/myaccount"
                     >
                        Welcome, {user}!
                     </Nav.Link>
                  ) : (
                     <Nav.Link as={Link} to="/user">
                        Sign up
                     </Nav.Link>
                  )}
                  {user ? (
                     <></>
                  ) : (
                     <Nav.Link as={Link} to="/user/login">
                        Log in
                     </Nav.Link>
                  )}
                  {/* <Nav.Link as={Link} to="/user/login">
                     Log in
                  </Nav.Link> */}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
