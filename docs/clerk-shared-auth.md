# Clerk Shared Auth Setup

This document defines the shared authentication setup for:

- `auth.troop771.com`
- `mulch.troop771.com`
- `programmingmb.troop771.com`

The main Payload website at `troop771.com` keeps its existing Payload auth for now and can be migrated later.

## Goal

Use one shared authentication system so a user can sign in once and access both Mulch Companion and Programming Merit Badge with the same identity.

## Chosen Architecture

- Identity provider: `Clerk`
- Primary auth domain: `auth.troop771.com`
- Application domains:
  - `mulch.troop771.com`
  - `programmingmb.troop771.com`
- Frameworks:
  - `771-mulch-companion`: Next.js + Payload
  - `ProgrammingMB`: Next.js

## Why This Design

- It avoids standing up and maintaining a VPS for auth.
- Clerk has a free Hobby plan that includes a custom domain.
- Both applications are already Next.js apps, which Clerk supports directly.
- The Payload site can remain separate until we are ready to migrate it.

## Important Clerk Model

Clerk does **not** work by sharing one raw cookie across all subdomains.

Instead:

- Clerk stores authentication state on each app domain separately
- Clerk syncs authentication across subdomains when configured with the same root domain
- Users complete sign-in and sign-up flows on the primary domain and are redirected back to the app they came from

This is the model we should design around.

## Free-Tier Strategy

We are intentionally avoiding Clerk's paid production multi-domain / satellite-domain setup.

Instead, we are using:

- one Clerk application
- one shared root domain: `troop771.com`
- multiple subdomains under that same root:
  - `auth.troop771.com`
  - `mulch.troop771.com`
  - `programmingmb.troop771.com`

This matters because Clerk documents that:

- authentication across **subdomains** works by default when the root domain is configured
- paid satellite-domain setup is for authentication across **different domains**

## Domain Plan

- `auth.troop771.com` -> small Next.js auth portal using Clerk
- `mulch.troop771.com` -> Mulch Companion app using the same Clerk application
- `programmingmb.troop771.com` -> Programming Merit Badge app using the same Clerk application

## What `auth.troop771.com` Actually Is

`auth.troop771.com` is **not** a standalone auth server.

It is a small Next.js app that:

- uses the Clerk Next.js SDK
- hosts the sign-in page
- hosts the sign-up page
- hosts account/profile pages if we want them
- acts as the primary authentication domain for the other two apps

This means we can deploy it cheaply or for free on a normal Next.js host such as Vercel.

## Shared Identity Model

Store these in Clerk:

- email
- name
- passwordless or password-based auth methods
- MFA
- email verification
- account recovery
- session management

Keep these in each app's own database:

- mulch delivery preferences
- merit badge progress
- app-specific permissions or records
- audit trails

## Roles And Authorization

Because this is a troop setup, we should keep shared identity data simple and keep app-specific authorization local where possible.

Recommended shared role / metadata values:

- `troop-admin`
- `scout`
- `parent`
- `merit-badge-counselor`
- `mulch-coordinator`

Recommended storage strategy:

- store global role or group membership in Clerk public metadata or organization membership
- sync needed values into app-local user records at login

For the first phase, a lightweight metadata-based model is simpler than building a full B2B organization model.

## Root Domain Setup

Configure Clerk production to use the `troop771.com` root domain and the primary domain `auth.troop771.com`.

Then:

- Clerk authentication can work across the `troop771.com` subdomains
- `mulch` and `programmingmb` can use the same Clerk instance

## Security Settings

Enable these once production is connected:

- production custom domain
- allowed subdomains for:
  - `auth.troop771.com`
  - `mulch.troop771.com`
  - `programmingmb.troop771.com`
- MFA for admin users
- email verification

## Auth Portal App At `auth.troop771.com`

Create a very small Next.js app whose only job is authentication UI.

Suggested routes:

- `/sign-in`
- `/sign-up`
- `/user`

Suggested components:

- `<SignIn />`
- `<SignUp />`
- `<UserProfile />`

