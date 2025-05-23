import {
  Box,
  Text,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDaggerStore } from "../store/dagger";

const CreatePage = () => {
  const [newDagger, setNewDagger] = useState({
    loanAmount: "",
    loanTermYears: "",
    annualInterestRate: "",
  });
  const toast = useToast();

  const { createDagger } = useDaggerStore();

  const handleAddDagger = async () => {
    console.log("handleAddDagger", newDagger);
    const { success, message } = await createDagger(newDagger);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewDagger({ loanAmount: "", loanTermYears: "", annualInterestRate: "" });
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "25", sm: "15", md: "30" }}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Create New Dagger
        </Text>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Loan Amount"
              name="loanAmount"
              type="number"
              value={newDagger.loanAmount}
              onChange={(e) =>
                setNewDagger({ ...newDagger, loanAmount: e.target.value })
              }
            />
            <Input
              placeholder="Years"
              name="loanTermYears"
              type="number"
              value={newDagger.loanTermYears}
              onChange={(e) =>
                setNewDagger({ ...newDagger, loanTermYears: e.target.value })
              }
            />
            <Input
              placeholder="Annual Interest Rate"
              name="annualInterestRate"
              type="number"
              value={newDagger.annualInterestRate}
              onChange={(e) =>
                setNewDagger({
                  ...newDagger,
                  annualInterestRate: e.target.value,
                })
              }
            />

            <Button colorScheme="blue" onClick={handleAddDagger} w="full">
              Add Dagger (calc)
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
