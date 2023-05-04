import React from "react";

const Unauthorized = () => {
   return (
      <div
         style={{
            color: "#f1f3f4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
         }}
      >
         <div style={{ textAlign: "center", paddingBottom: "50vh" }}>
            <h1>401 Unauthorized</h1>
            <p>You are unauthorized to view this page.</p>
            <p>Try signing in again or using an account with access.</p>
         </div>
      </div>
   );
};

export default Unauthorized;
