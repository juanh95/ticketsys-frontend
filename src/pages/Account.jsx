import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Account = () => {
   const [user, setUser] = useState({});

   const navigate = useNavigate();

   const getUser = useCallback(async () => {
      try {
         console.log("Got to the call");
         const res = await axios.get(
            "http://localhost:8080/api/users/myaccount",
            {
               headers: { Authorization: localStorage.getItem("token") },
            }
         );

         if (res.status === 200) {
            return res.data.data;
         } else if (res.status === 401) {
            alert("Need to login again");
         }
      } catch (error) {
         if (error.response.status === 401) {
            console.log(error);
            navigate("/user/login", { replace: true });
         }
      }
   }, [navigate]);

   useEffect(() => {
      let mounted = true;
      console.log("Inside use effect");
      getUser().then((result) => {
         if (mounted) {
            setUser(result);
         }
      });

      return () => {
         mounted = false;
      };
   }, [getUser]);

   const handleLogout = () => {
      localStorage.clear();
      navigate("/user/login", { replace: true });
   };

   return (
      <div>
         <h2>My Account</h2>
         <p>First Name: {user.firstName}</p>
         <p>Last Name: {user.lastName}</p>
         <p>Department: {user.department}</p>
         <p>Email: {user.email}</p>
         <p>Phone Number: {user.phone}</p>
         <Button onClick={handleLogout}>Logout</Button>
      </div>
   );
};

export default Account;
