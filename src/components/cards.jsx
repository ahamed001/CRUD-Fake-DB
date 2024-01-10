import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./delete";
 
export default function AllFruits() {
  const [allFruits, setAllFruits] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);

  const openConfirmDeleteModalHandler = (id) => {
    setShowModal(true);
    setItemToDeleteId(id);
  };
 
  const hideDeleteModalHandler = () => {
    setShowModal(false);
    setItemToDeleteId(0);
  };

  const confirmDeleteHandler = () => {
    axios
      .delete(`http://localhost:4000/fruits/${itemToDeleteId}`)
      .then((response) => {
        setAllFruits((previousState) => {
          return previousState.filter((_) => _.id !== itemToDeleteId);
        });
        setItemToDeleteId(0);
        setShowModal(false);
      });
  };


  useEffect(() => {
    axios.get("http://localhost:4000/fruits").then((response) => {
      setAllFruits(response.data);
    });
  }, []);
 
  return (
    <>

      <DeleteConfirmation
        showModal={showModal}
        hideDeleteModalHandler={hideDeleteModalHandler}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
              

      <Row xs={1} md={3} className="g-2">
        {allFruits.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Img variant="top" src={item.imageUrl} 
              style={{height:"300px",width:"424px",padding:"20px",justifySelf:"center",alignSelf:"center"}} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Quantity (unit kg) - {item.quantity}</Card.Text>
                <Card.Text>Price - {item.price}</Card.Text>

              </Card.Body>

              <Button
	               variant="primary"
	               onClick={() => navigate(`/update/${item.id}`)}
                 style={{padding:"10px",margin:"0 20px 10px 20px"}}
	                >
	                Edit
	              </Button>
                
                <Button variant="danger"
                  onClick={() =>{openConfirmDeleteModalHandler(item.id)}}
                  style={{padding:"10px",margin:"0 20px 10px 20px"}}
                >
                  Delete
                </Button>

            </Card>
          </Col>
        ))}
      </Row><br/>

      <Row className="mt-2">
        <Col md={{ span: 4, offset: 4 }}>
          <Button variant="success" onClick={() => navigate("/add")} 
          style={{width:"250%",margin:"50px 0 50px -350px",padding:"30px 0 30px 0"}}>
            Add New Fruit
          </Button>
        </Col>
      </Row>
      
    </>
  );
}
