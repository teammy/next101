import { Box, Flex, Heading, Spacer, useBreakpointValue } from "@chakra-ui/react";

function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="#2059E1" py={3} px={4} color="white" borderRadius="0 0 10px 10px">
      <Flex alignItems="center">
        <Heading size="lg">ตรวจสอบอุปกรณ์</Heading>
        <Spacer />
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