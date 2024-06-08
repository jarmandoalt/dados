import { useState } from 'react'
import GameConfig from './pages/config/GameConfig'
import InitGame from './pages/game/InitGame';
import { Provider } from "react-redux";
import { store} from "./store/index.jsx";

function App() {
  const [configOrGame, setConfigOrGame] = useState(true)

  return (
    <Provider store={store}>
      {
        configOrGame ?
        <GameConfig/> : <InitGame/>
      }
    </Provider>
  )
}

export default App
