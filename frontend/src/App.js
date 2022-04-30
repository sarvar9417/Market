import { Market } from "./market/Market";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Market />
    </ChakraProvider>
  );
}

export default App;
