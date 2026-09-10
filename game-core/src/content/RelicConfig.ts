// PROPOSED relic-v1. Figma ornaments are visual categories, not probability weights.
export const relicDefinitions = [
  {
    "id": "relic_blue_feather",
    "visualId": "relic_blue_feather__473x665",
    "name": "Blue Feather",
    "stat": "attack",
    "badge": "UR"
  },
  {
    "id": "relic_leaf_crescent",
    "visualId": "relic_leaf_crescent__470x571",
    "name": "Leaf Crescent",
    "stat": "hp",
    "badge": "UR"
  },
  {
    "id": "relic_green_disc",
    "visualId": "relic_green_disc__483x547",
    "name": "Green Disc",
    "stat": "attack",
    "badge": "UR"
  },
  {
    "id": "relic_blue_crescent",
    "visualId": "relic_blue_crescent__505x579",
    "name": "Blue Crescent",
    "stat": "hp",
    "badge": "UR"
  },
  {
    "id": "relic_gold_hammer",
    "visualId": "relic_gold_hammer__474x528",
    "name": "Gold Hammer",
    "stat": "attack",
    "badge": "SR"
  },
  {
    "id": "relic_wolf_mask",
    "visualId": "relic_wolf_mask__479x633",
    "name": "Wolf Mask",
    "stat": "hp",
    "badge": "SR"
  },
  {
    "id": "relic_compass_gold",
    "visualId": "relic_compass_gold__538x602",
    "name": "Compass Gold",
    "stat": "attack",
    "badge": "SR"
  },
  {
    "id": "relic_fire_crystal",
    "visualId": "relic_fire_crystal__447x635",
    "name": "Fire Crystal",
    "stat": "hp",
    "badge": "SR"
  },
  {
    "id": "relic_blue_shard",
    "visualId": "relic_blue_shard__354x641",
    "name": "Blue Shard",
    "stat": "attack",
    "badge": "SS"
  },
  {
    "id": "relic_fire_dragon_head",
    "visualId": "relic_fire_dragon_head__406x576",
    "name": "Fire Dragon Head",
    "stat": "hp",
    "badge": "SS"
  },
  {
    "id": "relic_boar_mask",
    "visualId": "relic_boar_mask__510x544",
    "name": "Boar Mask",
    "stat": "attack",
    "badge": "SS"
  },
  {
    "id": "relic_shadow_crystal",
    "visualId": "relic_shadow_crystal__469x599",
    "name": "Shadow Crystal",
    "stat": "hp",
    "badge": "SS"
  },
  {
    "id": "relic_rabbit_mask",
    "visualId": "relic_rabbit_mask__490x644",
    "name": "Rabbit Mask",
    "stat": "attack",
    "badge": "SS"
  },
  {
    "id": "relic_gold_dragon_head",
    "visualId": "relic_gold_dragon_head__455x633",
    "name": "Gold Dragon Head",
    "stat": "hp",
    "badge": "SS"
  },
  {
    "id": "relic_frost_dragon_head",
    "visualId": "relic_frost_dragon_head__471x629",
    "name": "Frost Dragon Head",
    "stat": "attack",
    "badge": "SS"
  },
  {
    "id": "relic_gold_bird_mask",
    "visualId": "relic_gold_bird_mask__527x591",
    "name": "Gold Bird Mask",
    "stat": "hp",
    "badge": "SS"
  }
] as const;
export const relicById=new Map<string,typeof relicDefinitions[number]>(relicDefinitions.map(d=>[d.id,d]));
export function relicBonus(counts:Readonly<Record<string,number>>,stat:'attack'|'hp'){
 return relicDefinitions.filter(d=>d.stat===stat).reduce((n,d)=>n+Math.min(20,counts[d.id]??0)*200,0);
}
