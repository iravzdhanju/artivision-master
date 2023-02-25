import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Hover = () => {
  return (
    <span>
      <Popover>
        <PopoverTrigger>
          <InfoOutlineIcon className="hoverIcon"></InfoOutlineIcon>
        </PopoverTrigger>
        <PopoverContent width={253}>
          <PopoverArrow />
          <PopoverCloseButton />
          {/* <PopoverHeader>Image Prompt</PopoverHeader> */}

          <PopoverBody>Enter the Image Description.</PopoverBody>
        </PopoverContent>
      </Popover>
    </span>
  );
};

export default Hover;
