import { Recipe, Technique, GlassType } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'pousse-cafe',
    name: 'Pousse Cafe',
    technique: Technique.FLOAT,
    glass: GlassType.STEMMED_LIQUEUR,
    ingredients: [
      { itemId: 'grenadine-syrup', amount: 1/3, unit: 'part' },
      { itemId: 'creme-de-menthe-green', amount: 1/3, unit: 'part' },
      { itemId: 'brandy', amount: 1/3, unit: 'part' },
    ],
    chillingRequired: false,
  },
  {
    id: 'manhattan',
    name: 'Manhattan',
    technique: Technique.STIR,
    glass: GlassType.COCKTAIL,
    garnish: 'Cherry',
    ingredients: [
      { itemId: 'bourbon', amount: 1.5, unit: 'oz' },
      { itemId: 'sweet-vermouth', amount: 0.75, unit: 'oz' },
      { itemId: 'angostura-bitters', amount: 1, unit: 'dash' },
    ],
    chillingRequired: true,
  },
  {
    id: 'dry-martini',
    name: 'Dry Martini',
    technique: Technique.STIR,
    glass: GlassType.COCKTAIL,
    garnish: 'Green Olive',
    ingredients: [
      { itemId: 'dry-gin', amount: 2, unit: 'oz' },
      { itemId: 'dry-vermouth', amount: 1/3, unit: 'oz' },
    ],
    chillingRequired: true,
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    technique: Technique.BUILD,
    glass: GlassType.OLD_FASHIONED,
    garnish: 'Orange Slice & Cherry',
    ingredients: [
      { itemId: 'bourbon', amount: 1.5, unit: 'oz' },
      { itemId: 'powdered-sugar', amount: 1, unit: 'tsp' },
      { itemId: 'angostura-bitters', amount: 1, unit: 'dash' },
      { itemId: 'soda-water', amount: 0.5, unit: 'oz' },
    ],
    chillingRequired: false,
  },
  {
    id: 'margarita',
    name: 'Margarita',
    technique: Technique.SHAKE,
    glass: GlassType.COCKTAIL,
    garnish: 'Salt Rimming',
    ingredients: [
      { itemId: 'tequila', amount: 1.5, unit: 'oz' },
      { itemId: 'triple-sec', amount: 0.5, unit: 'oz' },
      { itemId: 'lime-juice', amount: 0.5, unit: 'oz' },
    ],
    chillingRequired: true,
  },
  {
    id: 'long-island-iced-tea',
    name: 'Long Island Iced Tea',
    technique: Technique.BUILD,
    glass: GlassType.COLLINS,
    garnish: 'Lemon Wedge',
    ingredients: [
      { itemId: 'dry-gin', amount: 0.5, unit: 'oz' },
      { itemId: 'vodka', amount: 0.5, unit: 'oz' },
      { itemId: 'light-rum', amount: 0.5, unit: 'oz' },
      { itemId: 'tequila', amount: 0.5, unit: 'oz' },
      { itemId: 'triple-sec', amount: 0.5, unit: 'oz' },
      { itemId: 'sour-mix', amount: 1.5, unit: 'oz' },
      { itemId: 'cola', amount: 1, unit: 'part' }, // Fill with cola
    ],
    chillingRequired: false,
  },
  {
    id: 'healing',
    name: 'Healing',
    technique: Technique.SHAKE,
    glass: GlassType.COCKTAIL,
    garnish: 'Lemon Peel',
    ingredients: [
      { itemId: 'benedictine', amount: 1/3, unit: 'oz' },
      { itemId: 'sour-mix', amount: 1, unit: 'oz' },
      // Note: Gamhongro is missing from items, using Brandy as placeholder or I should add it
      { itemId: 'brandy', amount: 1.5, unit: 'oz' }, 
    ],
    chillingRequired: true,
  },
];
