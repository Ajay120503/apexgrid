import sharp from 'sharp';
import { mkdir, access, writeFile } from 'node:fs/promises';
const sources = [
  ['apexgrid-heritage', 'src/assets/IMG_6934.PNG'],
  ['apexgrid-traditional-values', 'src/assets/IMG_6935.PNG'],
  ['tiago-social-creative', 'src/assets/Instagram post - 4.jpg.jpeg'],
  ['green-bean-coffee', 'src/assets/PT1.jpg.jpeg'],
  ['sprite-refreshment', 'src/assets/Section 1.png'],
  ['krisp-packaging', 'src/assets/Section 2.png'],
];
await mkdir('public/work', { recursive: true });
const manifest = {};
for (const [id, original] of sources) {
  const edited = `src/assets/refined/${id}.png`;
  const refined = await access(edited).then(
    () => true,
    () => false,
  );
  manifest[id] = { refined };
  for (const version of ['original', 'refined']) {
    const source = version === 'refined' && refined ? edited : original;
    const metadata = await sharp(source).metadata();
    const variants = [];
    for (const width of id === 'krisp-packaging' ? [640, 1200, 2400] : [640, 1200]) {
      const url = `/work/${id}${version === 'original' ? '-original' : ''}-${width}.webp`;
      const result = await sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(`public${url}`);
      variants.push({ url, width: result.width });
    }
    manifest[id][version] = { width: metadata.width, height: metadata.height, variants };
  }
}
await writeFile('src/data/work-assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Generated original and refined responsive portfolio assets.');
