import "./App.css"
import { BrowserRouter, Routes, Route} from "react-router"
import Container from "./components/Container.jsx"
import Home from "./routes/Home.jsx"
import Header from "./components/Header.jsx"
import NotFound from "./routes/NotFound.jsx"

import Register from "./routes/users/Register.jsx"
import Login from "./routes/users/Login.jsx"
import Dashboard from "./routes/users/Dashboard.jsx"
import UpdateUser from "./routes/users/UpdateUser.jsx"

import Store from "./routes/books/Store.jsx"
import Update from "./routes/books/Update.jsx"
import PrivateRoute from "./routes/PrivateRoute.jsx"
import Show from "./routes/books/Show.jsx"

import { UserProvider } from "./context/UserProvider.jsx"
import UserPosts from "./routes/users/UserPosts.jsx"
import Search from "./routes/Search.jsx"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Container>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/search/books" element={<Search />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/books/:id" element={<Show />}/>

              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/books/store" element={<Store />} />
                <Route path="/books/update/:book_id" element={ <Update /> } />
                <Route path="/users/update/:user_id" element={<UpdateUser />}/>
                <Route path="/users/:user_id/posts" element={<UserPosts />}/>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
