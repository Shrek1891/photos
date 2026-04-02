import { Carousel, Center, IconButton, Image } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PhotoCard from "./PhotoCard";

interface PhotoCardProps {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CarouselComponent = ({ data }: { data: PhotoCardProps[] }) => {
  return (
    <Center py={8} px={4} w="100%" h="full">
      <Carousel.Root
        slideCount={data.length}
        maxW="3xl"
        w="100%"
        gap="4"
        position="absolute"
        overflow="hidden"
      >
        <Carousel.Control justifyContent="center" gap="4" width="full">
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuChevronLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.ItemGroup width="full">
            {data.map((item, index) => (
              <Carousel.Item key={index} index={index}>
                <PhotoCard photo={item} />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuChevronRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>

        <Carousel.IndicatorGroup>
          {data.map((item, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              unstyled
              _current={{
                outline: "2px solid currentColor",
                outlineOffset: "2px",
              }}
            >
              <Image
                w="20"
                aspectRatio="16/9"
                src={item.imageUrl}
                alt={item.title}
                objectFit="cover"
              />
            </Carousel.Indicator>
          ))}
        </Carousel.IndicatorGroup>
      </Carousel.Root>
    </Center>
  );
};

export default CarouselComponent;
