import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Header } from "../components/Header/Header";
import { ProgressSection } from "../components/ProgressSection/ProgressSection";
import { ResultsSection } from "../components/ResultsSection/ResultsSection";
import {RequestFactory} from "../services/api/ApiRequest";


const App = () => {
  const [appState, setAppState] = useState({ state:'initial' });
  const requestFactory = new RequestFactory();
  return (
    <div className="App">
      <Header setAppState={setAppState} requestFactory={requestFactory}/>
      <ProgressSection appState={appState}/>
      <ResultsSection appState={appState} setAppState={setAppState} requestFactory={requestFactory}/>
    </div>
  );

}


export default App;
