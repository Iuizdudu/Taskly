---
name: Obsidian Precision
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  mono-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

The design system embodies focused productivity through understated, high-craft digital minimalism. Drawing direct lineage from keyboard-first utilities like Raycast, intentional task managers like Things 3, and developer-grade execution tools like Linear, the UI serves as an uncompromised stage for the user's focus rather than an attention seeker.

The visual style merges Dark Graphite Minimalism with Functional Precision:
- **Atmospheric Neutrality**: Deep graphite tones that eliminate eye strain while preserving absolute legibility. Pure black (`#000000`) is reserved exclusively for structural negative space, overlays, and extreme contrast accents, never for resting canvases.
- **Intentional Density**: Information density is calibrated for velocity. Workflows minimize extraneous visual ornamentation—no decorative gradients, no unnecessary card framing, and zero AI-generated container clutter.
- **Quiet Confident Craft**: Visual anchors are established through typographic nuance, surgical micro-borders, and tactile keyboard-focused affordances. The user experience feels mechanical, responsive, and definitive.

## Colors

The palette is engineered around deep graphite tiers illuminated by a single, deliberate spectral family: luminous electric indigo and violet.

### Color Tiers & Functional Role
- **Backgrounds & Canvases**:
  - `Base / App Canvas`: `#0D0E11` — The foundational dark tone.
  - `Surface 1 (Elevated/Sidebar)`: `#121316` — Primary layout structure.
  - `Surface 2 (Interactive/Containers)`: `#181A1F` — Row items, input fields, popovers.
  - `Surface 3 (Active/Hover/Floating)`: `#22252C` — Active selections and command palettes.
- **Borders & Micro-Dividers**:
  - `Border Subtle`: `rgba(255, 255, 255, 0.06)` — Hairline segmentations.
  - `Border Strong`: `rgba(255, 255, 255, 0.12)` — Command surfaces and inputs.
  - `Border Focus`: `rgba(99, 102, 241, 0.50)` — High-precision keyboard focus rings.
- **Text & Content**:
  - `Text Primary`: `#F3F4F6` (96% contrast).
  - `Text Secondary`: `#9CA3AF` (Muted labels, metadata, shortcuts).
  - `Text Tertiary`: `#4B5563` (Placeholders, inactive shortcuts, grid dividers).
- **Accents**:
  - `Indigo Accent (Primary)`: `#6366F1` — Interactive toggles, primary badges, high-priority state.
  - `Violet Tint (Secondary)`: `#8B5CF6` — Subtle linear gradient accents, highlight glows, tertiary telemetry.
  - `Status Alerts`: Urgency is conveyed through restrained, desaturated tones: Emerald (`#10B981`) for completed, Amber (`#F59E0B`) for blocked, Crimson (`#EF4444`) for critical overdue items.

## Typography

Typographic scale is built on `Inter` with tabular figures activated globally (`font-feature-settings: 'tnum' 1, 'cv05' 1, 'cv11' 1`) for strict mechanical rhythm in task lists, timestamps, and embedded metrics. Monospaced keyboard hints and technical telemetry utilize `JetBrains Mono`.

Tight negative letter-spacing is applied systematically to headings larger than 16px to create the commanding, engineered feel characteristic of Linear and Raycast. Body and label sizes feature relaxed micro-tracking to guarantee legible scanning at small sizes in both desktop panes and mobile drawers.

## Layout & Spacing

The structural layout uses an asymmetrical split-pane model optimized for dense workspace productivity:
- **Left Navigation Rail / Sidebar**: Fixed at 240px on desktop, collapsible to an icon-only 56px rail, and hidden off-canvas on mobile viewports.
- **Main Workflow Stream**: Fluid center column max-width set to 840px for ideal reading measure, centered within expansive viewports.
- **Context / Inspector Panel**: Dynamic 360px contextual slide-in pane for detailed item attributes, activity logs, and subtask trees.

