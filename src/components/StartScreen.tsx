interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          <h1 className="text-[40px] font-bold text-[#002856] leading-tight mb-4">
            DFJW Starter Kit Rechtsform-Finder
          </h1>
          <div className="text-[17px] leading-relaxed text-gray-800 mb-8">
            <p className="mb-4">
              🇩🇪 🇫🇷 Im Rahmen von <strong>Generation Europa 2025</strong> des
              Deutsch-Französischen Jugendwerks hat es sich eine Untergruppe zum
              Ziel gesetzt, den Gründungsprozess in Deutschland und Frankreich
              zu erleichtern.
            </p>
            <p>
              Der <strong>Rechtsform-Finder</strong> bietet dir eine einfache,
              intuitive Entscheidungshilfe zur passenden Rechtsform –
              transparent und verständlich.
            </p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <img
            src="starter-kit/header.jpg"
            alt="Header"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onStart}
          className="bg-[#e30613] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#c1050f] transition-colors"
        >
          Jetzt starten
        </button>
      </div>

      <div className="mt-12 text-xs text-gray-500 text-center">
        Hinweis: Diese App ersetzt keine steuerliche oder rechtliche Beratung.
        Kontakt und Fragen: Raffael Ruppert
      </div>
    </div>
  );
}
