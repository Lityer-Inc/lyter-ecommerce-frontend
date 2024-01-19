import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ShopContextProvider } from "./context/shop-context.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // react-query client for initialization

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ShopContextProvider>
  </BrowserRouter>
);
