---
name: Monochrome Editorial Social
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c6c6cb'
  on-secondary: '#2f3034'
  secondary-container: '#46464b'
  on-secondary-container: '#b5b4ba'
  tertiary: '#ffffff'
  on-tertiary: '#303032'
  tertiary-container: '#e4e2e4'
  on-tertiary-container: '#656466'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e7'
  secondary-fixed-dim: '#c6c6cb'
  on-secondary-fixed: '#1a1b1f'
  on-secondary-fixed-variant: '#46464b'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474649'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system expresses a refined, intellectual, and culturally attuned mobile social ecosystem. Designed for curious minds, writers, collectors, and community curators, it trades dopamine-driven noise and hyper-saturated gradients for editorial restraint, structural clarity, and typographical gravitas.

The visual direction merges **Minimalism** with an **Editorial Monochromatic** aesthetic:
- **Strict Tonality**: Surfaces rely exclusively on calibrated luminances of obsidian, graphite, concrete, and titanium white. The platform acts as a gallery-level canvas where media and typography command undivided attention.
- **Editorial Presence**: Heavyweight grotesque headlines anchor dynamic feeds, while meticulously tracked micro-labels create an architectural rhythm reminiscent of modern print journals and art publications.
- **Controlled Tactility**: Interfaces favor precise hairline structures, soft matte contrast layers, and intentional negative space over gratuitous skeuomorphism or overt blur effects.

## Colors

The palette is rigorously monochromatic, using calibrated steps of gray to communicate hierarchy, boundary, and focus without hue contamination:

- **Deep Surfaces**: 
  - Canvas background: `#050505` (deep obsidian ground)
  - Surface base / Containers: `#111111`
  - Elevated cards & sheets: `#1C1C1E`
- **Structural Lines**:
  - Subdued structural dividers: `#232326`
  - Subtle hairline borders: `#2C2C2E`
- **Typographic Tones**:
  - Primary text & focused glyphs: `#FFFFFF`
  - Secondary editorial copy & active metadata: `#C7C7CC`
  - Tertiary muted annotations & unselected icons: `#8E8E93`
  - De-emphasized timestamps & placeholder text: `#636366`
- **Light Inverse Counterparts (for dual-mode parity)**:
  - Canvas: `#FFFFFF`
  - Soft base & chips: `#F2F2F7`
  - Borders: `#E5E5EA`
  - Primary text: `#050505`

Color is deliberately banned for decorative flair. High-contrast state changes (pressed, selected, active) rely solely on inversion (e.g., solid `#FFFFFF` pill with `#050505` text) or luminance shifts.

## Typography

The typographic system creates an interplay between mechanical, brutalist-tinged headings and an exceptionally legible, humanely balanced reading texture:

- **Headlines & Titles (`Space Grotesk`)**: Provides sharp structural framing with tight tracking, distinct geometric letterforms, and unapologetic authority. Used for channel headers, topic titles, and key metrics.
- **Body & Longform Reading (`Hanken Grotesk`)**: Ensures effortless scanability across long discourse threads, community posts, and thoughtful commentaries. Features neutral horizontal terminals and open counterforms.
- **Labels & Micro-copy (`Space Grotesk`)**: All tag elements, category badges, timestamps, and section headers deploy upper-case or tabular small caps with intentional letter spacing (`+0.06em` to `+0.08em`), establishing crisp editorial cadence.

## Layout & Spacing

The layout embraces a mobile-first column discipline centered on breathable, uninterrupted vertical flow:

- **Layout Grid**: 
  - Mobile viewport uses a 4-column dynamic grid with a default outer margin of `1rem` (16px) and an inner gutter of `1rem`.
  - Tablet/Desktop views constrain main feeds to a focused reading column (max 640px) accompanied by an auxiliary index sidebar (320px).
- **Vertical Spacing Rhythm**:
  - Atomic component clustering (metadata to avatar, icon to counter): `space-xs` (4px) to `space-sm` (8px).
  - Internal card padding and thread separators: `space-md` (16px).
  - Semantic section boundaries and modular community pods: `space-lg` (24px) to `space-xl` (36px).
