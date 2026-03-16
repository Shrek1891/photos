import CarouselComponent from "@/components/Carousel";
import { useGetPhotosQuery } from "@/services/photoApi";
import { Container, VStack, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { data, isLoading, isError } = useGetPhotosQuery();
  return (
    <div>
      <Container maxW="container.xl" py={12}>
        {isLoading ? (
          <VStack colorPalette="teal">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">Loading...</Text>
          </VStack>
        ) : isError ? (
          <VStack colorPalette="red">
            <Text color="colorPalette.600">Error fetching photos</Text>
          </VStack>
        ) : (
          <VStack align="stretch">
            <Text
              fontSize={"30"}
              fontWeight={"bold"}
              bgClip={"text"}
              textAlign={"center"}
              color={
                'useColorMode().colorMode === "light" ? "gray.900" : "gray.100"'
              }
            >
              Welcome to the Photo Gallery
            </Text>
            {data && data.photos?.length > 0 ? (
              <CarouselComponent data={data.photos} />
            ) : (
              <Text
                textAlign={"center"}
                color={
                  'useColorMode().colorMode === "light" ? "gray.900" : "gray.100"'
                }
              >
                No photo yet, click the add photo button to upload your first
                photo!
                <Link
                  to="/create"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Add Photo
                </Link>
              </Text>
            )}
          </VStack>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
