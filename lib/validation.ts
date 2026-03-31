// Input validation utilities

export function sanitizeString(input: string, maxLength: number = 500): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Basic XSS prevention
}

export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  return email.trim().toLowerCase().slice(0, 254);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validateQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 100000;
}

export function validateProductType(productType: string): boolean {
  const validTypes = ['t-shirt', 'hoodie', 'sweatshirt', 'jacket', 'tote-bag', 'cap'];
  return validTypes.includes(productType.toLowerCase());
}

export function validateUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export function validatePhoneNumber(phone: string): boolean {
  // International phone number validation (E.164 format)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  allowedFields: string[]
): Partial<T> {
  const sanitized: Partial<T> = {};
  for (const key of allowedFields) {
    if (key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        (sanitized as any)[key] = sanitizeString(value);
      } else if (typeof value === 'number') {
        (sanitized as any)[key] = value;
      } else if (typeof value === 'boolean') {
        (sanitized as any)[key] = value;
      } else if (Array.isArray(value)) {
        (sanitized as any)[key] = value.map(item => 
          typeof item === 'string' ? sanitizeString(item) : item
        );
      }
    }
  }
  return sanitized;
}

// Request body size limit (10MB)
export const MAX_BODY_SIZE = 10 * 1024 * 1024;

export function checkBodySize(request: Request): boolean {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return false;
  }
  return true;
}
