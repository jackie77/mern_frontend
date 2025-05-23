import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
	Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useDaggerStore } from "../store/dagger";
import { useState } from "react";

const DaggerCard = ({ dagger }) => {
  const [updatedDagger, setUpdatedDagger] = useState(dagger);

  const textColor = useColorModeValue("green.800", "blue.200");
  const monthlyPIColor = useColorModeValue("red.900", "cyan.400")
  const bg = useColorModeValue("gray.200", "gray.800");

  const { deleteDagger, updateDagger } = useDaggerStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteDagger = async (pid) => {
    const { success, message } = await deleteDagger(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateDagger = async (pid, updatedDagger) => {
    const { success, message } = await updateDagger(pid, updatedDagger);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Dagger updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Box p={4}>
        <Text as='samp' fontSize="m" mb={4}>Amount: </Text>
				<Text as='samp'color={textColor} >${dagger.loanAmount.toLocaleString('en-US')}</Text>
				<br />
        <Text as='samp' fontSize="m"  mb={4}>Terms: </Text>
				<Text as='samp'color={textColor} >{dagger.loanTermYears} Years</Text>
				<br />
        <Text as='samp' fontSize="m"  mb={4}>Mortgage Rate: </Text>
				<Text as='samp' color={textColor} >{dagger.annualInterestRate}%</Text>
				<br />

        <Text as='samp' fontSize="m"  mb={4}>monthly PI: </Text>
				<Text as='samp' color={monthlyPIColor} >${dagger.monthlyPI.toLocaleString('en-US')}</Text>
				<br />

        <Text as='samp' fontSize="m"  mb={4}>Total Interest: </Text>
				<Text as='samp'color={textColor} >${dagger.totalInterest.toLocaleString('en-US')}</Text>
				<br />

        <Text as='samp' fontSize="m"  mb={4}>Total Payment: </Text>
				<Text as='samp'color={textColor} >${dagger.totalPayment.toLocaleString('en-US')}</Text>
				<br />
        <br />

        <HStack spacing={4} justify="flex-end">
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteDagger(dagger._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Dagger</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text mb='8px'>Loan Amount</Text>
							<Input
                placeholder="Loan Amount"
                loanAmount="loanAmount"
                value={updatedDagger.loanAmount}
                onChange={(e) =>
                  setUpdatedDagger({
                    ...updatedDagger,
                    loanAmount: e.target.value,
                  })
                }
              />
							<Text mb='8px'>Years</Text>
              <Input
                placeholder="Terms"
                loanAmount="loanTermYears"
                type="number"
                value={updatedDagger.loanTermYears}
                onChange={(e) =>
                  setUpdatedDagger({
                    ...updatedDagger,
                    loanTermYears: e.target.value,
                  })
                }
              />
							<Text mb='8px'>Interest Rate</Text>
              <Input
                placeholder="Interest Rate"
                loanAmount="annualInterestRate"
                value={updatedDagger.annualInterestRate}
                onChange={(e) =>
                  setUpdatedDagger({
                    ...updatedDagger,
                    annualInterestRate: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateDagger(dagger._id, updatedDagger)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default DaggerCard;
