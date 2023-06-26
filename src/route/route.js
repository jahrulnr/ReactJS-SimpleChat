
import { Routes, Route } from "react-router-dom";
import { Auth } from '../services/cookie'
import Login from "../views/Login";
import page from "../services/page";
import Message from "../views/Message/Message";
import Chat from "../views/Message/Chat";
import Search from "../views/Friend/Search";

export class RoutePath {
  static HOME = '/'
  static SEARCH = '/search'
  static CHAT = '/chat'
}

function App() {
  const Page = new page()
  if (Page.isLoading()) {
    Page.setLoader(false)
  }

  const auth = Auth()
  if (!auth.check())
    return <Login />

  return (
    <Routes>
      <Route path={RoutePath.HOME} index element={<Message />} />
      <Route path={RoutePath.SEARCH} element={<Search />} />
      <Route path={RoutePath.CHAT + '/*'} element={<Chat />} />
    </Routes>
  );
}

export default App;
