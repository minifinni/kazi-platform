/**
 * Kazi Manufacturing - Instant Pricing Engine
 * Calculates quotes instantly for custom apparel orders
 */

// ============================================
// TYPES
// ============================================

/** Product types available for pricing */
export type ProductType = 'tshirt' | 'hoodie';

/** Print method options */
export type PrintMethod = 'screen-print' | 'dtg' | 'embroidery-small' | 'embroidery-large' | 'dtf';

/** Placement options with their multipliers */
export type Placement = 'front-chest' | 'front-large' | 'back' | 'sleeve' | 'neck-label';

/** Size breakdown for quantity distribution */
export type SizeDistribution = {
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
  xxl?: number;
  xxxl?: number;
  [key: string]: number | undefined;
};

/** Detailed line item for pricing breakdown */
export type PricingLineItem = {
  description: string;
  unitCost: number;
  quantity: number;
  totalCost: number;
};

/** Complete pricing breakdown */
export type PricingBreakdown = {
  basePrice: PricingLineItem;
  printMethod: PricingLineItem;
  placementMultiplier: {
    description: string;
    multiplier: number;
    adjustedCost: number;
  };
  colorUpcharge?: PricingLineItem;
  additionalPlacements?: PricingLineItem[];
  subtotal: number;
  finalUnitPrice: number;
};

/** Input parameters for calculating unit price */
export type CalculateUnitPriceInput = {
  product: ProductType;
  quantity: number;
  printMethod: PrintMethod;
  placements: Placement[];
  colorCount: number;
};

// ============================================
// CONSTANTS
// ============================================

/** Base prices for T-shirts by quantity tier */
const TSHIRT_PRICES: { minQty: number; price: number }[] = [
  { minQty: 1000, price: 3.20 },
  { minQty: 500, price: 4.00 },
  { minQty: 250, price: 5.00 },
  { minQty: 100, price: 6.50 },
  { minQty: 50, price: 8.50 },
];

/** Base prices for Hoodies by quantity tier */
const HOODIE_PRICES: { minQty: number; price: number }[] = [
  { minQty: 1000, price: 8.50 },
  { minQty: 500, price: 10.00 },
  { minQty: 250, price: 12.00 },
  { minQty: 100, price: 14.50 },
  { minQty: 50, price: 18.00 },
];

/** Print method add-on costs */
const PRINT_METHOD_COSTS: Record<PrintMethod, number | ((colorCount: number) => number)> = {
  'screen-print': (colorCount: number) => 1.50 * colorCount,
  'dtg': 3.50,
  'embroidery-small': 2.50,
  'embroidery-large': 4.00,
  'dtf': 4.00,
};

/** Placement multipliers */
const PLACEMENT_MULTIPLIERS: Record<Placement, number> = {
  'front-chest': 1.0,
  'front-large': 1.2,
  'back': 1.0,
  'sleeve': 0.8,
  'neck-label': 0.5,
};

/** Minimum quantity for instant pricing */
const MIN_INSTANT_QUANTITY = 50;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the base price for a product based on quantity
 */
function getBasePrice(product: ProductType, quantity: number): number {
  const priceTiers = product === 'tshirt' ? TSHIRT_PRICES : HOODIE_PRICES;
  
  for (const tier of priceTiers) {
    if (quantity >= tier.minQty) {
      return tier.price;
    }
  }
  
  // If quantity is below minimum tier, return the highest price
  return priceTiers[priceTiers.length - 1].price;
}

/**
 * Get print method add-on cost
 */
function getPrintMethodCost(printMethod: PrintMethod, colorCount: number): number {
  const cost = PRINT_METHOD_COSTS[printMethod];
  
  if (typeof cost === 'function') {
    return cost(colorCount);
  }
  
  return cost;
}

/**
 * Get color upcharge per unit
 */
function getColorUpcharge(colorCount: number): number {
  if (colorCount <= 2) {
    return 0;
  } else if (colorCount <= 4) {
    return 0.50;
  } else {
    return 1.00;
  }
}

/**
 * Get the highest placement multiplier from a list
 * (Primary placement determines base multiplier)
 */
function getPrimaryPlacementMultiplier(placements: Placement[]): number {
  if (placements.length === 0) {
    return 1.0;
  }
  
  // Use the first placement as primary, or the one with highest multiplier
  return Math.max(...placements.map(p => PLACEMENT_MULTIPLIERS[p]));
}

/**
 * Calculate additional placement costs
 */
function getAdditionalPlacementCosts(placements: Placement[]): { cost: number; items: PricingLineItem[] } {
  if (placements.length <= 1) {
    return { cost: 0, items: [] };
  }
  
  const items: PricingLineItem[] = [];
  let totalCost = 0;
  
  // Skip the first placement (primary), charge for additional ones
  for (let i = 1; i < placements.length; i++) {
    const placement = placements[i];
    const multiplier = PLACEMENT_MULTIPLIERS[placement];
    // Additional placements charged at 50% of their multiplier value as flat fee
    const cost = multiplier * 0.50;
    
    items.push({
      description: `Additional placement: ${placement.replace('-', ' ')}`,
      unitCost: cost,
      quantity: 1,
      totalCost: cost,
    });
    
    totalCost += cost;
  }
  
  return { cost: totalCost, items };
}

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Calculate the unit price for a product configuration
 * 
 * @param product - Type of product ('tshirt' or 'hoodie')
 * @param quantity - Number of units
 * @param printMethod - Printing method to use
 * @param placements - Array of print placements
 * @param colorCount - Number of colors in the design
 * @returns The calculated unit price in GBP
 */
