import { Container, Menu } from "semantic-ui-react";

export default function MainMenu() {
  return (
    <Menu
      fixed="top"
      inverted
      color="purple"
      style={{ border: "5px solid white" }}
    >
      <Container fluid>
        <Menu.Item header>Checkbox-tree</Menu.Item>
      </Container>
    </Menu>
  );
}
