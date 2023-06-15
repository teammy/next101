import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';

const MainContent = ({children}) => {
  return (

      <Container maxW="full">
        {children}
      </Container>
  );
}

export default MainContent;