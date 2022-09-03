import { useSelector } from "react-redux";
import Content from "./components/content/Content";
import Login from "./components/login/Login";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="App">
      {!user ? <Login /> : <Content/>}
      
    </div>
  );
}

export default App;
