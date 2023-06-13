import { Box, Flex, Heading, Spacer, useBreakpointValue } from "@chakra-ui/react";

function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="#0D2D5E" py={3} px={4} color="white">
      <Flex alignItems="center"  justifyContent="center">
        <Heading size="lg" fontWeight={400}>ตรวจสอบความปลอดภัย</Heading>
        {isMobile && (
          <Box>
            {/* Mobile header elements */}
          </Box>
        )}
        {/* Add more header components here */}
      </Flex>
    </Box>
  );
};


export default Header;