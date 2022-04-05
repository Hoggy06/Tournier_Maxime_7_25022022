//Footer pour les pages
import { Container, Content, Hero } from "react-bulma-components";
export default function FooterSection() {
  const newDate = new Date();
  const currentDate = newDate.getFullYear();

  return (
    <Hero className="hero" color="text" size="small">
      <Hero.Body>
        <Container>
          <Content>
            <p className="content has-text-centered">
              Groupomania &copy; {currentDate}
            </p>
          </Content>
        </Container>
      </Hero.Body>
    </Hero>
  );
}
