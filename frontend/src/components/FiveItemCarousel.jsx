import { Container, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import ProductCard from "../components/ProductCard";

const FiveItemCarousel = ({ title, items }) => {
  return (
    <Container size="xl">
      <Title order={1}>{title}</Title>
      <Carousel
        withIndicators
        loop
        dragFree
        align="center"
        slideGap="lg"
        slideSize="25%"
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: "lg", cols: 4 },
        ]}
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
