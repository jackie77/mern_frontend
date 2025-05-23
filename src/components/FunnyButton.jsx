import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";


function FunnyButton() {
  const [visible, setVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);

    // Hide everything after 5 seconds
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  if (!visible) return null;

  return (
    <>
      <Button
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        onClick={handleClick}
      >
        Sort by monthly PI?
      </Button>
      {showMessage && (
        <Text mt={4} color="red.500">
          Why would you do that?
        </Text>
      )}
    </>
  );
}

export default FunnyButton;
