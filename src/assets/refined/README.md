# Portfolio image refinements

Mode: built-in image_gen editing (not CLI). Original source files are preserved in src/assets. The five PNG files here are selected presentation copies; scripts/work-assets.mjs creates responsive WebP versions and original comparisons in public/work. All six artworks receive a separate ApexGrid wordmark footer in the website, outside the artwork.

Accepted: apexgrid-heritage.png, apexgrid-traditional-values.png, green-bean-coffee.png, sprite-refreshment.png, krisp-packaging.png.

The generated Tiago edit was rejected because it changed vehicle details. The original Tiago is used in the new presentation. Refined artwork is AI-assisted and may alter small details or microtext; the viewer explicitly offers the original for exact label text. These are presentation assets, not production packaging files or evidence of client endorsement.

## Final prompt set

For IMG_6934.PNG, IMG_6935.PNG, Instagram post - 4.jpg.jpeg, and PT1.jpg.jpeg, one built-in edit call per source, using this prompt with the source filename substituted:

> Use case: precise-object-edit. Edit target: attached {filename}. Create a faithful professional cleanup of this portfolio artwork. Improve edge definition, image clarity and restrained tonal contrast, preserve original composition, all objects, brand logos, exact wording and prices, original aspect ratio. For coffee make GREEN BEAN headline more legible. Preserve identities and every design element. No invented text, claims, extra logos or watermark. Website supplies separate ApexGrid branding. Deliver one polished edited image.

Sprite:

> Use case: precise-object-edit. Asset type: finished Sprite beverage advertising artwork for an agency portfolio. Edit target: attached src/assets/Section 1.png. Remove ONLY the external black screenshot surround, the gray editor workspace and the small 'Section 1' editor label. Output the actual bright green advertising art edge-to-edge, approximately 4:5 portrait. Polish the can edges, water droplets and mint/citrus detail, reduce visible screenshot/compression softness. Preserve the original Sprite wordmark, tilted blue/green can identity, citrus/mint layout, water splash and green FRESH SPRITE background typography. Keep all visible lettering accurate to the source. No new text, no new claims, no prices, no extra logos or signatures. Do not change the scene or reinterpret the design. Sharp professional advertising finish, with clean edges and restrained contrast. Preserve every element of the actual artwork within its green canvas.

Krisp:

> Use case: precise-object-edit. Asset type: a finished packaging design board for a professional portfolio. Edit target: attached src/assets/Section 2.png. Remove the outer black screenshot border, gray editor workspace and tiny Section 2 label. Preserve the complete five-label KRISP beverage packaging strip: WATERMELON pink, ORANGE yellow, KIWI green, BLUEBERRY blue, JAMUN purple. Preserve the original KRISP logo styling, all fruit photos, label typography, words, barcodes, and label proportions; do not invent new claims or copy. Place the full five-label strip centered on a clean warm off-white presentation canvas, wide landscape, with modest equal margins and a very subtle paper shadow. Labels are flat, front-facing, in the exact original order. Improve crispness carefully without altering typography. No 3D cans, no new props, no extra branding, no watermark. The goal is a clean, readable, high-resolution presentation of the same actual artwork, not a redesign.
