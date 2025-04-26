export interface Champion {
  id: string;
  name: string;
  title: string;
  blurb: string;
  image: {
    full: string;
  };
  tags: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
  partype: string;
  skins?: ChampionSkin[];
}

export interface ChampionSkin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}