import { Container, Flex, Box, Heading, Text, Image } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        gap={10}
        mb={20}
      >
        <Box flex={1}>
          <Heading as="h1" size="2xl" mb={4} textAlign="center">
            About me and my project
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Hi! I'm a passionate developer who loves creating beautiful and
            functional web applications. This photo gallery project is a labor
            of love, built with React and Chakra UI to provide a seamless and
            enjoyable user experience. I hope you enjoy browsing through the
            photos as much as I enjoyed building this project!
          </Text>
          <Heading size="xl" textAlign="center" mb={10}>
            About Project
          </Heading>
          <Text fontSize="lg" color="gray.600">
            This photo gallery project allows users to upload, view, and manage
            their photos in a sleek and responsive interface. Built with React
            and Chakra UI, it features a carousel for easy navigation, a
            user-friendly photo upload form, and a clean design that adapts to
            any screen size. Whether you're a professional photographer or just
            want to share your memories, this gallery is the perfect place to
            showcase your photos!
          </Text>
          <Heading size="xl" textAlign="center" mb={10}>
            Tech Stack
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Stack used: React, TypeScript, Chakra UI, Redux Toolkit, RTK Query,
            React Router, Cloudinary, Node.js, Express, MongoDB, Mongoose,
          </Text>
        </Box>
        <Box flex={1}>
          <Image src="/iconpf.jpg" borderRadius="lg" alt="About us" w="1/3" />
        </Box>
      </Flex>
    </Container>
  );
};

export default AboutPage;
