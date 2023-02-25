const {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
} = require("@chakra-ui/react");
export default function Model({ isOpen, onClose, imgSrc, size, imagePrompt }) {
  return (
    <>
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={size}
      >
        <ModalOverlay />

        <ModalContent bg={useColorModeValue("white", "gray.800")}>
          <ModalHeader color={"black"}>{imagePrompt}</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody>
            <div style={{ maxWidth: "80vw" }}>
              <img
                src={imgSrc}
                alt="OpenAiImage"
                fill={true}

                // style={({ objectFit: "cover" }, { maxwidth: "100%" })}
              ></img>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>

            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
