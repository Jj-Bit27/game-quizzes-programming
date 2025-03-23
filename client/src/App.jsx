/* Bibliotecas */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Paginas */
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import CreateQuiz from "./pages/CreateQuiz.jsx";

/* Componentes */
import NavBar from "./components/Navbar.jsx";
import { AuthProvider } from "./lib/authContext.jsx";
import { ProtectedRoute, ProtectedRouteAdmin } from "./lib/routes.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/create-quiz" element={<CreateQuiz />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
