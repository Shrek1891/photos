import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Dialog,
  Portal,
  Button,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { useColorModeValue } from "./ui/color-mode";
import { createPortal } from "react-dom";
import {
  useDeletePhotoMutation,
  useUpdatePhotoMutation,
} from "@/services/photoApi";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";

interface PhotoCardProps {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const PhotoCard = ({ photo }: { photo: PhotoCardProps }) => {
  const [selectedImage, setSelectedImage] = useState(false);
  const handleUpdate = () => {
    const res = updatePhotoMutation({ id: photo._id, ...updatePhoto });
    if ("error" in res) {
      toaster.create({
        title: "Error",
        description: "Failed to update photo. Please try again.",
        type: "error",
      });
      return;
    }
    toaster.create({
      title: "Photo updated",
      description: "Your photo has been updated successfully!",
      type: "success",
    });
  };
  const [deletePhoto] = useDeletePhotoMutation();
  const [updatePhotoMutation] = useUpdatePhotoMutation();
  const [updatePhoto, setUpdatePhoto] = useState({
    title: photo.title,
    description: photo.description,
    image: photo.imageUrl,
  });
  const textColor = useColorModeValue("gray.900", "gray.100");

  const handleDelete = () => {
    const res = deletePhoto(photo._id);
    if ("error" in res) {
      toaster.create({
        title: "Error",
        description: "Failed to delete photo. Please try again.",
        type: "error",
      });
      return;
    }
    toaster.create({
      title: "Photo deleted",
      description: "Your photo has been deleted successfully!",
      type: "success",
    });
  };

  return (
    <>
      {selectedImage &&
        createPortal(
          <div className="overlay" onClick={() => setSelectedImage(false)}>
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="full-screen-image"
            />
          </div>,
          document.body,
        )}
      <Dialog.Root>
        <Box
          shadow="lg"
          borderRadius="lg"
          overflow="hidden"
          transition="all 0.2s"
          bg={"transparent"}
          _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
        >
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            h={64}
            w="full"
            objectFit="contain"
            cursor="pointer"
            onClick={() => setSelectedImage(true)}
          />
          <Box p={4}>
            <Heading as="h3" size="md" mb={2} textAlign={"center"}>
              {photo.title}
            </Heading>
            <Text color={textColor} fontSize="xl" mb={4} textAlign={"center"}>
              {photo.description}
            </Text>
            <HStack alignItems="center" justifyContent="center" gap={"2"}>
              <Dialog.Trigger asChild>
                <IconButton
                  aria-label="Edit Photo"
                  size="sm"
                  colorScheme="blue"
                  bgColor="blue.500"
                >
                  <TbPhotoEdit />
                </IconButton>
              </Dialog.Trigger>
              <IconButton
                aria-label="Delete Photo"
                size="sm"
                colorScheme="red"
                bgColor="red.500"
                onClick={handleDelete}
              >
                <MdDeleteOutline />
              </IconButton>
            </HStack>
          </Box>
        </Box>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Photo</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Box w={"full"}>
                  <Heading as="h2" size="lg" mb={2}>
                    Title
                  </Heading>
                  <Input
                    placeholder="Enter photo title"
                    value={updatePhoto.title}
                    type="text"
                    name="title"
                    onChange={(e) =>
                      setUpdatePhoto({ ...updatePhoto, title: e.target.value })
                    }
                  />
                </Box>
                <Box w={"full"}>
                  <Heading as="h2" size="lg" mb={2}>
                    Description
                  </Heading>
                  <Input
                    placeholder="Enter photo description"
                    type="text"
                    name="description"
                    value={updatePhoto.description}
                    onChange={(e) =>
                      setUpdatePhoto({
                        ...updatePhoto,
                        description: e.target.value,
                      })
                    }
                  />
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button onClick={handleUpdate}>Update photo</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
        <Toaster />
      </Dialog.Root>
    </>
  );
};

export default PhotoCard;
