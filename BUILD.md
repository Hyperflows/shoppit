# Shoppit BUILD.md

## Product rule
Shoppit is a verified visual shopping discovery/referral platform. No native checkout in MVP.

## Architecture
- Consumer: React Native + Expo
- Merchant/Admin: Next.js
- Backend/Auth/DB: Supabase/Postgres
- Video: Mux
- Commerce integration: Shopify-first
- Merchant collection: Stripe ACH/card

## Build phases

### Phase 0 - Foundation
- [ ] Monorepo created
- [ ] Expo app runs on iOS/Android simulator/device
- [ ] Next.js dashboard runs
- [ ] Supabase local/remote project connected
- [ ] Environment variable strategy documented
- [ ] CI runs typecheck/lint/tests

### Phase 1 - Auth and roles
- [ ] Shopper can browse without account
- [ ] Shopper can sign up/login
- [ ] Merchant application account can sign up
- [ ] Roles enforced server-side
- [ ] Interest onboarding supports Skip

### Phase 2 - Feed
- [ ] One video fills viewport
- [ ] Only active video plays
- [ ] Swipe advances cleanly
- [ ] Brand/logo/Verified/product/old-new price/Shop Now/like/save/share render
- [ ] Watch events recorded
- [ ] Fallback UI for processing/failed video

### Phase 3 - Merchant application/admin
- [ ] Application captures required quality data
- [ ] Admin can score/review/approve/reject
- [ ] Verified status can be granted/revoked
- [ ] Audit log records decisions

### Phase 4 - Merchant content
- [ ] Approved merchant can create products
- [ ] Upload video and attach product
- [ ] 30 active-video cap enforced
- [ ] 5-60 second validation enforced
- [ ] Content enters review before live

### Phase 5 - Search
- [ ] Keyword and natural-language query input
- [ ] Intent parsed into structured fields
- [ ] Search results appear as feed
- [ ] Search session logged
- [ ] Empty-state supports broader query

### Phase 6 - Recommendation
- [ ] Configurable scoring service
- [ ] Engagement events affect ranking
- [ ] Discovery/diversity prevents total filter bubble
- [ ] No paid ranking in MVP

### Phase 7 - Outbound tracking
- [ ] Shop Now creates click_id before redirect
- [ ] Click tied to user/session/video/product/search
- [ ] Merchant redirect resilient to retries
- [ ] Basic attribution dashboard exists

### Phase 8 - Shopify attribution
- [ ] Merchant Shopify connection
- [ ] Order webhook/API handling
- [ ] Order attribution reference captured where supported
- [ ] Idempotent order processing
- [ ] Refund/cancel updates commission

### Phase 9 - Billing
- [ ] Merchant refund window stored
- [ ] Commission pending until eligible
- [ ] Partial refunds prorate commission
- [ ] Stripe customer/payment method setup
- [ ] Approved balance collected with audit trail

### Phase 10 - Analytics/QA
- [ ] Merchant dashboard metrics correct
- [ ] Admin platform metrics correct
- [ ] Crash/error tracking connected
- [ ] Privacy/security review
- [ ] App Store/Play Store release checklist complete

## Attribution
30-day Shoppit attribution window. Server-side click_id. Orders and refunds processed idempotently. Merchant-specific refund window gates commission approval.

## Launch constraints
150 founding merchants, first 90 days 0% commission, then minimum 7%, max 30 active videos per merchant, 5-60 second videos.
