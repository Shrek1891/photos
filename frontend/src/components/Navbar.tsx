import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { FcAbout } from "react-icons/fc";
import {
  MdAddAPhoto,
  MdLightMode,
  MdOutlineAddHomeWork,
  MdOutlineModeNight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxWidth={"1140px"} px={4} py={2}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          bgGradient={"radial-gradient(circle, #b0909000 45%, #000f 48%)"}
          bgClip={"text"}
          color={
            'useColorMode().colorMode === "light" ? "gray.900" : "gray.100"'
          }
        >
          <Link to="/">My Foto Gallery</Link>
        </Text>
        <Flex gap={4}>
          <Link to="/">
            <Button variant="outline">
              <MdOutlineAddHomeWork />
            </Button>
          </Link>
          <Link to="/create">
            <Button variant="outline">
              <MdAddAPhoto />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline">
              <FcAbout />
            </Button>
          </Link>
          <Button variant="outline" onClick={toggleColorMode}>
            {colorMode === "light" ? <MdLightMode /> : <MdOutlineModeNight />}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
