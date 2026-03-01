/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Technique {
  FLOAT = 'Float',
  STIR = 'Stir',
  BUILD = 'Build',
  SHAKE = 'Shake',
  BLEND = 'Blend',
}

export enum GlassType {
  STEMMED_LIQUEUR = 'Stemmed Liqueur Glass',
  COCKTAIL = 'Cocktail Glass',
  OLD_FASHIONED = 'Old-fashioned Glass',
  FOOTED_PILSNER = 'Footed Pilsner Glass',
  SOUR = 'Sour Glass',
  SHERRY = 'Sherry Glass',
  COLLINS = 'Collins Glass',
  HIGHBALL = 'Highball Glass',
  CHAMPAGNE_SAUCER = 'Champagne Glass (Saucer)',
  CHAMPAGNE_FLUTE = 'Flute Champagne Glass',
  WHITE_WINE = 'White Wine Glass',
}

export enum ItemType {
  SPIRIT = 'Spirit',
  LIQUEUR = 'Liqueur',
  JUICE = 'Juice',
  SYRUP = 'Syrup',
  GARNISH = 'Garnish',
  TOOL = 'Tool',
  GLASS = 'Glass',
  OTHER = 'Other',
}

export interface Ingredient {
  itemId: string;
  amount: number; // in oz, or 0 for dash/tsp
  unit: 'oz' | 'dash' | 'tsp' | 'part';
}

export interface Recipe {
  id: string;
  name: string;
  technique: Technique;
  glass: GlassType;
  garnish?: string;
  ingredients: Ingredient[];
  chillingRequired?: boolean;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  color?: string;
  density?: number; // For floating logic (higher = heavier)
}

export type GameMode = 'PRACTICE' | 'REAL';
export type Scene = 'TITLE' | 'GAME';

export interface TaskState {
  recipe: Recipe;
  isCompleted: boolean;
  score: number | null;
  selectedGlass: GlassType | null;
  isChilled: boolean;
  mixedIngredients: Ingredient[];
  currentTechnique: Technique | null;
  selectedGarnish: string | null;
}
