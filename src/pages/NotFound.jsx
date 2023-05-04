import React from "react";

const NotFound = () => {
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
            <h1>404 Not Found</h1>
            <p>The requested resource could not be found on this server.</p>
         </div>
      </div>
   );
};

export default NotFound;
