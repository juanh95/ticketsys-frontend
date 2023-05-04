import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

const TicketForm = () => {
  const [email, setEmail] = useState("");
  const [affectedItem, setAffectedItem] = useState("--Select One--");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");

  const [response, setResponse] = useState(null);

  const axiosConfig = {
    headers: {
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const handleSubmit = async (event) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/tickets/",
        {
          status: "New",
          description: description,
          reportedId: 1,
          affectedId: 1,
          assignedId: 1,
          title: title,
          priority: priority,
          category: category,
          affectedItem: affectedItem,
          phone: phone,
        },
        axiosConfig
      );

      setResponse(res);
      alert(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            This is needed for notifications
          </Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Affected Item</Form.Label>
          <Form.Select
            aria-label="Category"
            value={affectedItem}
            onChange={(e) => setAffectedItem(e.target.value)}
          >
            {[
              "-Select One-",
              "Google Chrome",
              "Microsoft Office ",
              "Zoom",
              "OneNote",
              "Skype",
              "Steam",
            ].map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="(ex. 123-456-7890)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Priority Level</Form.Label>
          <Form.Select
            aria-label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {["4. Low", "3. Meduim", "2. High", "1. Critical"].map((level) => (
              <option key={level}>{level}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {[
              "Hardware",
              "Software",
              "Network",
              "Security",
              "Applications",
              "Infrastructure",
            ].map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <br />
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Short Description of the issue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Row>
      <br />
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Descibe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
      </Row>
      <br />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default TicketForm;
