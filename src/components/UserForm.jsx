import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Hover from "./Hover";
import { Configuration, OpenAIApi } from "openai";
import { Inter } from "@next/font/google";
import Message from "./Message";
const inter = Inter({ subsets: ["latin"] });
const configuration = new Configuration({
  apiKey: "api",
});

export default function UserForms() {
  const openai = new OpenAIApi(configuration);
  const [userPrompt, setUserPrompt] = useState("");
  const [number, setNumber] = useState(1);
  const [sizes, setSizes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedSize, setSelectedSize] = useState("Small");
  const userPromptRef = useRef(null);
  const id = "test-toast";

  const toast = useToast({
    position: "top-right",
    title: "Container style is updated",
    isClosable: true,
  });
  const handleSizeClick = useCallback((size) => {
    setSelectedSize(size);
    console.log("size", size);
    const sizeToDimensions = {
      Small: "256x256",
      Medium: "512x512",
      Large: "1024x1024",
    };
    setSizes((prevSizes) => sizeToDimensions[size] || "256x256");
    // console.log(sizes);
  }, []);
  useEffect(() => {
    console.log("sizes", sizes);
  }, [sizes]);
  const handleUserPromptChange = (event) => {
    setUserPrompt(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const handleGenerateImage = async () => {
    if (userPrompt) {
      console.log("click");
      const imageParameters = {
        prompt: userPrompt,
        n: parseInt(number),
        //   size: size,
      };
      const response = await openai.createImage(imageParameters);
      const urlData = response.data.data[0].url;
      setImageUrl(urlData);
    } else {
      if (!toast.isActive(id)) {
        toast({
          title: `Please Enter an image prompt`,
          position: "top-right",
          isClosable: true,
          id: id,
          status: "error",
        });
      }
      userPromptRef.current.focus();
    }
  };
  return (
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
                placeholder="Enter a short description about image"
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
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {selectedSize}
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
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
