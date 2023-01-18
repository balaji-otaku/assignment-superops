import "semantic-ui-css/semantic.min.css";
import { Button, Container, Icon, Segment } from "semantic-ui-react";
// import MainMenu from "../components/MainMenu/MainMenu";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      
      <Container style={{ padding: "60px 0 20px 0" }}>
        <Segment>
          <Component {...pageProps} />
        </Segment>
      </Container>
    </div>
  );
}

export default MyApp;