export function calculateUnitPrice(
  product: ProductType,
  quantity: number,
  printMethod: PrintMethod,
  placements: Placement[],
  colorCount: number
): number {
  // Validate inputs
  if (quantity < 1) {
    throw new Error('Quantity must be at least 1');
  }
  
  if (colorCount < 1) {
    throw new Error('Color count must be at least 1');
  }
  
  if (placements.length === 0) {
    throw new Error('At least one placement is required');
  }
  
  // Get base price
  const basePrice = getBasePrice(product, quantity);
  
  // Get print method cost
  const printMethodCost = getPrintMethodCost(printMethod, colorCount);
  
  // Get color upcharge
  const colorUpcharge = getColorUpcharge(colorCount);
  
  // Calculate subtotal before placement multiplier
  const subtotal = basePrice + printMethodCost + colorUpcharge;
  
  // Apply primary placement multiplier
  const placementMultiplier = getPrimaryPlacementMultiplier(placements);
  let unitPrice = subtotal * placementMultiplier;
  
  // Add additional placement costs
  const additionalPlacements = getAdditionalPlacementCosts(placements);
  unitPrice += additionalPlacements.cost;
  
  // Round to 2 decimal places
  return Math.round(unitPrice * 100) / 100;
}

/**
 * Calculate total price for an order
 * 
 * @param unitPrice - Calculated unit price
 * @param quantity - Total number of units
 * @param sizes - Optional size distribution (for validation/future use)
 * @returns Total order price in GBP
 */
export function calculateTotalPrice(
  unitPrice: number,
  quantity: number,
  sizes?: SizeDistribution
): number {
  // Validate size distribution if provided
  if (sizes) {
    const totalFromSizes = Object.values(sizes).reduce((sum: number, count) => sum + (count || 0), 0);
    if (totalFromSizes !== quantity) {
      throw new Error(
        `Size distribution total (${totalFromSizes}) does not match quantity (${quantity})`
      );
    }
  }
  
  const total = unitPrice * quantity;
  return Math.round(total * 100) / 100;
}

/**
 * Get detailed pricing breakdown for a quote
 * 
 * @param product - Type of product
 * @param quantity - Number of units
 * @param printMethod - Printing method
 * @param placements - Array of print placements
 * @param colorCount - Number of colors
 * @returns Detailed pricing breakdown with line items
 */
export function getPricingBreakdown(
  product: ProductType,
  quantity: number,
  printMethod: PrintMethod,
  placements: Placement[],
  colorCount: number
): PricingBreakdown {
  // Validate inputs
  if (quantity < 1) {
    throw new Error('Quantity must be at least 1');
  }
  
  if (colorCount < 1) {
    throw new Error('Color count must be at least 1');
  }
  
  if (placements.length === 0) {
    throw new Error('At least one placement is required');
  }
  
  // Get base price
  const basePrice = getBasePrice(product, quantity);
  
  // Get print method cost
  const printMethodCost = getPrintMethodCost(printMethod, colorCount);
  
  // Get color upcharge
  const colorUpcharge = getColorUpcharge(colorCount);
  
  // Calculate subtotal before placement
  const subtotalBeforePlacement = basePrice + printMethodCost + colorUpcharge;
  
  // Get primary placement
  const primaryPlacement = placements[0];
  const placementMultiplier = PLACEMENT_MULTIPLIERS[primaryPlacement];
  
  // Calculate additional placements
  const additionalPlacements = getAdditionalPlacementCosts(placements);
  
  // Calculate final unit price
  const unitPriceAfterPlacement = subtotalBeforePlacement * placementMultiplier;
  const finalUnitPrice = unitPriceAfterPlacement + additionalPlacements.cost;
  
  // Build breakdown
  const breakdown: PricingBreakdown = {
    basePrice: {
      description: `Base price (${product}, qty ${quantity}+)`,
      unitCost: basePrice,
      quantity: 1,
      totalCost: basePrice,
    },
    printMethod: {
      description: `Print method: ${printMethod.replace('-', ' ')}`,
      unitCost: printMethodCost,
      quantity: 1,
      totalCost: printMethodCost,
    },
    placementMultiplier: {
      description: `Primary placement: ${primaryPlacement.replace('-', ' ')}`,
      multiplier: placementMultiplier,
      adjustedCost: subtotalBeforePlacement * placementMultiplier,
    },
    subtotal: subtotalBeforePlacement,
    finalUnitPrice: Math.round(finalUnitPrice * 100) / 100,
  };
  
  // Add color upcharge if applicable
  if (colorUpcharge > 0) {
    breakdown.colorUpcharge = {
      description: `Color upcharge (${colorCount} colors)`,
      unitCost: colorUpcharge,
      quantity: 1,
      totalCost: colorUpcharge,
    };
  }
  
  // Add additional placements if applicable
  if (additionalPlacements.items.length > 0) {
    breakdown.additionalPlacements = additionalPlacements.items;
  }
  
  return breakdown;
}

/**
 * Check if instant pricing is available for a product/print method combination
 * 
 * @param product - Type of product
 * @param printMethod - Printing method
 * @returns true if pricing can be calculated instantly, false for complex custom orders
 */
export function isInstantPriceAvailable(
  product: ProductType,
  printMethod: PrintMethod
): boolean {
  // All standard products support instant pricing
  if (product !== 'tshirt' && product !== 'hoodie') {
    return false;
  }
  
  // All standard print methods support instant pricing
  const supportedMethods: PrintMethod[] = [
    'screen-print',
    'dtg',
    'embroidery-small',
    'embroidery-large',
    'dtf',
  ];
  
  return supportedMethods.includes(printMethod);
}

// All types are exported at their declaration sites above