- **Whitespace Execution**: Post cards never feel compressed; copy is allowed deep margins, avoiding edge-to-edge clutter and lending an exhibition-catalog presence to user thoughts.

## Elevation & Depth

This design system avoids heavy drop shadows and colorful glow rings. Depth is communicated strictly via **Tonal Stacking** and **1px Hairline Outlines**:

- **Ground Layer (Canvas)**: `#050505` serves as the infinite background plane.
- **Layer 1 (Cards, Feed Rows)**: `#111111` or `#161618` bounded by a crisp `1px solid #2C2C2E` border. No drop shadow.
- **Layer 2 (Sheets, Modals, Overlays)**: `#1C1C1E` supported by an ultra-subtle, non-directional shadow: `0 8px 32px rgba(0, 0, 0, 0.65)` with a hairline highlight border of `1px solid #3A3A3C` on the top edge.
- **Interactive Focus**: Hover or press states do not elevate along a Z-axis; instead, card borders brighten from `#2C2C2E` to `#48484A` or `#FFFFFF`, and surfaces transition up one tonal tier.

## Shapes

The geometric vernacular uses controlled, moderate curves that feel architectural rather than toy-like:

- **Cards & Primary Modules**: 12px (`rounded-lg` adaptation) radius, creating clean nested corners against screen edges.
- **Form Controls & Action Blocks**: 8px (`rounded-md`) radius for functional clarity and precise alignment.
- **Topic Tags, Status Indicators, Badges**: Full pills (`rounded-full`) to immediately demarcate dynamic taxonomy items from structural square-shouldered content containers.
- **Avatars**: Soft-cornered squares (22% squircle or 10px radius) for community badges, and circular masks (pure rounds) strictly for individual personal profiles.

## Components

- **Buttons**:
  - *Primary*: Solid pure white background (`#FFFFFF`) with deep black text (`#050505`), Space Grotesk 14px bold, 8px corner radius, zero shadow.
  - *Secondary / Ghost*: Transparent surface with `1px solid #2C2C2E` perimeter, white text, transitioning to `#1C1C1E` surface on press.
  - *Minimal Text*: Text-only, `#8E8E93` transitioning to `#FFFFFF` on press, no background box.

- **Topic & Filter Chips**:
  - Compact capsules with `Space Grotesk` uppercase tracking.
  - *Inactive*: Dark graphite fill (`#1C1C1E`), border `#2C2C2E`, muted label (`#8E8E93`).
  - *Active*: Solid `#FFFFFF` fill with `#050505` text and zero border.

- **Feed Cards & Content Units**:
  - Background `#111111`, enclosed by 1px hairline `#2C2C2E`.
  - Inner padding `16px`. Header region contains an avatar, channel name, tracked timestamp, and vertical-ellipsis overflow.
  - Generous editorial typography spacing between header, body text, and media modules.
  - Footer bar uses line icons (stroke width 1.5px) paired with monospaced or tabular numerical metrics (`#8E8E93`).

- **Input Fields & Search**:
  - Boxed `#161618` field, 1px `#2C2C2E` border, 8px radius.
  - Placeholder rendered in `#636366`.
  - Focused state triggers border highlight to `#FFFFFF` without external focus halo or colored glow rings.

- **Community & Channel Strips**:
  - Horizontal scrollable rows of square-rounded community identifiers with high-contrast indicator dots for active discussion bursts.
  - Micro-dividers separating pinned discourse from the algorithmic stream using discrete `1px solid #1C1C1E` separators.

- **Selection Controls (Checkboxes & Switches)**:
  - Checkboxes use square 8px boxes with 1px hairline borders; checked state fills with solid `#FFFFFF` with an obsidian checkmark.
  - Switches feature a matte graphite track (`#2C2C2E`) and a mechanical white thumb (`#FFFFFF`) that slides crisply without squishy elastic exaggeration.