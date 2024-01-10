import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export let Crud=(props)=>{
    return (
        <div>
            <Navbar expand="lg" variant="dark" bg="success">
              <Container>
                <Navbar.Brand>Fruits</Navbar.Brand>
              </Container>
            </Navbar>
          <Container>{props.children}</Container>
        </div>
      );
}
