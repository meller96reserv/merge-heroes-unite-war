/** Measured from Figma 2:426 / text inventory. No economy values belong here. */
export const measured = {
  width:430,height:932,white:'#ffffff',outline:'#000000',tier:'#00b43c',boardTint:'rgba(47,56,155,0.55)',
  font:{counter:32,stage:20,badge:10},columns:5,columnX:15,columnStride:83,slotWidth:68,
} as const;
/** Product interaction proposals, not observed timing. */
export const proposed = {
  touchMinimum:44,disabledOpacity:0.55,spacing:{xs:4,s:8,m:16,l:24},
  motion:{pressIn:80,pressOut:120,fast:140,normal:280,merge:650,reward:560},
} as const;
