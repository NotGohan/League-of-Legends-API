import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Champion, ChampionSkin } from "../types/champion";
import axios from "axios";

interface ChampionCardProps {
  champion: Champion;
}

export function ChampionCard({ champion }: ChampionCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [championDetails, setChampionDetails] = useState<Champion | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<ChampionSkin | null>(null);

  useEffect(() => {
    if (showModal && !championDetails) {
      fetchChampionDetails();
    }
  }, [showModal]);

  const fetchChampionDetails = async () => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/13.24.1/data/es_ES/champion/${champion.id}.json`
      );
      const championData = response.data.data[champion.id];
      setChampionDetails(championData);
      if (championData.skins?.length > 0) {
        setSelectedSkin(championData.skins[0]);
      }
    } catch (error) {
      console.error("Error fetching champion details:", error);
    }
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 3) return "BAJA";
    if (difficulty <= 6) return "MODERADA";
    return "ALTA";
  };

  const getRoleText = (tags: string[]) => {
    const roleMap: { [key: string]: string } = {
      Fighter: "LUCHADOR",
      Tank: "TANQUE",
      Mage: "MAGO",
      Assassin: "ASESINO",
      Support: "APOYO",
      Marksman: "TIRADOR",
    };
    return tags.map((tag) => roleMap[tag] || tag).join(" / ");
  };

  return (
    <>
      <div
        className="champion-card group cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
            alt={champion.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="champion-name-container absolute bottom-0 left-0 right-0 bg-[#010A13]/80 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="title-font text-xl font-bold text-[#F0E6D2] tracking-wider uppercase">
              {champion.name}
            </h3>
          </div>
        </div>
      </div>

      {showModal && championDetails && (
        <div className="fixed inset-0 bg-black/100 z-50 overflow-y-auto">
          <div className="relative">
            <div className="fixed inset-0">
              <div className="h-[100vh] relative">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                  alt={champion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="fixed top-8 right-8 text-[#C89B3C] hover:text-[#F0E6D2] transition-colors z-[9999]"
            >
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </button>

            <div className="relative z-10">
              <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-12">
                    <h2 className="text-[#C89B3C] title-font text-2xl mb-4">
                      {championDetails.title.toUpperCase()}
                    </h2>
                    <h1 className="title-font text-7xl font-bold text-[#F0E6D2] mb-8">
                      {championDetails.name.toUpperCase()}
                    </h1>
                    <p className="text-[#A09B8C] text-xl max-w-3xl leading-relaxed">
                      {championDetails.blurb}
                    </p>
                  </div>

                  <div className="flex gap-8 mb-16">
                    <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-[#463714]">
                      <div className="text-[#C89B3C] mb-2">ROL</div>
                      <div className="text-[#F0E6D2] text-lg">
                        {getRoleText(championDetails.tags)}
                      </div>
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-[#463714]">
                      <div className="text-[#C89B3C] mb-2">DIFICULTAD</div>
                      <div className="text-[#F0E6D2] text-lg">
                        {getDifficultyText(championDetails.info.difficulty)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-[#463714]">
                      <h3 className="text-[#C89B3C] font-bold mb-6 text-xl">
                        ESTADÍSTICAS DE COMBATE
                      </h3>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[#A09B8C] text-lg">Ataque</span>
                          <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-8 ${
                                  i < championDetails.info.attack
                                    ? "bg-[#C89B3C]"
                                    : "bg-[#1E282D] border border-[#463714]"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#A09B8C] text-lg">Defensa</span>
                          <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-8 ${
                                  i < championDetails.info.defense
                                    ? "bg-[#C89B3C]"
                                    : "bg-[#1E282D] border border-[#463714]"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#A09B8C] text-lg">Magia</span>
                          <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-8 ${
                                  i < championDetails.info.magic
                                    ? "bg-[#C89B3C]"
                                    : "bg-[#1E282D] border border-[#463714]"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-[#463714]">
                      <h3 className="text-[#C89B3C] font-bold mb-6 text-xl">
                        ATRIBUTOS BASE
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-[#A09B8C] mb-2">Vida</div>
                          <div className="text-[#F0E6D2] text-2xl font-medium">
                            {championDetails.stats.hp}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#A09B8C] mb-2">
                            {championDetails.partype}
                          </div>
                          <div className="text-[#F0E6D2] text-2xl font-medium">
                            {championDetails.stats.mp}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#A09B8C] mb-2">Armadura</div>
                          <div className="text-[#F0E6D2] text-2xl font-medium">
                            {championDetails.stats.armor}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#A09B8C] mb-2">Velocidad</div>
                          <div className="text-[#F0E6D2] text-2xl font-medium">
                            {championDetails.stats.movespeed}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative -mx-4 px-4 py-16 bg-black">
                    {championDetails.skins && (
                      <div>
                        <h3 className="text-[#C89B3C] font-bold mb-8 text-2xl">
                          ASPECTOS DISPONIBLES
                        </h3>

                        <div className="relative aspect-[21/9] mb-8 rounded-lg overflow-hidden">
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
                              champion.id
                            }_${selectedSkin?.num || 0}.jpg`}
                            alt={selectedSkin?.name || champion.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h4 className="text-[#F0E6D2] text-2xl font-bold">
                              {selectedSkin?.name === "default"
                                ? champion.name
                                : selectedSkin?.name}
                            </h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {championDetails.skins.map((skin) => (
                            <div
                              key={skin.id}
                              className={`relative cursor-pointer group ${
                                selectedSkin?.id === skin.id
                                  ? "ring-2 ring-[#C89B3C]"
                                  : ""
                              }`}
                              onClick={() => setSelectedSkin(skin)}
                            >
                              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                                <img
                                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                                  alt={skin.name}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <p className="text-[#F0E6D2] text-sm font-medium">
                                    {skin.name === "default"
                                      ? champion.name
                                      : skin.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}