// Generated from game-core HeroDefinitions/StageConfig and RN EnemyView.
export const CONTENT = {
  "heroes": [
    {
      "tier": 1,
      "attack": 10,
      "interval": 1.0,
      "attackType": "melee",
      "visualId": "hero_turtle_warrior__1815x1620"
    },
    {
      "tier": 2,
      "attack": 20,
      "interval": 1.0,
      "attackType": "magic",
      "visualId": "hero_fox_sorcerer__1828x1679"
    },
    {
      "tier": 3,
      "attack": 40,
      "interval": 1.0,
      "attackType": "ranged",
      "visualId": "hero_raccoon_engineer__1617x1662"
    },
    {
      "tier": 4,
      "attack": 80,
      "interval": 1.0,
      "attackType": "magic",
      "visualId": "hero_owl_mage__1813x1760"
    },
    {
      "tier": 5,
      "attack": 160,
      "interval": 1.0,
      "attackType": "melee",
      "visualId": "hero_panda_monk__1705x1775"
    },
    {
      "tier": 6,
      "attack": 320,
      "interval": 1.0,
      "attackType": "melee",
      "visualId": "hero_bunny_assassin__1711x1827"
    },
    {
      "tier": 7,
      "attack": 640,
      "interval": 1.0,
      "attackType": "melee",
      "visualId": "hero_lion_knight__1616x1788"
    },
    {
      "tier": 8,
      "attack": 1280,
      "interval": 1.0,
      "attackType": "magic",
      "visualId": "hero_ice_fairy__1718x1740"
    },
    {
      "tier": 9,
      "attack": 2560,
      "interval": 1.0,
      "attackType": "magic",
      "visualId": "hero_inferno_dragon__1886x1748"
    },
    {
      "tier": 10,
      "attack": 5120,
      "interval": 1.0,
      "attackType": "ranged",
      "visualId": "hero_elf_archer__1797x1858"
    }
  ],
  "stages": [
    {
      "name": "1-1",
      "clearGold": 5,
      "waves": [
        {
          "id": "ironhide_boar",
          "hp": 40,
          "gold": 1,
          "art": "enemy"
        }
      ]
    },
    {
      "name": "1-2",
      "clearGold": 20,
      "waves": [
        {
          "id": "boar_scout",
          "hp": 250,
          "gold": 8,
          "art": "scout"
        },
        {
          "id": "bomb_goblin",
          "hp": 250,
          "gold": 8,
          "art": "goblin"
        }
      ]
    }
  ]
} as const;
