# Kazi Manufacturing MVP

A Next.js 14 web application for Kazi Manufacturing, a garment factory in Kathmandu, Nepal.

## Features

### Public Pages
- **Homepage** - Hero section, value props, services overview, contact form
- **Services** - Detailed service descriptions (T-shirts, Hoodies, Embroidery, Printing, Private Label)
- **Pricing** - Volume pricing tables and interactive price calculator
- **Quote Request** - Form to submit quote requests (saves to Supabase)

### Customer Portal (Auth Required)
- **Dashboard** - View orders, quotes, and stats
- **Order Detail** - Track production progress, view updates, message thread
- **Order Timeline** - Visual progress tracker (Ordered → Cutting → Sewing → Printing → QC → Shipping → Delivered)

### Employee/Factory Portal (Auth Required)
- **Factory Dashboard** - Kanban-style production queue
- **Order Management** - Mobile-friendly status updates with big buttons
- **Update History** - Track all production updates

### Admin Portal (Auth Required)
- **Overview** - Stats, revenue, pending quotes
- **Order Management** - View all orders with filters
- **Pricing Management** - Edit pricing tiers
- **User Management** - View users, change roles

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase Auth & PostgreSQL

## Database Schema

### Tables
- `profiles` - Users with roles (customer/employee/admin)
- `quotes` - Quote requests from customers
- `orders` - Production orders
- `order_updates` - Status change history with notes
- `messages` - Order message threads
- `pricing_tiers` - Volume pricing data

### RLS Policies
- Customers see only their own data
- Employees see all orders
- Admins see everything

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration: `supabase/migrations/001_initial_schema.sql`
   - Seed pricing data: `supabase/seed.sql`
   - Enable Email auth in Authentication settings

3. **Environment Variables**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Pricing Structure

### T-Shirts
- 50-99: £8.50/unit
- 100-249: £6.50/unit
- 250-499: £5.00/unit
- 500-999: £4.00/unit
- 1000+: £3.20/unit

### Hoodies
- 50-99: £18.00/unit
- 100-249: £14.50/unit
- 250-499: £12.00/unit
- 500-999: £10.00/unit
- 1000+: £8.50/unit

### Add-ons
- Embroidery (small): +£2.50/unit
- Embroidery (large): +£4.00/unit
- Screen print (per colour): +£1.50/unit
- DTG print: +£3.50/unit

## User Roles

1. **Customer** - Can view own orders/quotes, request new quotes
2. **Employee** - Can view/update all orders, factory dashboard access
3. **Admin** - Full access to all features including pricing and user management

## File Structure

```
app/
  page.tsx                    # Public homepage
  services/page.tsx           # Services page
  pricing/page.tsx            # Pricing page + calculator
  quote/page.tsx              # Quote request form
  auth/
    login/page.tsx            # Login
    register/page.tsx         # Registration
    forgot-password/page.tsx  # Password reset
  dashboard/                  # Customer portal
    page.tsx
    orders/[id]/page.tsx
  factory/                    # Employee portal
    page.tsx
    orders/[id]/page.tsx
  admin/                      # Admin portal
    page.tsx
    orders/page.tsx
    pricing/page.tsx
    users/page.tsx
components/
  Navbar.tsx
  PricingCalculator.tsx
  OrderStatusBadge.tsx
  OrderTimeline.tsx
lib/
  supabase/
    client.ts                 # Browser client
    server.ts                 # Server client
    middleware.ts             # Auth middleware
supabase/
  migrations/001_initial_schema.sql
  seed.sql
middleware.ts                 # Route protection
```

## Notes

- MVP constraints: No payment processing, file uploads, or email notifications yet
- Factory mobile interface uses large touch targets for phone use
- Role-based access controlled via middleware and RLS policies
