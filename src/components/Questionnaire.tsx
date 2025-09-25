import { useState, useEffect } from "react";
import type { Answers } from "../types";

interface Question {
  text: string;
  key: string;
  options: string[];
  info: string;
}

const questions: Question[] = [
  {
    text: "Willst du allein gründen oder mit anderen zusammen?",
    key: "allein",
    options: ["Allein", "Mit anderen"],
    info: "Diese Frage entscheidet, ob du z. B. ein Einzelunternehmen gründen kannst oder eher eine Teamform wie die GbR brauchst.",
  },
  {
    text: "Vertraust du deinen Mitgründer:innen voll und ganz?",
    key: "vertrauen",
    options: ["Ja", "Nicht komplett"],
    info: "Wenn du nicht komplett vertraust, ist eine Rechtsform mit klaren Regeln und Haftungsschutz (z. B. UG oder GmbH) sinnvoller.",
  },
  {
    text: "Wärst du bereit, mit deinem eigenen Geld zu haften?",
    key: "haftung",
    options: ["Ja", "Lieber nicht"],
    info: "Wenn du nicht mit deinem Privatvermögen haften willst, brauchst du eine haftungsbeschränkte Rechtsform wie UG oder GmbH.",
  },
  {
    text: "Wie groß ist das Risiko deiner Idee?",
    key: "risiko",
    options: ["Eher klein", "Mittel", "Eher groß"],
    info: "Je höher das Risiko, desto wichtiger ist es, deine Haftung zu begrenzen – etwa mit einer UG oder GmbH.",
  },
  {
    text: "Wie viel Geld kannst du selbst einbringen?",
    key: "kapital",
    options: ["Unter 1.000 €", "1.000–25.000 €", "Mehr als 25.000 €"],
    info: "Das verfügbare Startkapital entscheidet mit darüber, ob eine GmbH (mind. 25.000 €) oder eher eine UG/GbR infrage kommt.",
  },
  {
    text: "Willst du dir Geld von Investor:innen oder Banken holen?",
    key: "fremdkapital",
    options: ["Ja", "Nein"],
    info: "Investor:innen bevorzugen oft Kapitalgesellschaften (UG, GmbH), da sie klar geregelt sind und Haftung begrenzen.",
  },
  {
    text: "Willst du mit deiner Idee Geld verdienen?",
    key: "gewinn",
    options: ["Ja", "Nein, mir geht's um den guten Zweck"],
    info: "Wenn dein Ziel nicht wirtschaftlich ist, kommen gemeinnützige Formen wie der eingetragene Verein (e.V.) infrage.",
  },
  {
    text: "Wie einfach sollen Steuern und Buchhaltung für dich sein?",
    key: "steuern",
    options: ["So einfach wie möglich", "Ich komme auch mit mehr Aufwand klar"],
    info: "Einzelunternehmen und GbR sind einfacher zu führen. Kapitalgesellschaften erfordern mehr Buchhaltung und Steuerkenntnis.",
  },
  {
    text: "Ist es für dich okay, Geld für Gründung und Bürokratie auszugeben (z. B. Notar)?",
    key: "papierkram",
    options: ["Ja", "Lieber einfach und günstig"],
    info: "Für UG und GmbH brauchst du einen Notar, Einträge ins Handelsregister usw. Das kostet Zeit und Geld.",
  },
  {
    text: "Soll dein Unternehmen ins Handelsregister eingetragen werden?",
    key: "handelsregister",
    options: ["Ja", "Nein", "Ist mir egal"],
    info: "Kapitalgesellschaften wie UG oder GmbH müssen eingetragen werden. Für GbR oder Einzelunternehmen ist das optional.",
  },
  {
    text: "Ist deine Gründung langfristig geplant oder erstmal nur ein Test?",
    key: "planung",
    options: ["Nur zum Ausprobieren", "Langfristig"],
    info: "Wenn du langfristig planst, lohnt sich der Aufwand für eine stabile, rechtssichere Rechtsform wie UG oder GmbH.",
  },
  {
    text: "Möchtest du allein entscheiden oder gemeinsam mit anderen?",
    key: "entscheidung",
    options: ["Allein entscheiden", "Mit anderen zusammen"],
    info: "In einer GbR oder GmbH musst du wichtige Entscheidungen mit den anderen abstimmen. Im Einzelunternehmen entscheidest du allein.",
  },
  {
    text: "Machst du etwas Freiberufliches (z. B. Beratung, Kunst, Wissenschaft)?",
    key: "freiberuflich",
    options: ["Ja", "Nein", "Weiß ich nicht"],
    info: "Freiberufler:innen brauchen meist kein Gewerbe anzumelden und nutzen oft das Einzelunternehmen (freiberuflich).",
  },
  {
    text: "Ist das Image deiner Firma in deiner Branche wichtig?",
    key: "image",
    options: ["Ja", "Nein", "Keine Ahnung"],
    info: "In bestimmten Branchen (z. B. Beratung, Tech) wirkt eine GmbH oft professioneller als z. B. eine GbR.",
  },
];

interface QuestionnaireProps {
  onComplete: (answers: Answers) => void;
  onBackToStart: () => void;
}

export default function Questionnaire({
  onComplete,
  onBackToStart,
}: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (currentQuestion && answers[currentQuestion.key]) {
      setSelectedOption(answers[currentQuestion.key]);
    } else {
      setSelectedOption("");
    }
  }, [currentQuestionIndex, answers, currentQuestion]);

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [currentQuestion.key]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      onComplete(newAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onBackToStart();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
        <div className="lg:col-span-2">
          <h1 className="text-[40px] font-bold text-[#002856] leading-tight">
            DFJW Starter Kit Rechtsform-Finder
          </h1>
        </div>
        <div className="lg:col-span-1">
          <img
            src="starter-kit/header.jpg"
            alt="Header"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-[#e30613] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Frage {currentQuestionIndex + 1} von {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-4">{currentQuestion.text}</h2>
        <p className="text-[17px] text-gray-700 leading-relaxed mb-6">
          {currentQuestion.info}
        </p>
      </div>

      {/* Options */}
      <div className="mb-8">
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name={currentQuestion.key}
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-4 h-4 text-[#e30613] border-gray-300 focus:ring-[#e30613]"
              />
              <span className="text-lg">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Zurück
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="px-6 py-2 bg-[#e30613] text-white rounded-lg hover:bg-[#c1050f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Weiter
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-xs text-gray-500 text-center">
        Hinweis: Diese App ersetzt keine steuerliche oder rechtliche Beratung.
        Kontakt und Fragen: Raffael Ruppert
      </div>
    </div>
  );
}
