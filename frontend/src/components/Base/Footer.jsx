import { Container, Content, Footer } from "react-bulma-components";
export default function FooterSection() {
  const newDate = new Date();
  const currentDate = newDate.getFullYear();

  return (
    <Footer className="footer has-background-black-ter has-text-white">
      <Container>
        <Content>
          <p className="content has-text-centered">
            Groupomania &copy; {currentDate}
          </p>
        </Content>
      </Container>
    </Footer>
  );
}
