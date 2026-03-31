import { createClient } from '@/lib/supabase/server';

export interface AuditLogEntry {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAudit(entry: AuditLogEntry) {
  try {
    const supabase = await createClient();
    
    await supabase.from('audit_logs').insert({
      user_id: entry.userId,
      action: entry.action,
      resource: entry.resource,
      resource_id: entry.resourceId,
      details: entry.details,
      ip_address: entry.ipAddress,
      user_agent: entry.userAgent,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    // Log to console as fallback (don't expose to user)
    console.error('Audit log failed:', error);
  }
}

// Common audit actions
export const AuditActions = {
  // Auth
  LOGIN: 'login',
  LOGOUT: 'logout',
  PASSWORD_RESET: 'password_reset',
  
  // Orders
  ORDER_CREATED: 'order_created',
  ORDER_UPDATED: 'order_updated',
  ORDER_STATUS_CHANGED: 'order_status_changed',
  ORDER_DELETED: 'order_deleted',
  
  // Quotes
  QUOTE_CREATED: 'quote_created',
  QUOTE_UPDATED: 'quote_updated',
  
  // API Keys
  API_KEY_CREATED: 'api_key_created',
  API_KEY_REVOKED: 'api_key_revoked',
  
  // Admin
  USER_CREATED: 'user_created',
  USER_UPDATED: 'user_updated',
  PRICING_UPDATED: 'pricing_updated',
  
  // Security
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  UNAUTHORIZED_ACCESS: 'unauthorized_access',
} as const;
