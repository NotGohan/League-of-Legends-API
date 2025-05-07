import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { Champion, ChampionFilters } from './types/champion';
import { ChampionCard } from './components/ChampionCard';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { ChampionComparison } from './components/ChampionComparison';
import lolIcon from './assets/Lol Icono.png';

function App() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ChampionFilters>({
    roles: [],
    difficulty: []
  });
  const [selectedChampions, setSelectedChampions] = useState<Champion[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteChampions');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get(
          'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/es_ES/champion.json'
        );
        const championsData = Object.values(response.data.data) as Champion[];
        setChampions(championsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching champions:', error);
        setLoading(false);
      }
    };

    fetchChampions();

    // Click outside listener for search suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteChampions', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (championId: string) => {
    setFavorites(prev => 
      prev.includes(championId)
        ? prev.filter(id => id !== championId)
        : [...prev, championId]
    );
  };

  const toggleChampionSelection = (champion: Champion) => {
    setSelectedChampions(prev => {
      if (prev.find(c => c.id === champion.id)) {
        return prev.filter(c => c.id !== champion.id);
      }
      if (prev.length < 2) {
        return [...prev, champion];
      }
      return [prev[1], champion];
    });
  };

  const filteredChampions = champions.filter(champion => {
    const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoles = filters.roles.length === 0 || champion.tags.some(tag => filters.roles.includes(tag));
    const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(
      champion.info.difficulty <= 3 ? 'Baja' : champion.info.difficulty <= 6 ? 'Moderada' : 'Alta'
    );
    
    return matchesSearch && matchesRoles && matchesDifficulty;
  });

  const suggestions = champions.filter(champion =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#010A13]">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={lolIcon} alt="League of Legends" className="w-16 h-16" />
            <h1 className="title-font text-5xl font-bold">
              <span className="text-[#F0E6D2]">ELIGE A TU</span>
              <span className="text-[#C89B3C] block">CAMPEÓN</span>
            </h1>
          </div>
          <p className="text-[#A09B8C] max-w-2xl mx-auto text-lg">
            Teniendo en cuenta que hay más de 140 campeones, no tardarás en encontrar tu estilo de juego.
            Domina a uno o a todos.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowComparison(false)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              !showComparison ? 'bg-[#C89B3C] text-[#010A13]' : 'bg-[#1E282D] text-[#C89B3C]'
            }`}
          >
            Galería de Campeones
          </button>
          <button
            onClick={() => setShowComparison(true)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              showComparison ? 'bg-[#C89B3C] text-[#010A13]' : 'bg-[#1E282D] text-[#C89B3C]'
            }`}
          >
            Comparar Campeones ({selectedChampions.length}/2)
          </button>
        </div>
        
        {!showComparison ? (
          <>
            <div className="search-container relative" ref={searchRef}>
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="BUSCAR CAMPEÓN..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                className="search-input"
              />
              {showSuggestions && searchTerm && (
                <div className="absolute w-full mt-2 bg-[#1E282D] border border-[#463714] rounded-lg shadow-lg z-50">
                  {suggestions.map((champion) => (
                    <div
                      key={champion.id}
                      className="flex items-center gap-4 p-4 hover:bg-[#2A363D] cursor-pointer"
                      onClick={() => {
                        setSearchTerm(champion.name);
                        setShowSuggestions(false);
                      }}
                    >
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
                        alt={champion.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="text-[#F0E6D2]">{champion.name}</div>
                        <div className="text-[#C89B3C] text-sm">{champion.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Filters filters={filters} onFilterChange={setFilters} />

            {loading ? (
              <div className="text-center py-20">
                <FontAwesomeIcon icon={faSpinner} className="text-[#C89B3C] text-4xl animate-spin" />
                <p className="text-[#C89B3C] mt-4 text-lg">Cargando campeones...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredChampions.map((champion) => (
                  <div key={champion.id} className="relative group">
                    <ChampionCard champion={champion} />
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(champion.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(champion.id)
                            ? 'bg-[#C89B3C] text-[#010A13]'
                            : 'bg-[#1E282D] text-[#C89B3C]'
                        }`}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </button>
                      <button
                        onClick={() => toggleChampionSelection(champion)}
                        className={`p-2 rounded-full transition-colors ${
                          selectedChampions.find(c => c.id === champion.id)
                            ? 'bg-[#C89B3C] text-[#010A13]'
                            : 'bg-[#1E282D] text-[#C89B3C]'
                        }`}
                      >
                        {selectedChampions.findIndex(c => c.id === champion.id) + 1 || '+'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <ChampionComparison champions={selectedChampions} />
        )}
      </div>
    </div>
  );
}

export default App;