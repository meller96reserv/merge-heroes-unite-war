// PROPOSED meta-v1: source art identities are preserved; slots/bonuses/costs are product rules.
export const equipmentSlots = ['offhand','feet','ring','weapon','armor','charm'] as const;
export type EquipmentSlot = typeof equipmentSlots[number];
export type EquipmentDefinition = {id:string;heroDefinitionId:string;slotType:EquipmentSlot;visualId:string;name:string};
export const equipmentDefinitions: readonly EquipmentDefinition[] = [
  {
    "id": "equipment_turtle_warrior_ring_534x437",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "ring",
    "visualId": "equipment_turtle_warrior_ring__534x437",
    "name": "Ring"
  },
  {
    "id": "equipment_turtle_warrior_ring_shell_257x244",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "charm",
    "visualId": "equipment_turtle_warrior_ring_shell__514x487",
    "name": "Ring Shell"
  },
  {
    "id": "equipment_turtle_warrior_hammer_281x323",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "weapon",
    "visualId": "equipment_turtle_warrior_hammer__562x646",
    "name": "Hammer"
  },
  {
    "id": "equipment_turtle_warrior_chest_shell_608x522",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "armor",
    "visualId": "equipment_turtle_warrior_chest_shell__608x522",
    "name": "Chest Shell"
  },
  {
    "id": "equipment_turtle_warrior_mace_583x649",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "weapon",
    "visualId": "equipment_turtle_warrior_mace__583x649",
    "name": "Mace"
  },
  {
    "id": "equipment_turtle_warrior_ring_orb_511x435",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "charm",
    "visualId": "equipment_turtle_warrior_ring_orb__511x435",
    "name": "Ring Orb"
  },
  {
    "id": "equipment_turtle_warrior_hammer_562x646",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "weapon",
    "visualId": "equipment_turtle_warrior_hammer__562x646",
    "name": "Hammer"
  },
  {
    "id": "equipment_turtle_warrior_ring_shell_514x487",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "charm",
    "visualId": "equipment_turtle_warrior_ring_shell__514x487",
    "name": "Ring Shell"
  },
  {
    "id": "equipment_turtle_warrior_ring_267x219",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "ring",
    "visualId": "equipment_turtle_warrior_ring__534x437",
    "name": "Ring"
  },
  {
    "id": "equipment_turtle_warrior_chest_shell_304x261",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "armor",
    "visualId": "equipment_turtle_warrior_chest_shell__608x522",
    "name": "Chest Shell"
  },
  {
    "id": "equipment_turtle_warrior_chest_plate_343x278",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "armor",
    "visualId": "equipment_turtle_warrior_chest_plate__686x555",
    "name": "Chest Plate"
  },
  {
    "id": "equipment_turtle_warrior_mace_292x325",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "weapon",
    "visualId": "equipment_turtle_warrior_mace__583x649",
    "name": "Mace"
  },
  {
    "id": "equipment_turtle_warrior_chest_plate_686x555",
    "heroDefinitionId": "hero_tier_1",
    "slotType": "armor",
    "visualId": "equipment_turtle_warrior_chest_plate__686x555",
    "name": "Chest Plate"
  },
  {
    "id": "equipment_fox_sorcerer_staff_462x747",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "weapon",
    "visualId": "equipment_fox_sorcerer_staff__462x747",
    "name": "Staff"
  },
  {
    "id": "equipment_fox_sorcerer_ring_452x543",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "ring",
    "visualId": "equipment_fox_sorcerer_ring__452x543",
    "name": "Ring"
  },
  {
    "id": "equipment_fox_sorcerer_staff_231x374",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "weapon",
    "visualId": "equipment_fox_sorcerer_staff__462x747",
    "name": "Staff"
  },
  {
    "id": "equipment_fox_sorcerer_ring_mask_231x258",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "charm",
    "visualId": "equipment_fox_sorcerer_ring_mask__461x515",
    "name": "Ring Mask"
  },
  {
    "id": "equipment_fox_sorcerer_staff_orb_535x811",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "weapon",
    "visualId": "equipment_fox_sorcerer_staff_orb__535x811",
    "name": "Staff Orb"
  },
  {
    "id": "equipment_fox_sorcerer_ring_mask_461x515",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "charm",
    "visualId": "equipment_fox_sorcerer_ring_mask__461x515",
    "name": "Ring Mask"
  },
  {
    "id": "equipment_fox_sorcerer_staff_orb_268x406",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "weapon",
    "visualId": "equipment_fox_sorcerer_staff_orb__535x811",
    "name": "Staff Orb"
  },
  {
    "id": "equipment_fox_sorcerer_ring_226x272",
    "heroDefinitionId": "hero_tier_2",
    "slotType": "ring",
    "visualId": "equipment_fox_sorcerer_ring__452x543",
    "name": "Ring"
  },
  {
    "id": "equipment_raccoon_engineer_ring_clock_558x491",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "ring",
    "visualId": "equipment_raccoon_engineer_ring_clock__558x491",
    "name": "Ring Clock"
  },
  {
    "id": "equipment_raccoon_engineer_coat_326x283",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "armor",
    "visualId": "equipment_raccoon_engineer_coat__651x566",
    "name": "Coat"
  },
  {
    "id": "equipment_raccoon_engineer_coat_651x566",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "armor",
    "visualId": "equipment_raccoon_engineer_coat__651x566",
    "name": "Coat"
  },
  {
    "id": "equipment_raccoon_engineer_chest_machine_668x500",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "armor",
    "visualId": "equipment_raccoon_engineer_chest_machine__668x500",
    "name": "Chest Machine"
  },
  {
    "id": "equipment_raccoon_engineer_chest_machine_334x250",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "armor",
    "visualId": "equipment_raccoon_engineer_chest_machine__668x500",
    "name": "Chest Machine"
  },
  {
    "id": "equipment_raccoon_engineer_ring_gem_497x460",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "charm",
    "visualId": "equipment_raccoon_engineer_ring_gem__497x460",
    "name": "Ring Gem"
  },
  {
    "id": "equipment_raccoon_engineer_cannon_small_313x283",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "weapon",
    "visualId": "equipment_raccoon_engineer_cannon_small__313x283",
    "name": "Cannon Small"
  },
  {
    "id": "equipment_raccoon_engineer_cannon_small_333x269",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "weapon",
    "visualId": "equipment_raccoon_engineer_cannon_small__333x269",
    "name": "Cannon Small"
  },
  {
    "id": "equipment_raccoon_engineer_cannon_large_666x538",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "weapon",
    "visualId": "equipment_raccoon_engineer_cannon_large__666x538",
    "name": "Cannon Large"
  },
  {
    "id": "equipment_raccoon_engineer_cannon_large_625x565",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "weapon",
    "visualId": "equipment_raccoon_engineer_cannon_large__625x565",
    "name": "Cannon Large"
  },
  {
    "id": "equipment_raccoon_engineer_ring_clock_279x246",
    "heroDefinitionId": "hero_tier_3",
    "slotType": "ring",
    "visualId": "equipment_raccoon_engineer_ring_clock__558x491",
    "name": "Ring Clock"
  },
  {
    "id": "equipment_owl_mage_ring_crescent_413x553",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "ring",
    "visualId": "equipment_owl_mage_ring_crescent__413x553",
    "name": "Ring Crescent"
  },
  {
    "id": "equipment_owl_mage_robe_crescent_611x673",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "armor",
    "visualId": "equipment_owl_mage_robe_crescent__611x673",
    "name": "Robe Crescent"
  },
  {
    "id": "equipment_owl_mage_ring_crescent_207x277",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "ring",
    "visualId": "equipment_owl_mage_ring_crescent__413x553",
    "name": "Ring Crescent"
  },
  {
    "id": "equipment_owl_mage_staff_crescent_197x396",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "weapon",
    "visualId": "equipment_owl_mage_staff_crescent__394x792",
    "name": "Staff Crescent"
  },
  {
    "id": "equipment_owl_mage_staff_owl_478x836",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "weapon",
    "visualId": "equipment_owl_mage_staff_owl__478x836",
    "name": "Staff Owl"
  },
  {
    "id": "equipment_owl_mage_staff_crescent_394x792",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "weapon",
    "visualId": "equipment_owl_mage_staff_crescent__394x792",
    "name": "Staff Crescent"
  },
  {
    "id": "equipment_owl_mage_staff_owl_239x418",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "weapon",
    "visualId": "equipment_owl_mage_staff_owl__478x836",
    "name": "Staff Owl"
  },
  {
    "id": "equipment_owl_mage_robe_crescent_306x337",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "armor",
    "visualId": "equipment_owl_mage_robe_crescent__611x673",
    "name": "Robe Crescent"
  },
  {
    "id": "equipment_owl_mage_ring_orb_499x469",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "charm",
    "visualId": "equipment_owl_mage_ring_orb__499x469",
    "name": "Ring Orb"
  },
  {
    "id": "equipment_owl_mage_robe_orb_533x651",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "armor",
    "visualId": "equipment_owl_mage_robe_orb__533x651",
    "name": "Robe Orb"
  },
  {
    "id": "equipment_owl_mage_robe_orb_267x326",
    "heroDefinitionId": "hero_tier_4",
    "slotType": "armor",
    "visualId": "equipment_owl_mage_robe_orb__533x651",
    "name": "Robe Orb"
  },
  {
    "id": "equipment_panda_monk_pants_269x284",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "feet",
    "visualId": "equipment_panda_monk_pants__537x568",
    "name": "Pants"
  },
  {
    "id": "equipment_panda_monk_staff_312x313",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "weapon",
    "visualId": "equipment_panda_monk_staff__623x626",
    "name": "Staff"
  },
  {
    "id": "equipment_panda_monk_pants_537x568",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "feet",
    "visualId": "equipment_panda_monk_pants__537x568",
    "name": "Pants"
  },
  {
    "id": "equipment_panda_monk_chest_619x555",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "armor",
    "visualId": "equipment_panda_monk_chest__619x555",
    "name": "Chest"
  },
  {
    "id": "equipment_panda_monk_ring_442x374",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "ring",
    "visualId": "equipment_panda_monk_ring__442x374",
    "name": "Ring"
  },
  {
    "id": "equipment_panda_monk_orbs_669x551",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "offhand",
    "visualId": "equipment_panda_monk_orbs__669x551",
    "name": "Orbs"
  },
  {
    "id": "equipment_panda_monk_orbs_335x276",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "offhand",
    "visualId": "equipment_panda_monk_orbs__669x551",
    "name": "Orbs"
  },
  {
    "id": "equipment_panda_monk_chest_310x278",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "armor",
    "visualId": "equipment_panda_monk_chest__619x555",
    "name": "Chest"
  },
  {
    "id": "equipment_panda_monk_staff_623x626",
    "heroDefinitionId": "hero_tier_5",
    "slotType": "weapon",
    "visualId": "equipment_panda_monk_staff__623x626",
    "name": "Staff"
  },
  {
    "id": "equipment_bunny_assassin_pants_261x290",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "feet",
    "visualId": "equipment_bunny_assassin_pants__522x580",
    "name": "Pants"
  },
  {
    "id": "equipment_bunny_assassin_ring_506x452",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "ring",
    "visualId": "equipment_bunny_assassin_ring__506x452",
    "name": "Ring"
  },
  {
    "id": "equipment_bunny_assassin_axes_358x258",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "weapon",
    "visualId": "equipment_bunny_assassin_axes__715x516",
    "name": "Axes"
  },
  {
    "id": "equipment_bunny_assassin_ring_band_455x424",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "charm",
    "visualId": "equipment_bunny_assassin_ring_band__455x424",
    "name": "Ring Band"
  },
  {
    "id": "equipment_bunny_assassin_crescent_axes_350x294",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "offhand",
    "visualId": "equipment_bunny_assassin_crescent_axes__699x588",
    "name": "Crescent Axes"
  },
  {
    "id": "equipment_bunny_assassin_pants_522x580",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "feet",
    "visualId": "equipment_bunny_assassin_pants__522x580",
    "name": "Pants"
  },
  {
    "id": "equipment_bunny_assassin_crescent_axes_699x588",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "offhand",
    "visualId": "equipment_bunny_assassin_crescent_axes__699x588",
    "name": "Crescent Axes"
  },
  {
    "id": "equipment_bunny_assassin_chest_284x328",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "armor",
    "visualId": "equipment_bunny_assassin_chest__567x656",
    "name": "Chest"
  },
  {
    "id": "equipment_bunny_assassin_chest_567x656",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "armor",
    "visualId": "equipment_bunny_assassin_chest__567x656",
    "name": "Chest"
  },
  {
    "id": "equipment_bunny_assassin_axes_715x516",
    "heroDefinitionId": "hero_tier_6",
    "slotType": "weapon",
    "visualId": "equipment_bunny_assassin_axes__715x516",
    "name": "Axes"
  },
  {
    "id": "equipment_lion_knight_chest_305x271",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "armor",
    "visualId": "equipment_lion_knight_chest__610x541",
    "name": "Chest"
  },
  {
    "id": "equipment_lion_knight_hammer_255x348",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "weapon",
    "visualId": "equipment_lion_knight_hammer__509x696",
    "name": "Hammer"
  },
  {
    "id": "equipment_lion_knight_hammer_509x696",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "weapon",
    "visualId": "equipment_lion_knight_hammer__509x696",
    "name": "Hammer"
  },
  {
    "id": "equipment_lion_knight_chest_610x541",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "armor",
    "visualId": "equipment_lion_knight_chest__610x541",
    "name": "Chest"
  },
  {
    "id": "equipment_lion_knight_helmet_246x314",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "armor",
    "visualId": "equipment_lion_knight_helmet__491x628",
    "name": "Helmet"
  },
  {
    "id": "equipment_lion_knight_helmet_491x628",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "armor",
    "visualId": "equipment_lion_knight_helmet__491x628",
    "name": "Helmet"
  },
  {
    "id": "equipment_lion_knight_sword_243x375",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "weapon",
    "visualId": "equipment_lion_knight_sword__486x750",
    "name": "Sword"
  },
  {
    "id": "equipment_lion_knight_sword_486x750",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "weapon",
    "visualId": "equipment_lion_knight_sword__486x750",
    "name": "Sword"
  },
  {
    "id": "equipment_lion_knight_shield_458x423",
    "heroDefinitionId": "hero_tier_7",
    "slotType": "offhand",
    "visualId": "equipment_lion_knight_shield__458x423",
    "name": "Shield"
  },
  {
    "id": "equipment_ice_fairy_boots_289x278",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "feet",
    "visualId": "equipment_ice_fairy_boots__578x556",
    "name": "Boots"
  },
  {
    "id": "equipment_ice_fairy_staff_spear_435x899",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "weapon",
    "visualId": "equipment_ice_fairy_staff_spear__435x899",
    "name": "Staff Spear"
  },
  {
    "id": "equipment_ice_fairy_robe_335x377",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "armor",
    "visualId": "equipment_ice_fairy_robe__670x754",
    "name": "Robe"
  },
  {
    "id": "equipment_ice_fairy_ring_gem_465x536",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "charm",
    "visualId": "equipment_ice_fairy_ring_gem__465x536",
    "name": "Ring Gem"
  },
  {
    "id": "equipment_ice_fairy_boots_578x556",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "feet",
    "visualId": "equipment_ice_fairy_boots__578x556",
    "name": "Boots"
  },
  {
    "id": "equipment_ice_fairy_ring_gem_233x268",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "charm",
    "visualId": "equipment_ice_fairy_ring_gem__465x536",
    "name": "Ring Gem"
  },
  {
    "id": "equipment_ice_fairy_ring_snowflake_484x545",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "charm",
    "visualId": "equipment_ice_fairy_ring_snowflake__484x545",
    "name": "Ring Snowflake"
  },
  {
    "id": "equipment_ice_fairy_staff_snowflake_292x441",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "weapon",
    "visualId": "equipment_ice_fairy_staff_snowflake__583x881",
    "name": "Staff Snowflake"
  },
  {
    "id": "equipment_ice_fairy_robe_670x754",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "armor",
    "visualId": "equipment_ice_fairy_robe__670x754",
    "name": "Robe"
  },
  {
    "id": "equipment_ice_fairy_staff_snowflake_583x881",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "weapon",
    "visualId": "equipment_ice_fairy_staff_snowflake__583x881",
    "name": "Staff Snowflake"
  },
  {
    "id": "equipment_ice_fairy_ring_snowflake_242x273",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "charm",
    "visualId": "equipment_ice_fairy_ring_snowflake__484x545",
    "name": "Ring Snowflake"
  },
  {
    "id": "equipment_ice_fairy_staff_spear_218x450",
    "heroDefinitionId": "hero_tier_8",
    "slotType": "weapon",
    "visualId": "equipment_ice_fairy_staff_spear__435x899",
    "name": "Staff Spear"
  },
  {
    "id": "equipment_inferno_dragon_ring_306x425",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "ring",
    "visualId": "equipment_inferno_dragon_ring__306x425",
    "name": "Ring"
  },
  {
    "id": "equipment_inferno_dragon_sword_279x402",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "weapon",
    "visualId": "equipment_inferno_dragon_sword__557x803",
    "name": "Sword"
  },
  {
    "id": "equipment_inferno_dragon_spear_628x784",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "weapon",
    "visualId": "equipment_inferno_dragon_spear__628x784",
    "name": "Spear"
  },
  {
    "id": "equipment_inferno_dragon_chest_610x596",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "armor",
    "visualId": "equipment_inferno_dragon_chest__610x596",
    "name": "Chest"
  },
  {
    "id": "equipment_inferno_dragon_ring_gem_328x398",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "charm",
    "visualId": "equipment_inferno_dragon_ring_gem__328x398",
    "name": "Ring Gem"
  },
  {
    "id": "equipment_inferno_dragon_robe_521x524",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "armor",
    "visualId": "equipment_inferno_dragon_robe__521x524",
    "name": "Robe"
  },
  {
    "id": "equipment_inferno_dragon_robe_261x262",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "armor",
    "visualId": "equipment_inferno_dragon_robe__521x524",
    "name": "Robe"
  },
  {
    "id": "equipment_inferno_dragon_spear_314x392",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "weapon",
    "visualId": "equipment_inferno_dragon_spear__628x784",
    "name": "Spear"
  },
  {
    "id": "equipment_inferno_dragon_chest_305x298",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "armor",
    "visualId": "equipment_inferno_dragon_chest__610x596",
    "name": "Chest"
  },
  {
    "id": "equipment_inferno_dragon_sword_557x803",
    "heroDefinitionId": "hero_tier_9",
    "slotType": "weapon",
    "visualId": "equipment_inferno_dragon_sword__557x803",
    "name": "Sword"
  },
  {
    "id": "equipment_elf_archer_hood_311x328",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "armor",
    "visualId": "equipment_elf_archer_hood__622x656",
    "name": "Hood"
  },
  {
    "id": "equipment_elf_archer_coat_332x313",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "armor",
    "visualId": "equipment_elf_archer_coat__663x625",
    "name": "Coat"
  },
  {
    "id": "equipment_elf_archer_bow_281x370",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "weapon",
    "visualId": "equipment_elf_archer_bow__561x739",
    "name": "Bow"
  },
  {
    "id": "equipment_elf_archer_ring_536x516",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "ring",
    "visualId": "equipment_elf_archer_ring__536x516",
    "name": "Ring"
  },
  {
    "id": "equipment_elf_archer_hood_fur_342x357",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "armor",
    "visualId": "equipment_elf_archer_hood_fur__684x714",
    "name": "Hood Fur"
  },
  {
    "id": "equipment_elf_archer_ring_leaf_529x544",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "charm",
    "visualId": "equipment_elf_archer_ring_leaf__529x544",
    "name": "Ring Leaf"
  },
  {
    "id": "equipment_elf_archer_coat_663x625",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "armor",
    "visualId": "equipment_elf_archer_coat__663x625",
    "name": "Coat"
  },
  {
    "id": "equipment_elf_archer_boots_249x268",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "feet",
    "visualId": "equipment_elf_archer_boots__497x535",
    "name": "Boots"
  },
  {
    "id": "equipment_elf_archer_boots_497x535",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "feet",
    "visualId": "equipment_elf_archer_boots__497x535",
    "name": "Boots"
  },
  {
    "id": "equipment_elf_archer_hood_fur_684x714",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "armor",
    "visualId": "equipment_elf_archer_hood_fur__684x714",
    "name": "Hood Fur"
  },
  {
    "id": "equipment_elf_archer_bow_561x739",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "weapon",
    "visualId": "equipment_elf_archer_bow__561x739",
    "name": "Bow"
  },
  {
    "id": "equipment_elf_archer_quiver_519x688",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "offhand",
    "visualId": "equipment_elf_archer_quiver__519x688",
    "name": "Quiver"
  },
  {
    "id": "equipment_elf_archer_ring_268x258",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "ring",
    "visualId": "equipment_elf_archer_ring__536x516",
    "name": "Ring"
  },
  {
    "id": "equipment_elf_archer_hood_622x656",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "armor",
    "visualId": "equipment_elf_archer_hood__622x656",
    "name": "Hood"
  },
  {
    "id": "equipment_elf_archer_ring_leaf_265x272",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "charm",
    "visualId": "equipment_elf_archer_ring_leaf__529x544",
    "name": "Ring Leaf"
  },
  {
    "id": "equipment_elf_archer_quiver_260x344",
    "heroDefinitionId": "hero_tier_10",
    "slotType": "offhand",
    "visualId": "equipment_elf_archer_quiver__519x688",
    "name": "Quiver"
  }
];
export const equipmentById = new Map(equipmentDefinitions.map(d => [d.id,d]));
export const maxEquipmentLevel=20, maxHeroLevel=59;
export const enhanceCost=(level:number)=>String(Math.min(1000,25*level*level));
export const upgradeCost=(level:number)=>String(5*(level+1)*(1+Math.floor(level/5)));
export const heroNames=['Turtle Warrior','Fox Sorcerer','Raccoon Engineer','Owl Mage','Panda Monk','Bunny Assassin','Lion Knight','Ice Fairy','Inferno Dragon','Elf Archer'];
export const equipmentRewardCatalog=Object.fromEntries(equipmentDefinitions.map(d=>[d.id,{slotType:d.slotType}]));
