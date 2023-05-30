import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
    path: "/page/:pageId",
    element: <Home />,
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
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
export default App;
