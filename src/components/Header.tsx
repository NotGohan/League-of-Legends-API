import riotLogo from '../assets/riot-games-logo.png';

export function Header() {
  return (
    <header className="bg-[#111111] border-b border-[#252423]">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-[80px]">
          <div className="flex items-center gap-8">
            <img src={riotLogo} alt="Riot Games" className="h-[32px]" />
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.leagueoflegends.com/es-mx/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#D13639] hover:bg-[#BB2F32] text-white font-semibold px-8 py-2 rounded transition-colors"
            >
              JUGAR AHORA
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}