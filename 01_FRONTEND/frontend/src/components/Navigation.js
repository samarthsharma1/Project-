import { Container, Nav, Navbar } from 'react-bootstrap';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LanguageTranslator from './Lang_Translate/Language_trans';

const Navigation = () => {

    return (
        <BrowserRouter>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand>RS TOOLS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar_collapse" />
                    <Navbar.Collapse id="navbar_collapse">
                        <Nav>
                            <Nav.Link as={Link} to={'/language-translator'}>Language Translator</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>                
            </Navbar>

            <Routes>
                <Route path='/' element={<LanguageTranslator />}></Route>
                <Route path='/language-translator' element={<LanguageTranslator />}></Route>
            </Routes>

        </BrowserRouter>
    )
}

export default Navigation;