import './App.css';

import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Header } from "./modules/Header";
import { ProgressSection } from "./modules/ProgressSection";
import { ResultsSection } from "./modules/ResultsSection";

const App = () => {
  const [appState, setAppState] = useState('initial');
  return (
    <div className="App">
      <Header setAppState={setAppState}/>
      <ProgressSection appState={appState}/>
      <ResultsSection/>
    </div>
  );

}


export default App;
