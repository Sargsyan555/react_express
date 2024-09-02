import {useEffect} from  "react"
import './App.css';

function App() {
  useEffect(() => {
    fetch("/data").then((resp) => resp.json()).then((resp) => {
       console.log(resp);
    })
  }, []);
  return (
   <h1>Ekav</h1>
  );
}

export default App;
