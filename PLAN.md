# Vastra Villa Redesign Plan - Framer Motion & Apple-Style 3D Orbit

This plan covers the visual and interactive refactoring of Vastra Villa to achieve a minimalist, premium Shopify-style light mode aesthetic. We will utilize **Framer Motion** for smooth transitions, replace the static tilt card with a **drag-to-rotate 3D orbit viewer** showing front, side, and back camera angles (like Apple's AirPods product view), and set the default location to **Dehradun, India**.

---

## Proposed Changes

### 1. Library Dependencies
- [x] **Framer Motion**: Installed `framer-motion` package to enable premium canvas animations, slide transitions, and interactive gesture controls.

### 2. Workspace Plan Visibility
- [x] **PLAN.md** in the workspace root (This file! You can read and track our progress here).

### 3. Product Catalog Extension
- [MODIFY] `src/data/products.ts`
  - Add an `images` array property to the `Product` interface to support multiple camera angles:
    - **Obsidian Tee**: `["/images/products/oversized_tee_black.png", "/images/products/oversized_tee_black_side.png", "/images/products/oversized_tee_black_back.png"]`
    - **Lilac Hoodie**: `["/images/products/baggy_hoodie.png", "/images/products/baggy_hoodie_side.png", "/images/products/baggy_hoodie_back.png"]`
    - **Sage Corduroy Shirt**: `["/images/products/sage_shirt.png", "/images/products/sage_shirt_back.png"]`
    - **Cream Cable Sweater**: `["/images/products/cable_knit.png", "/images/products/cable_knit_back.png"]`
    - Other items fall back to their primary image.

### 4. Interactive 3D Orbit Viewer (Apple AirPods Style)
- [MODIFY] `src/components/ThreeDViewer.tsx` & `src/components/ThreeDViewer.module.css`
  - Replace the single-image tilting card with a **Drag-to-Rotate Scrubber**.
  - Capture drag offsets using Framer Motion's `pan` gestures. Dragging left/right scrubs through the angle index (Front ➔ Side ➔ Back).
  - Include an interactive horizontal capsule selector (dots and labels: "Front", "Side", "Back") that updates dynamically during drags or can be clicked to snap camera angles.
  - Implement smooth cross-fade animation between angles using Framer Motion's `AnimatePresence`.
  - Maintain a very subtle, high-end 3D perspective tilt effect on hover to give a premium responsive feel.

### 5. Premium Layout & Theme Refinements (Shopify-Inspired)
- [MODIFY] `src/app/globals.css`
  - Implement a soft purple ambient background gradient overlay on the light body background (`oklch(0.985 0.002 285)`) to create the perfect "purple light + light mode" aesthetic.
  - Set the rounded glassmorphic navbar style variables: background to translucent white (`rgba(255,255,255,0.7)`) and borders to soft purple glass (`rgba(109, 40, 217, 0.08)`).
  - Enhance font tracking and line heights across headings to make layouts feel spacious and editorial.
- [MODIFY] `src/components/Navbar.module.css`
  - Style the header navbar to look like a floating pill capsule with a rounded border and increase the blur effect (`backdrop-filter: blur(24px)`).
- [MODIFY] `src/components/ProductModal.module.css`
  - Change the dark modal overlay backdrop from high-contrast black (`rgba(0,0,0,0.7)`) to a modern, light, blurred backdrop (`rgba(0,0,0,0.2)`) to keep the visual tone minimalist and light.
- [MODIFY] `src/components/Footer.tsx`
  - Replace remaining occurrences of "Barraroon" with "Dehradun, India".
- [MODIFY] `src/components/CartDrawer.tsx`
  - Change Razorpay options configuration theme color from cyan (`#00f0ff`) to primary purple (`#6d28d9`).

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify compiling.
- Run `npm run lint` for style/type compliance.

### Manual Verification
- Test 3D Orbit scrubbing: Click and drag horizontally on the product image inside the modal to rotate the camera angles.
- Test quick-snapping by clicking the "Front", "Side", and "Back" camera labels.
- Verify that the layout feels clean, minimal, light-mode only, and uses the soft purple ambient background light.
