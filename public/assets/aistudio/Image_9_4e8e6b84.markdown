---
name: Clarity Productivity
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#b61722'
  on-tertiary: '#ffffff'
  tertiary-container: '#da3437'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: '0'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: '0'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies modern functional minimalism built for friction-free task execution and deep focus. The target audience encompasses knowledge workers, developers, and product teams requiring an uncluttered digital workspace. 

The aesthetic is ultra-crisp, intentional, and calm. Visual weight relies strictly on spatial cadence, pure white elevation layers against subtle cool-slate backdrops, and deliberate indigo focal points rather than decorative embellishments. The interface communicates speed, reliability, and cognitive relief through purposeful whitespace and structural clarity.

## Colors
The palette balances cool slate neutrals with an energetic indigo accent to establish clear hierarchy without visual fatigue:

- **Canvas & Surfaces**: The base application canvas is rendered in `#F8FAFC`, transitioning to `#F1F5F9` for secondary structural trays. Interactive cards, modals, and list rows sit on pure `#FFFFFF` surfaces.
- **Brand Primary (`#6366F1` / Hover `#4F46E5`)**: Reserved for core focal triggers, active filter states, completed task indicators, and primary action controls.
- **Neutrals**:
  - Primary Headings & Critical Labels: `#0F172A`
  - Body Text & Metadata: `#475569`
  - Structural Borders & Dividing Lines: `#E2E8F0`
  - Placeholder & Completed/Muted Copy: `#94A3B8`
- **Functional Semantics**:
  - Positive/Success: `#10B981` (used for task streak achievements, done states).
  - Destructive/Warning: `#EF4444` (used for destructive hover states and overdue flags).

## Typography
Plus Jakarta Sans provides a clean, contemporary geometric rhythm with high legibility at micro scales and authoritative presence at header scales.

- **Headlines**: Tight letter-spacing (`-0.02em` to `-0.025em`) ensures compact, punchy layout titles.
- **Body Content**: Enhanced line-height (1.55 to 1.6) prevents visual fatigue when scanning dense task lists and nested descriptions.
- **Strikethrough States**: Completed task items switch weight to `400`, color to `#94A3B8`, accompanied by an unobtrusive horizontal strike line.

## Layout & Spacing
The layout follows a centered column paradigm engineered for maximum task comprehension:

- **Desktop (min-width: 1024px)**: Fixed centered content max-width (768px for single-column task stream; 1140px for sidebar-and-board views). Canvas margin defaults to `2rem` (`space-xl`).
- **Tablet (768px - 1023px)**: Fluid container spanning up to 90% width with `1.5rem` margins and `1rem` column gutters.
- **Mobile (< 768px)**: Fluid full-width container with `1rem` boundary margins (`margin-mobile`), ensuring tap zones stay clear of screen edges.
- **Rhythm**: All vertical stack gaps and internal element padding rely strictly on 4px-base increments (`0.25rem` up to `2.5rem`), maintaining strict vertical flow across lists and nested action groups.

## Elevation & Depth
Depth is established through soft, diffused ambient lighting rather than heavy drop shadows:

- **Flat Border Tier**: Baseline cards, input bars, and table containers utilize a 1px border (`#E2E8F0`) with no shadow when resting on `#F8FAFC`.
- **Level 1 (Cards & Items)**: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`. Provides crisp surface separation.
- **Level 2 (Hover & Draggable Item Lift)**: `0 10px 15px -3px rgba(99, 102, 241, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`. Emits a faint indigo ambient wash signaling interactive pickup.
- **Level 3 (Modals & Command Menus)**: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)`.

## Shapes
A roundedness factor of `2` provides modern softness while preserving structured geometry:

- **Cards & Task Containers**: `rounded-xl` (1.5rem / 24px) for top-level panels; `rounded-lg` (1rem / 16px) for item rows and dialog modules.
- **Inputs & Buttons**: `0.5rem` (8px) for buttons and text inputs to maintain crisp alignment with adjacent controls.
- **Pill Filters & Circular Triggers**: Full border radius (`rounded-full` / 9999px) strictly for category chips, status tags, and custom checkbox toggles.

## Components

- **Circular Checkboxes**: 
  - 20px diameter circles. Unchecked state: 1.5px border in `#CBD5E1`, background `#FFFFFF`. 
  - Hover state: Border shifts to `#6366F1`.
  - Checked state: Background `#6366F1`, border `#6366F1`, displaying a centered white check icon (`12px`). Includes a gentle 150ms spring scale transition.

- **Action Buttons**:
  - *Primary*: Background `#6366F1`, text `#FFFFFF`, font weight `500`. Hover: `#4F46E5` with subtle indigo focus ring (`box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2)`).
  - *Secondary / Ghost*: Background transparent, text `#475569`, border `1px solid #E2E8F0`. Hover: Background `#F1F5F9`, text `#0F172A`.
  - *Destructive*: Background transparent, text `#94A3B8`. Hover: Background `#FEF2F2`, text `#EF4444`.

- **Filter Pills**:
  - Compact height (`32px`), padding `0 12px`, fully rounded (`rounded-full`). 
  - Inactive: Text `#64748B`, background transparent.
  - Active: Text `#4F46E5`, background `#EEF2FF`, border `1px solid #E0E7FF`.

- **Task List Rows**:
  - Background `#FFFFFF`, 1px border `#E2E8F0`, padding `12px 16px`, border-radius `12px`.
  - Layout: Flex row with 12px gap separating the circular checkbox, task text content, due badge, and trailing action menu.
  - Hover: Subtle elevation shift (Level 2) and border tint to `#CBD5E1`.

- **Quick-Add Input Field**:
  - Full-width elevated bar on `#FFFFFF` with `rounded-xl` corners.
  - 1px border `#E2E8F0`, padding `14px 18px`.
  - Focus: Border color `#6366F1`, accompanied by an ambient indigo aura (`0 0 0 3px rgba(99, 102, 241, 0.15)`). Placeholders styled in `#94A3B8`.

- **Meta Badges & Due Dates**:
  - Text size `11px`, weight `600`, padding `2px 8px`, `rounded-full`.
  - Standard: Background `#F1F5F9`, text `#475569`.
  - Urgent/Overdue: Background `#FEF2F2`, text `#EF4444`.