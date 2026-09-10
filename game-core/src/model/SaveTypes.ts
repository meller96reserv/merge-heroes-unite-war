// Generated from data-spec/save.schema.json; runtime validation is separate.
export type SaveState = {
"schemaVersion": 1;
"dataVersion": string;
"revision": number;
"generation": number;
"createdAt": number;
"updatedAt": number;
"lastActiveAt": number;
"data": {
"player": {
"accountLevel": number;
"xp": string;
"tutorialVersion": number;
"completedTutorialSteps": Array<string>;
};
"currencies": {
[key:string]: string;
};
"heroes": Array<{
"id": string;
"definitionId": string;
"slotId": number;
"tier": number;
"upgradeLevel": number;
"deployed": boolean;
"equippedItemIds": Array<string>;
}>;
"board": Array<{
"slotId": number;
"unlocked": boolean;
"unitId": (string | null);
}>;
"progression": {
"discoveredTiers": Array<number>;
"highestClearedOrdinal": number;
"purchaseCounts": {
[key:string]: number;
};
};
"stages": {
"currentStageId": string;
"encounterSequence": number;
"bossRetryAvailable": boolean;
"farmStageId": (string | null);
"waveOrdinal"?: number;
};
"unlocks": {
"unlockedIds": Array<string>;
"announcedIds": Array<string>;
};
"equipment": Array<{
"id": string;
"definitionId": string;
"level": number;
"ownerHeroId": (string | null);
"slotType": string;
}>;
"quests": {
[key:string]: {
"count": number;
"period": string;
"claimed": boolean;
};
};
"daily": {
"lastClaimedPeriod": (number | null);
"attendanceIndex": number;
"pendingPeriod"?: (number | null);
};
"wheel": {
"nextFreeAt": number;
"freeSpins": number;
"pendingSpin": ({
"id": string;
"outcomeId": string;
"rewardId": (string | null);
"status": "reserved" | "committed";
} | null);
};
"offline": {
"lastProcessedAt": number;
"pendingClaim": ({
"id": string;
"source": string;
"fromAt": number;
"toAt": number;
"grants": Array<{
"kind": "currency" | "item" | "freeSpin";
"id": string;
"amount": string;
}>;
"status": "pending" | "committed";
} | null);
};
"settings": {
"musicGain": number;
"sfxGain": number;
"haptics": boolean;
"reducedMotion": boolean;
"notifications": boolean;
"revision"?: number;
"analyticsConsent"?: boolean;
"battleSpeed"?: 1 | 2;
};
"analyticsConsent": "unknown" | "denied" | "granted";
"transactionReceipts": Array<{
"id": string;
"source": string;
"generation": number;
"grants": Array<{
"kind": "currency" | "item" | "freeSpin";
"id": string;
"amount": string;
}>;
}>;
"sourceWatermarks": {
[key:string]: number;
};
"nextInstanceSequence": number;
"rng": {
"algorithm": "xoshiro128ss-proposed-v1";
"combatState": Array<number>;
"rewardState": Array<number>;
};
"autoMerge": {
"enabled": boolean;
"entitlementId": (string | null);
"expiresAtUtcMs": (number | null);
"lastObservedWallUtcMs": number;
};
"rewardedOperations"?: {
[key:string]: {
"id": string;
"placement": "wheel" | "freeCoins" | "stageBoost";
"outcomeId": string;
"sessionId": string;
"createdAt": number;
"expiresAt": number;
"status": "reserved" | "confirmed" | "consumed" | "cancelled";
};
};
"stageBoosts"?: {
[key:string]: {
"id": string;
"encounterId": string;
"stageId": string;
"baseGold": string;
"createdAt": number;
"offerEndsAt": number;
"status": "available" | "reserved" | "claimed";
"multiplier": (number | null);
};
};
"heroLevels"?: {
[key:string]: number;
};
"relics"?: {
[key:string]: number;
};
"lastRelicOpen"?: {
"id": string;
"relicIds": Array<string>;
};
"dungeon"?: {
"sequence": number;
"active": ({
"id": string;
"dragonId": "infernal" | "frost" | "shadow";
"sequence": number;
} | null);
"lastResult": ({
"id": string;
"dragonId": "infernal" | "frost" | "shadow";
"outcome": "won" | "failed" | "abandoned";
} | null);
"clears": {
[key:string]: number;
};
};
};
};
