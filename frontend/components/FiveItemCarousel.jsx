import { Container, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import ProductCard from "../components/ProductCard";

const FiveItemCarousel = ({ title, items }) => {
  return (
    <Container size="xl" px="0">
      <Title order={1} py="sm">
        {title}
      </Title>
      <Carousel
        withIndicators
        loop
        dragFree
        align="center"
        slideGap="lg"
        slideSize="25%"
      >
        {items.map((item, index) => (
          <Carousel.Slide key={index}>
            <ProductCard {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default FiveItemCarousel;
