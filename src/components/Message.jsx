import { Button, useToast, Wrap, WrapItem } from "@chakra-ui/react";

export default function Message({ status }) {
  const toast = useToast({
    position: "top-right",
    title: "Container style is updated",
    isClosable: true,
  });

  const id = "test-toast";
  return (
    <Wrap>
      <WrapItem>
        <Button
          onClick={() => {
            if (!toast.isActive(id)) {
              toast({
                title: `toast`,
                position: "top-right",
                isClosable: true,
                id: id,

                status: "error",
              });
            }
          }}
        >
          Show toast
        </Button>
      </WrapItem>
    </Wrap>
  );
}
