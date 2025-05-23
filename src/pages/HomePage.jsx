import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDaggerStore } from "../store/dagger";
import DaggerCard from "../components/DaggerCard";
import FunnyButton from "../components/FunnyButton";

const HomePage = () => {
	const { fetchDaggers, daggers } = useDaggerStore();

const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Call your existing fetch function
    fetchDaggers();

    // Mobile check logic
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [fetchDaggers]);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={{ base: "25", sm: "15", md: "30" }}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
					
				>
					Monthly Principle and Interest
				</Text>
				{!isMobile && <FunnyButton />}

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{daggers.map((dagger) => (
						<DaggerCard key={dagger._id} dagger={dagger} />
					))}
				</SimpleGrid>

				{daggers.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No daggers found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a dagger
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;