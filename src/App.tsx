import { useState } from 'react';
import StartScreen from './components/StartScreen';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import type { Answers } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'start' | 'questionnaire' | 'results'>('start');
  const [answers, setAnswers] = useState<Answers>({});

  const handleStart = () => {
    setCurrentView('questionnaire');
  };

  const handleQuestionnaireComplete = (finalAnswers: Answers) => {
    setAnswers(finalAnswers);
    setCurrentView('results');
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentView('questionnaire');
  };

  const handleBackToStart = () => {
    setAnswers({});
    setCurrentView('start');
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,-apple-system,BlinkMacSystemFont,sans-serif]">
      {currentView === 'start' && <StartScreen onStart={handleStart} />}
      {currentView === 'questionnaire' && (
        <Questionnaire 
          onComplete={handleQuestionnaireComplete}
          onBackToStart={handleBackToStart}
        />
      )}
      {currentView === 'results' && (
        <Results 
          answers={answers} 
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
