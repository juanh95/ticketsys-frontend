import React, { useEffect, useState, useCallback } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

/* There's still the problem of checking for an update from the data */

const Dashboard = () => {
   const [data, setData] = useState([]);
   const [filter, setFilter] = useState("all");
   const [dataReceiveDate, setDataReceiveDate] = useState("");
   const [isLoading, setLoading] = useState(false);
   const [id, setId] = useState(1);

   const getTickets = useCallback(async () => {
      setLoading(true);

      const res = await axios.get(
         `http://localhost:8080/api/tickets/filter?option=${filter}&id=${id}`,
         {
            option: filter,
         }
      );
      const date = new Date().toLocaleString();

      setLoading(false);

      return { data: res.data.data, date: date };
   }, [filter, id]);

   const setValues = (data, date) => {
      setData(data);
      setDataReceiveDate(date);
      localStorage.setItem("ticketData", JSON.stringify(data));
      localStorage.setItem("lastDataPull", date);
   };

   async function reloadData() {
      const result = await getTickets();
      setValues(result.data, result.date);
   }

   const handleSelect = (eventKey) => {
      setFilter(eventKey);
   };

   useEffect(() => {
      let mounted = true;
      const cachedData = JSON.parse(localStorage.getItem("ticketData"));
      const lastDate = localStorage.getItem("lastDataPull");

      if (cachedData != null) {
         setData(cachedData);
         setDataReceiveDate(lastDate);
         setLoading(false);
      } else {
         getTickets().then((result) => {
            if (mounted) {
               setValues(result.data, result.date);
            }
         });
      }

      return () => {
         mounted = false;
      };
   }, [getTickets]);

   return (
      <>
         <Container fluid style={{ color: "#f1f3f4" }}>
            <Row>
               <Col>Updated: {dataReceiveDate}</Col>
               <Col>Filter By</Col>
               <Col></Col>
               <Col></Col>
            </Row>
            <Row>
               <Col>
                  <Button
                     disabled={isLoading}
                     onClick={!isLoading ? reloadData : null}
                  >
                     {isLoading ? "Loading..." : "Refresh Data"}
                  </Button>
               </Col>
               <Col>
                  <DropdownButton
                     style={{ textTransform: "capitalize" }}
                     title={filter}
                     onSelect={handleSelect}
                  >
                     <Dropdown.Item>None</Dropdown.Item>
                     <Dropdown.Item eventKey={"reported"}>
                        Reported by Me
                     </Dropdown.Item>
                  </DropdownButton>
               </Col>
               <Col></Col>
               <Col></Col>
            </Row>
         </Container>
         <Table striped bordered hover variant="dark" responsive="lg">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Affected Item</th>
                  <th>Category</th>
                  <th>Priority</th>
               </tr>
            </thead>
            <tbody>
               {data.map((ticket) => (
                  <tr key={ticket.id}>
                     <td>{ticket.id}</td>
                     <td>{ticket.status}</td>
                     <td>{ticket.description}</td>
                     <td>{ticket.affectedItem}</td>
                     <td>{ticket.category}</td>
                     <td>{ticket.priority}</td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </>
   );
};

export default Dashboard;
