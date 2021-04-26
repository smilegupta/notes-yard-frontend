import { Fragment } from "react";
import { Auth } from "aws-amplify";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();

const Header = ({ auth }) => {
  let history = useHistory();

  // Logout Function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Auth.signOut();
      auth.setAuthenticated(false);
      auth.setUser(null);
      let message = "Logged Out Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Notes Yard</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/md-previewer">
                <Nav.Link> MD Previewer </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pastebin">
                <Nav.Link> Paste Bin </Nav.Link>
              </LinkContainer>

              {auth.isAuthenticated === true ? (
                <Fragment>
                  <LinkContainer to="/home">
                    <Nav.Link> Home </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link className="pr-0" onClick={(e) => handleLogout(e)}>
                      {" "}
                      Logout{" "}
                    </Nav.Link>
                  </LinkContainer>
                </Fragment>
              ) : (
                <Fragment>
                  <LinkContainer to="/register">
                    <Nav.Link className="pr-0"> Sign Up </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Nav.Link className="pr-0"> Sign In</Nav.Link>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
