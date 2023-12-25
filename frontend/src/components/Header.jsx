import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <Container className='c1'>
        <h1 className="navbar-brand text-center" style={{ color: '#fff', fontFamily: 'sans-serif', fontSize: '2rem' }}>
          OCR Project by Krishan Kumar
        </h1>
      </Container>
    </Navbar>
  );
}

export default Header;
