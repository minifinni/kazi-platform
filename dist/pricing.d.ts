/**
 * Kazi Manufacturing - Instant Pricing Engine
 * Calculates quotes instantly for custom apparel orders
 */
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
export declare function calculateUnitPrice(product: ProductType, quantity: number, printMethod: PrintMethod, placements: Placement[], colorCount: number): number;
/**
 * Calculate total price for an order
 *
 * @param unitPrice - Calculated unit price
 * @param quantity - Total number of units
 * @param sizes - Optional size distribution (for validation/future use)
 * @returns Total order price in GBP
 */
export declare function calculateTotalPrice(unitPrice: number, quantity: number, sizes?: SizeDistribution): number;
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
export declare function getPricingBreakdown(product: ProductType, quantity: number, printMethod: PrintMethod, placements: Placement[], colorCount: number): PricingBreakdown;
/**
 * Check if instant pricing is available for a product/print method combination
 *
 * @param product - Type of product
 * @param printMethod - Printing method
 * @returns true if pricing can be calculated instantly, false for complex custom orders
 */
export declare function isInstantPriceAvailable(product: ProductType, printMethod: PrintMethod): boolean;
