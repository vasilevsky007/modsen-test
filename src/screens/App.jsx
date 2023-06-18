import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Header } from "../components/Header/Header";
import { ProgressSection } from "../components/ProgressSection/ProgressSection";
import { ResultsSection } from "../components/ResultsSection/ResultsSection";

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