This app becomes the primary Clerk domain where sign-in and sign-up happen.

## ProgrammingMB Integration

`ProgrammingMB` currently uses `next-auth`.

Recommended change:

- remove `next-auth`
- adopt `@clerk/nextjs`
- use the same Clerk application as the auth portal

ProgrammingMB should:

- use Clerk middleware
- protect routes with Clerk auth helpers
- read Clerk `userId` as the identity key
- create or update a local app user row on first login

Store locally:

- `clerkUserId`
- email
- name
- merit-badge specific state

Do not store:

- password
- reset tokens
- auth provider state

## Mulch Companion Integration

`771-mulch-companion` is a Next.js + Payload app.

Recommended auth split:

- Payload auth remains in place for CMS/admin use for now
- Clerk becomes the shared user-facing auth for the Mulch application

This avoids coupling shared auth to Payload's built-in user collection right now.

Mulch should:

- use Clerk for public / member login
- keep Payload admin login separate unless we later decide to federate it

Store locally:

- `clerkUserId`
- email
- name
- mulch-specific state

## Session Behavior

Expected user flow:

1. User visits `programmingmb.troop771.com`
2. User chooses sign in
3. User is sent to `auth.troop771.com/sign-in`
4. User signs in with Clerk
5. User is redirected back to `programmingmb.troop771.com`
6. User later visits `mulch.troop771.com`
7. Clerk recognizes the existing authenticated state for the same root domain and signs the user into Mulch without asking for credentials again

This is shared auth, even though the underlying session cookies are scoped per app domain.

## DNS / Hosting Requirements

Create DNS records for:

- `auth.troop771.com`
- `mulch.troop771.com`
- `programmingmb.troop771.com`

Also configure Clerk's production domain settings and DNS records from the Clerk dashboard.

## Environment Variables

Each app will use the same Clerk application keys.

Example:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
```

### Auth Portal

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Mulch Companion

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=https://auth.troop771.com/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=https://auth.troop771.com/sign-up
```

### ProgrammingMB

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=https://auth.troop771.com/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=https://auth.troop771.com/sign-up
```

## Authorized Redirects

In the primary Clerk app at `auth.troop771.com`, allow redirects back to:

- `https://mulch.troop771.com`
- `https://programmingmb.troop771.com`

This is required for smooth return navigation after login.

## Subdomain Allowlist

Enable Clerk allowed subdomains in production and allow only:

- `auth.troop771.com`
- `mulch.troop771.com`
- `programmingmb.troop771.com`

This reduces exposure to subdomain-based attacks.

## Suggested Rollout Order

1. Create one Clerk application
2. Set the production primary domain to `auth.troop771.com`
3. Create the auth portal app
4. Deploy auth portal
5. Integrate `ProgrammingMB` with Clerk
6. Integrate `771-mulch-companion` with Clerk
7. Enable allowed subdomains and production auth settings

## Acceptance Criteria

Shared auth is working when:

1. A user signs in at `auth.troop771.com`
2. The user can access `programmingmb.troop771.com`
3. The user can access `mulch.troop771.com`
4. Both applications resolve the same Clerk user identity
5. App-local user records are linked using the same Clerk user ID

## Later Payload Migration

The main site can join later in one of two ways:

- keep Payload admin auth separate and use Clerk only for member-facing features
- migrate Payload auth fully to Clerk later

We should not block Mulch and ProgrammingMB on that future decision.

## Notes And Limits

- If we later need truly different top-level domains, Clerk's satellite-domain feature may be required, and Clerk documents that this is a paid production feature.
- Because Clerk's session token cookie is scoped to each app domain, app integration should rely on Clerk's SDK and redirect flow, not manual cookie sharing.
- Clerk does not recommend passkeys for different-domain satellite flows. We should start with email/password, email code, or social login first.

## Recommended Next Implementation Step

Build the `auth.troop771.com` auth portal first, then migrate `ProgrammingMB` to Clerk before integrating Mulch.
