<<<<<<< HEAD
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/secret");
    } else {
      Router.push("/login");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (result.error) {
        setError(result.error);
      } else {
        Router.push("/secret");
      }
      // console.log(result);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle> {error}</AlertTitle>
          </Alert>
        )}
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool{" "}
                <Link color={"blue.400"}>features</Link> ✌️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </>
  );
}

export default LoginForm;
=======
'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username,password)

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username, password })
    // });

    // if (response.ok) {
    //   router.push('/dashboard');
    // } else {
    //   const data = await response.json();
    //   setErrorMessage(data.message);
    // }
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
>>>>>>> 02872fb7b00d96eb9f32c26c63e26ab90fc91baf
