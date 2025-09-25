import type { Answers } from "../types";

interface ResultsProps {
  answers: Answers;
  onRestart: () => void;
}

interface Recommendation {
  title: string;
  type: "success" | "info";
  description: string;
}

function getRecommendation(answers: Answers): Recommendation {
  // Logic from the original Streamlit app
  if (answers.allein === "Allein" && answers.haftung === "Ja") {
    return {
      title: "Empfehlung: Einzelunternehmen",
      type: "success",
      description:
        "**Einzelunternehmen** sind die einfachste Rechtsform für Solo-Gründer:innen. Du hast angegeben, dass du allein gründest, bereit bist zu haften und keine aufwendige Buchhaltung brauchst. Das passt gut zu einem unkomplizierten Start als Einzelperson.",
    };
  } else if (
    answers.haftung === "Lieber nicht" &&
    answers.kapital === "Unter 1.000 €"
  ) {
    return {
      title: "Empfehlung: UG (haftungsbeschränkt)",
      type: "success",
      description:
        "**Die Unternehmergesellschaft (UG)** ist eine günstige Möglichkeit, haftungsbeschränkt zu gründen. Du willst nicht mit deinem Privatvermögen haften und hast nur wenig Startkapital – genau dafür wurde die UG geschaffen.",
    };
  } else if (
    answers.haftung === "Lieber nicht" &&
    answers.kapital === "Mehr als 25.000 €"
  ) {
    return {
      title: "Empfehlung: GmbH",
      type: "success",
      description:
        "**Die GmbH** ist eine etablierte Rechtsform für professionelle, haftungsbeschränkte Gründungen. Du hast ausreichend Startkapital und möchtest Sicherheit und Seriosität – das spricht klar für eine GmbH.",
    };
  } else {
    return {
      title: "Empfehlung: GbR oder UG – je nach Haftungsbereitschaft.",
      type: "info",
      description:
        "**Eine GbR oder UG** kommt für dich infrage – je nachdem, ob du bereit bist zu haften oder nicht. Du möchtest im Team gründen und hast eher wenig Startkapital. Wenn du Vertrauen ins Team hast: GbR. Wenn du auf Nummer sicher gehen willst: UG.",
    };
  }
}

export default function Results({ answers, onRestart }: ResultsProps) {
  const recommendation = getRecommendation(answers);

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

      {/* Results */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Empfohlene Rechtsform</h2>

        <div
          className={`p-6 rounded-lg border-l-4 mb-6 ${
            recommendation.type === "success"
              ? "bg-green-50 border-green-500"
              : "bg-blue-50 border-blue-500"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              recommendation.type === "success"
                ? "text-green-800"
                : "text-blue-800"
            }`}
          >
            {recommendation.title}
          </h3>

          <div
            className={`text-[17px] leading-relaxed ${
              recommendation.type === "success"
                ? "text-green-700"
                : "text-blue-700"
            }`}
          >
            {recommendation.description
              .split("**")
              .map((part, index) =>
                index % 2 === 1 ? <strong key={index}>{part}</strong> : part
              )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mb-8">
        <button
          onClick={onRestart}
          className="bg-[#e30613] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#c1050f] transition-colors"
        >
          Zurück zur ersten Frage
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
