import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Champion } from './types/champion';
import { ChampionCard } from './components/ChampionCard';
import { Header } from './components/Header';
import lolIcon from './assets/Lol Icono.png';

function App() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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
  }, []);

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="BUSCAR CAMPEÓN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="text-[#C89B3C] text-4xl animate-spin" />
            <p className="text-[#C89B3C] mt-4 text-lg">Cargando campeones...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredChampions.map((champion) => (
              <ChampionCard key={champion.id} champion={champion} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;