import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Hover from "./Hover";
import { Configuration, OpenAIApi } from "openai";
import { Inter } from "@next/font/google";
import Model from "./Model";
const inter = Inter({ subsets: ["latin"] });
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
export default function UserForms() {
  const openai = new OpenAIApi(configuration);
  const [userPrompt, setUserPrompt] = useState("");
  const [number, setNumber] = useState(1);
  const [sizes, setSizes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const userPromptRef = useRef(null);
  const imageSizeRef = useRef(null);
  const submitButtonRef = useRef(null);
  const id = "test-toast";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalSize, setModalSize] = useState("");
  const toast = useToast({
    position: "top-right",
    title: "Container style is updated",
    isClosable: true,
  });
  const handleSizeClick = useCallback((size) => {
    setSelectedSize(size);
    console.log("size", size);
    const sizeToDimensions = {
      Small: { modalSize: "md", imageSize: "256x256" },
      Medium: { modalSize: "lg", imageSize: "512x512" },
      Large: { modalSize: "xl", imageSize: "1024x1024" },
    };

    setSizes((prevSizes) => sizeToDimensions[size].imageSize || "256x256");
    setModalSize((prevSizes) => sizeToDimensions[size].modalSize || "sm");
    // console.log(sizes);
  }, []);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    console.log("sizes", sizes);
  }, [sizes]);
  const handleUserPromptChange = (event) => {
    //
    setUserPrompt(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const handleGenerateImage = async () => {
    if (userPrompt && selectedSize !== "") {
      console.log("click");
      toast({
        title: `Processing Request`,
        position: "top-right",
        isClosable: false,
      });
      setSpinner(true);
      submitButtonRef.current.disabled = true;
      const imageParameters = {
        prompt: userPrompt,
        n: parseInt(number),
        //   size: size,
      };
      const response = await openai.createImage(imageParameters);
      const urlData = response.data.data[0].url;
      setImageUrl(urlData);
      toast.closeAll();
      onOpen();
      setSpinner(false);
      submitButtonRef.current.disabled = false;
      userPromptRef.current.value = "";

      //
    } else {
      if (!toast.isActive(id)) {
        toast({
          title: `${
            selectedSize === ""
              ? "Plese Select Image Size"
              : "Please Enter an image prompt"
          }`,
          position: "top-right",
          isClosable: true,
          id: id,
          status: "error",
        });
      }
      if (!userPrompt) {
        userPromptRef.current.focus();
      } else {
        imageSizeRef.current.focus();
      }
    }
  };
  return (
    <>
      <Model
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        imgSrc={imageUrl}
        size={modalSize}
        imagePrompt={userPrompt}
      />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        {/* <Message /> */}
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={5} px={5}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Generate Images Using AI</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Enter the following details below ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <span className="formLabel">
                  <FormLabel gap={0}>Image Prompt</FormLabel>
                  <Hover />
                </span>
                <Input
                  type="text"
                  placeholder="Example:- Monkey Driving a car"
                  onChange={handleUserPromptChange}
                  errorBorderColor="crimson"
                  ref={userPromptRef}
                />
              </FormControl>
              <FormControl id="size">
                <FormLabel>Image Size</FormLabel>
                <Stack spacing={10}>
                  <Menu>
                    <>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        ref={imageSizeRef}
                      >
                        {selectedSize !== "" ? (
                          <>{selectedSize}</>
                        ) : (
                          <>Select Image Size</>
                        )}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleSizeClick("Small")}>
                          <div className="formsButton">
                            Small <small> (253x253) </small>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={() => handleSizeClick("Medium")}>
                          <div className="formsButton">
                            Medium <small> (523x523) </small>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={() => handleSizeClick("Large")}>
                          <div className="formsButton">
                            Large <small> (1040x1040) </small>
                          </div>
                        </MenuItem>
                        {/* <MenuItem>Create a Copy</MenuItem> */}
                      </MenuList>
                    </>
                  </Menu>
                  {/*  */}
                  {/*  */}
                </Stack>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={() => handleGenerateImage()}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  ref={submitButtonRef}
                >
                  <div className="spinnerSpan">
                    {spinner && (
                      <span style={{ display: "flex" }}>
                        {" "}
                        <Spinner
                          thickness="3.2px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="white"
                          size="sm"
                        />
                      </span>
                    )}
                    <span>
                      {" "}
                      {spinner ? <>Processing...</> : <>Generate Image</>}
                    </span>
                  </div>{" "}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
