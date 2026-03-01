import { Item, ItemType } from '../types';

export const ITEMS: Item[] = [
  // Spirits
  { id: 'brandy', name: 'Brandy', type: ItemType.SPIRIT, color: '#8B4513', density: 0.94 },
  { id: 'bourbon', name: 'Bourbon Whiskey', type: ItemType.SPIRIT, color: '#CD853F', density: 0.94 },
  { id: 'dry-gin', name: 'Dry Gin', type: ItemType.SPIRIT, color: '#E0FFFF', density: 0.94 },
  { id: 'vodka', name: 'Vodka', type: ItemType.SPIRIT, color: '#F0F8FF', density: 0.95 },
  { id: 'tequila', name: 'Tequila', type: ItemType.SPIRIT, color: '#F5F5DC', density: 0.95 },
  { id: 'light-rum', name: 'Light Rum', type: ItemType.SPIRIT, color: '#FFFFFF', density: 0.95 },
  { id: 'scotch', name: 'Scotch Whisky', type: ItemType.SPIRIT, color: '#DAA520', density: 0.94 },
  { id: 'white-wine', name: 'White Wine', type: ItemType.SPIRIT, color: '#FFFFE0', density: 0.99 },

  // Liqueurs
  { id: 'creme-de-menthe-green', name: 'Creme De Menthe (Green)', type: ItemType.LIQUEUR, color: '#00FF7F', density: 1.12 },
  { id: 'creme-de-menthe-white', name: 'Creme De Menthe (White)', type: ItemType.LIQUEUR, color: '#F8F8FF', density: 1.12 },
  { id: 'sweet-vermouth', name: 'Sweet Vermouth', type: ItemType.LIQUEUR, color: '#800000', density: 1.05 },
  { id: 'dry-vermouth', name: 'Dry Vermouth', type: ItemType.LIQUEUR, color: '#FFFACD', density: 0.98 },
  { id: 'cointreau', name: 'Cointreau', type: ItemType.LIQUEUR, color: '#FFA500', density: 1.05 },
  { id: 'triple-sec', name: 'Triple Sec', type: ItemType.LIQUEUR, color: '#FFD700', density: 1.05 },
  { id: 'kahlua', name: 'Coffee Liqueur', type: ItemType.LIQUEUR, color: '#3E2723', density: 1.15 },
  { id: 'creme-de-cacao-brown', name: 'Creme De Cacao (Brown)', type: ItemType.LIQUEUR, color: '#4E342E', density: 1.14 },
  { id: 'creme-de-cacao-white', name: 'Creme De Cacao (White)', type: ItemType.LIQUEUR, color: '#F8F8FF', density: 1.14 },
  { id: 'benedictine', name: 'Benedictine DOM', type: ItemType.LIQUEUR, color: '#DAA520', density: 1.10 },
  { id: 'creme-de-cassis', name: 'Creme de Cassis', type: ItemType.LIQUEUR, color: '#800080', density: 1.18 },

  // Syrups / Juices
  { id: 'grenadine-syrup', name: 'Grenadine Syrup', type: ItemType.SYRUP, color: '#FF0000', density: 1.25 },
  { id: 'lemon-juice', name: 'Lemon Juice', type: ItemType.JUICE, color: '#FFF700', density: 1.03 },
  { id: 'lime-juice', name: 'Lime Juice', type: ItemType.JUICE, color: '#32CD32', density: 1.03 },
  { id: 'orange-juice', name: 'Orange Juice', type: ItemType.JUICE, color: '#FFA500', density: 1.04 },
  { id: 'pineapple-juice', name: 'Pineapple Juice', type: ItemType.JUICE, color: '#FFD700', density: 1.05 },
  { id: 'cranberry-juice', name: 'Cranberry Juice', type: ItemType.JUICE, color: '#DC143C', density: 1.05 },
  { id: 'sour-mix', name: 'Sweet & Sour Mix', type: ItemType.JUICE, color: '#E6E6FA', density: 1.06 },

  // Others
  { id: 'soda-water', name: 'Soda Water', type: ItemType.OTHER, color: '#E0FFFF', density: 1.00 },
  { id: 'cola', name: 'Cola', type: ItemType.OTHER, color: '#3E2723', density: 1.02 },
  { id: 'angostura-bitters', name: 'Angostura Bitters', type: ItemType.OTHER, color: '#4E342E', density: 1.00 },
  { id: 'powdered-sugar', name: 'Powdered Sugar', type: ItemType.OTHER, color: '#FFFFFF', density: 1.00 },
  { id: 'light-milk', name: 'Light Milk', type: ItemType.OTHER, color: '#FFFFFF', density: 1.03 },
  { id: 'ice', name: 'Ice', type: ItemType.OTHER, color: '#FFFFFF', density: 0.92 },

  // Garnishes
  { id: 'cherry', name: 'Cherry', type: ItemType.GARNISH },
  { id: 'green-olive', name: 'Green Olive', type: ItemType.GARNISH },
  { id: 'lemon-peel', name: 'Lemon Peel', type: ItemType.GARNISH },
  { id: 'lemon-wedge', name: 'Lemon Wedge', type: ItemType.GARNISH },
  { id: 'orange-slice', name: 'Orange Slice', type: ItemType.GARNISH },
  { id: 'salt-rimming', name: 'Salt Rimming', type: ItemType.GARNISH },
];
