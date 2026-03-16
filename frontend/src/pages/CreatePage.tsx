import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorMode } from "../components/ui/color-mode";
import { useCreatePhotoMutation } from "@/services/photoApi";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formDataCurrent, setFormDataCurrent] = useState({});

  interface CloudinaryResponse {
    secure_url: string;
    [key: string]: string;
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fotos-gallery"); // Из настроек Cloudinary
    setFormDataCurrent(formData);
  };

  const [createPhoto] = useCreatePhotoMutation();

  const addNewPhoto = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDE_NAME}/image/upload`,
        formDataCurrent,
      );
      createPhoto({ ...newPhoto, image: response.data.secure_url });
      toaster.create({
        title: "Photo added",
        description: "Your photo has been added successfully!",
        type: "success",
      });
      setNewPhoto({
        title: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setIsLoading(false);
    }

    setFormDataCurrent({});
    navigate("/");
  };
  return (
    <Container maxW={"container.md"} py={8}>
      {isLoading && (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
        </VStack>
      )}
      <Toaster />
      <VStack align={"stretch"}>
        <Heading as="h1" size="2xl" textAlign={"center"} mb={8}>
          Add a new photo
        </Heading>
        <Box
          bg={useColorMode().colorMode === "light" ? "gray.100" : "gray.800"}
          p={6}
          rounded={"md"}
          shadow={"md"}
        >
          <VStack>
            <Box w={"full"}>
              <Heading as="h2" size="lg" mb={2}>
                Title
              </Heading>
              <Input
                placeholder="Enter photo title"
                value={newPhoto.title}
                type="text"
                name="title"
                onChange={(e) =>
                  setNewPhoto({ ...newPhoto, title: e.target.value })
                }
              />
            </Box>
            <Box w={"full"}>
              <Heading as="h2" size="lg" mb={2}>
                Description
              </Heading>
              <Input
                placeholder="Enter photo description"
                value={newPhoto.description}
                type="text"
                name="description"
                onChange={(e) =>
                  setNewPhoto({ ...newPhoto, description: e.target.value })
                }
              />
            </Box>
            <Box w={"full"}>
              <Heading as="h2" size="lg" mb={2}>
                URL
              </Heading>
              <Input
                placeholder="Enter photo URL"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button
                mt={4}
                colorScheme="teal"
                onClick={addNewPhoto}
                size={"lg"}
                float={"right"}
              >
                Add Photo
              </Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
