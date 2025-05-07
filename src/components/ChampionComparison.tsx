import { Champion } from '../types/champion';

interface ChampionComparisonProps {
  champions: Champion[];
}

export function ChampionComparison({ champions }: ChampionComparisonProps) {
  if (champions.length < 2) {
    return (
      <div className="text-center py-20">
        <p className="text-[#C89B3C] text-xl">
          Selecciona 2 campeones para compararlos
        </p>
      </div>
    );
  }

  const [champion1, champion2] = champions;

  const ComparisonBar = ({ value1, value2, label }: { value1: number; value2: number; label: string }) => (
    <div className="mb-6">
      <div className="flex justify-between text-[#A09B8C] mb-2">
        <span>{value1}</span>
        <span>{label}</span>
        <span>{value2}</span>
      </div>
      <div className="flex gap-1">
        <div className="w-1/2 flex justify-end">
          <div className="h-4 bg-[#C89B3C]" style={{ width: `${(value1 / Math.max(value1, value2)) * 100}%` }} />
        </div>
        <div className="w-1/2">
          <div className="h-4 bg-[#C89B3C]" style={{ width: `${(value2 / Math.max(value1, value2)) * 100}%` }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-[#463714]">
        <div className="aspect-video mb-6 relative overflow-hidden rounded-lg">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion1.id}_0.jpg`}
            alt={champion1.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-[#F0E6D2] text-3xl font-bold">{champion1.name}</h2>
            <p className="text-[#C89B3C]">{champion1.title}</p>
          </div>
        </div>
      </div>

      <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-[#463714]">
        <div className="aspect-video mb-6 relative overflow-hidden rounded-lg">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion2.id}_0.jpg`}
            alt={champion2.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-[#F0E6D2] text-3xl font-bold">{champion2.name}</h2>
            <p className="text-[#C89B3C]">{champion2.title}</p>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-[#463714]">
        <h3 className="text-[#C89B3C] font-bold mb-8 text-xl">COMPARACIÓN DE ESTADÍSTICAS</h3>
        
        <ComparisonBar
          value1={champion1.info.attack}
          value2={champion2.info.attack}
          label="Ataque"
        />
        <ComparisonBar
          value1={champion1.info.defense}
          value2={champion2.info.defense}
          label="Defensa"
        />
        <ComparisonBar
          value1={champion1.info.magic}
          value2={champion2.info.magic}
          label="Magia"
        />
        <ComparisonBar
          value1={champion1.stats.hp}
          value2={champion2.stats.hp}
          label="Vida"
        />
        <ComparisonBar
          value1={champion1.stats.mp}
          value2={champion2.stats.mp}
          label="Maná"
        />
        <ComparisonBar
          value1={champion1.stats.armor}
          value2={champion2.stats.armor}
          label="Armadura"
        />
        <ComparisonBar
          value1={champion1.stats.attackdamage}
          value2={champion2.stats.attackdamage}
          label="Daño de Ataque"
        />
        <ComparisonBar
          value1={champion1.stats.movespeed}
          value2={champion2.stats.movespeed}
          label="Velocidad"
        />
      </div>
    </div>
  );
}