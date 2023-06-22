
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from '../services/cookie'
import Layout from "../views/App/Layout";
import Login from "../views/Login";
import page from "../services/page";
import Message from "../views/Message/Message";
import Chat from "../views/Message/Chat";

export class RoutePath {
  static HOME = '/'
  static CHAT = 'chat'
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
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path={RoutePath.HOME}>
          <Route index element={<Layout><Message /></Layout>} />
          <Route path={RoutePath.CHAT + '/*'} element={<Layout><Chat /></Layout>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