### Spacing Principles
- Vertical rhythm uses an immutable 4px baseline sub-grid (`0.25rem`, `0.5rem`, `0.75rem`, `1.25rem`, `2rem`).
- Task item rows adhere to a compact 36px fixed height (40px on touch surfaces) with a consistent horizontal inset of `space-md` (12px).
- Embedded metric bars use inline flex layouts directly embedded into headers with `space-sm` gaps, removing the need for separated metric widget boxes.

## Elevation & Depth

Depth is established through physical luminance and hairline borders rather than muddy diffuse drop-shadows.

1. **Surface Luminance Stacking**:
   - Depth tier 0 (Canvas): `#0D0E11`
   - Depth tier 1 (List rows & panes): `#121316` bounded by 1px solid `rgba(255, 255, 255, 0.05)`
   - Depth tier 2 (Context menus, command palettes): `#181A1F` with a 1px border `rgba(255, 255, 255, 0.10)`
2. **Micro-Shadows**:
   - Floating utility panels (Raycast-style overlays and shortcut palettes) employ a precision drop shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)`.
3. **Glass Substrates**:
   - Sticky table headers and modal backdrops utilize subtle backdrop blur: `backdrop-filter: blur(12px)` over `rgba(13, 14, 17, 0.75)` to maintain context during scroll.

## Shapes

The design system adopts a calibrated "Soft" geometric profile (`roundedness: 1`):
- Standard interactive elements (buttons, row items, tooltips, tags) use a radius of 4px to 6px (`0.25rem` to `0.375rem`), reinforcing an architectural, tool-like demeanor.
- Overlays, dialogs, and large flyout panels use a maximum radius of 8px (`0.5rem`).
- Circular geometry is strictly isolated to circular task checkboxes, user avatars, and status presence pips. Pill-shaped geometry is avoided to prevent the UI from appearing casual or toy-like.

## Components

### 1. Minimal Circular Checkbox
- **Default State**: 16px diameter circular ring with a 1.25px stroke of `rgba(255, 255, 255, 0.25)`, unfilled background.
- **Hover State**: Stroke brightens to `rgba(255, 255, 255, 0.60)` with a subtle radial indigo illumination.
- **Checked State**: Solid fill of `#6366F1` with an interior crisp SVG check icon (`#FFFFFF`, stroke-width: 2.5, non-scaling stroke). Triggers an immediate strike-through animation with text fading to `Text Tertiary`.

### 2. Task Row (No Generic Cards)
- Flat horizontal row item without individual card elevation or bulky border wrapping. Rows are separated by hair-thin `rgba(255, 255, 255, 0.04)` bottom borders.
- Hovering reveals inline actions (schedule, assign, tag, delete) while setting the row background to `#181A1F`.
- Inline metrics: Status, estimated duration, and tags appear as compact, non-intrusive metadata alongside the task label.

### 3. Dedicated Triple-State Theme Switch
- Segmented control housing three states: `Light`, `Dark`, `System`.
- Container: 28px height, background `#121316`, border 1px solid `rgba(255, 255, 255, 0.08)`, border-radius 6px, padding 2px.
- Segment Item: Uniform flex width, SVG icon (Sun, Moon, Monitor), size 14px, muted color `#9CA3AF`.
- Active Pill: Background `#22252C`, color `#F3F4F6`, border-radius 4px, shadow `0 1px 3px rgba(0, 0, 0, 0.4)`.

### 4. Command Palette (Raycast-Inspired)
- Centered overlay, 640px width, floating at 15% viewport from top.
- Integrated search input: 48px height, unbordered, 16px font size with instantaneous live-filtered keyboard navigation (`Cmd+K`).
- Action footer containing instant keyboard cues rendered with `mono-code` keycaps (`↵ Open`, `⌘K Actions`, `ESC Close`).

### 5. Buttons & Interactive Controls
- **Primary Button**: Solid `#6366F1` background, `#FFFFFF` text, 6px radius, height 32px, padding horizontal 12px. Hover: `#4F46E5`.
- **Secondary Button**: Translucent surface `#181A1F`, border 1px solid `rgba(255, 255, 255, 0.08)`, hover: border `rgba(255, 255, 255, 0.16)`.
- **Ghost Action**: Transparent background, text `Text Secondary`, height 28px, hover: `rgba(255, 255, 255, 0.05)`.