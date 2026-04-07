# Troop Website

Public-facing troop website built with Next.js and Payload CMS.

## Overview

This project is designed to:

- Provide clear, useful information to prospective families and the community
- Support troop fundraisers and communication
- Allow a youth Webmaster to manage content safely through a CMS
- Avoid storing or exposing sensitive member data

The site intentionally does not include a members-only portal. Internal communication and private information should stay in existing tools such as Slack.

## Goals

- Keep the site simple, secure, and easy to maintain
- Empower a youth Webmaster role
- Minimize administrative overhead by avoiding member account management
- Ensure all public content is safe for minors

## Tech Stack

- Frontend: Next.js App Router
- Styling: Tailwind CSS
- CMS: Payload CMS, self-hosted within the app
- Hosting: Vercel is the recommended deployment target

## Core Architecture

- Public website pages are rendered with Next.js
- Content is managed through Payload CMS
- Authentication exists only for editors and admins
- Public visitors do not sign in

## Site Structure

```text
/ (Home)
├── About
├── Join
├── Activities
├── Fundraisers
├── Resources
├── Gallery
└── Contact
```

## Pages

### Home

- Overview of the troop
- Highlights of activities
- Clear calls to action for Join, Contact, and Fundraisers

### About

- Troop mission and values
- Brief history
- Leadership information with limited detail and no personal contact information

### Join

- How to join the troop
- General meeting information without exact public addresses
- Contact form

### Activities

- Types of outings such as camping, hiking, and service
- High-level calendar information without detailed logistics

### Fundraisers

- Current fundraiser information such as a mulch sale
- Ordering instructions or links
- Key non-sensitive dates

### Resources

Publicly accessible documents such as:

- Packing lists
- General troop guidelines
- Blank forms that do not contain sensitive data
- Printable flyers

Do not include:

- Medical forms
- Permission slips with personal data
- Rosters
- Contact sheets

### Gallery

- Group photos only
- No names attached to minors
- Avoid identifiable locations such as home addresses or schools

### Contact

- Contact form routed to a troop email inbox
- No direct email addresses published on the site

## Payload CMS Setup

### Collections

#### Users

Used for site administrators and content editors only.

Suggested roles:

- `admin`: full access
- `editor`: can edit content
- `webmaster`: youth role with restricted permissions

#### Pages

Optional collection for flexible page content if needed.

#### Resources

- `title`: string
- `description`: text
- `file`: upload
- `category`: select such as `packing`, `forms`, `general`
- `isPublic`: boolean, default `true`

#### Gallery

- `title`: string
- `image`: upload
- `description`: optional text
- `isApproved`: boolean

### Globals

Recommended globals for easier editing:

- `homepage`
- `aboutPage`
- `joinPage`
- `fundraiserPage`
- `resourcesPage`

## Access Control Strategy

Key principle: youth can contribute while adults maintain oversight.

Suggested permissions:

| Role | Permissions |
| --- | --- |
| `admin` | Full access |
| `editor` | Create, edit, publish |
| `webmaster` | Create and edit, with limited publish access |

Optional policy:

- Require admin approval before publishing certain high-visibility content such as the homepage

## Security Guidelines

### Do

- Use a contact form instead of exposing email addresses
- Keep meeting locations general, for example "local church"
- Use group photos only
- Review content periodically
- Limit CMS access to trusted users

### Do Not

- Publish full names of scouts
- Share phone numbers or email addresses
- Post exact meeting locations publicly
- Share travel plans in real time
- Store sensitive documents

## Authentication

- Payload authentication is for editors only
- Public users do not authenticate
- There are no member accounts

## Deployment

Recommended deployment target: Vercel

- Host the Next.js frontend and Payload app together
- Configure environment variables for Payload
- Use secure file storage and avoid publicly exposed buckets for sensitive uploads

## Future Considerations

Not currently in scope:

- Members-only portal
- Scout advancement tracking
- Private calendars
- Messaging system

These are intentionally excluded to reduce complexity, avoid user-account management, and minimize security risk.

## Webmaster Role

This project supports a Scout serving as Webmaster by allowing them to:

- Update pages and announcements
- Upload photos using approval guidelines
- Manage public resources and documents
- Help maintain fundraiser pages

### Guardrails

- No access to sensitive data
- Content should be reviewed periodically by an adult
- Work should follow troop and organizational online safety guidelines

## Development Notes

- Keep components modular, such as Hero, CTA, and Section blocks
- Prefer CMS-driven content over hardcoded text
- Validate uploads for file size and type
- Sanitize all inputs, especially forms

## Summary

This project prioritizes simplicity, safety, maintainability, and youth involvement with clear guardrails. It is intentionally designed to avoid unnecessary complexity while still delivering a useful and professional troop website.
