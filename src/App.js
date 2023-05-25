import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddTodo from "./pages/AddTodo";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <p>Not Found🫠</p>,
  },
  {
    path: "/todos/:todoId",
    element: <Detail />,
  },
  {
    path: "/addTodo",
    element: <AddTodo />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
export default App;
