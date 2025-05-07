import { ChampionFilters, CHAMPION_ROLES, CHAMPION_DIFFICULTIES } from '../types/champion';

interface FiltersProps {
  filters: ChampionFilters;
  onFilterChange: (filters: ChampionFilters) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleFilterChange = (category: keyof ChampionFilters, value: string) => {
    const updatedFilters = { ...filters };
    const categoryArray = updatedFilters[category];
    
    if (categoryArray.includes(value)) {
      updatedFilters[category] = categoryArray.filter(item => item !== value);
    } else {
      updatedFilters[category] = [...categoryArray, value];
    }
    
    onFilterChange(updatedFilters);
  };

  const FilterButton = ({ category, value }: { category: keyof ChampionFilters, value: string }) => (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        filters[category].includes(value)
          ? 'bg-[#C89B3C] text-[#010A13]'
          : 'bg-[#1E282D] text-[#C89B3C] hover:bg-[#2A363D]'
      }`}
      onClick={() => handleFilterChange(category, value)}
    >
      {value}
    </button>
  );

  return (
    <div className="mb-8 space-y-6">
      <div>
        <h3 className="text-[#C89B3C] mb-3 font-medium">Rol</h3>
        <div className="flex flex-wrap gap-2">
          {CHAMPION_ROLES.map(role => (
            <FilterButton key={role} category="roles" value={role} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#C89B3C] mb-3 font-medium">Dificultad</h3>
        <div className="flex flex-wrap gap-2">
          {CHAMPION_DIFFICULTIES.map(difficulty => (
            <FilterButton key={difficulty} category="difficulty" value={difficulty} />
          ))}
        </div>
      </div>
    </div>
  );
}