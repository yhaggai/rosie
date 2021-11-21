import { manifest, version } from '@parcel/service-worker';

async function install() {
  const cache = await caches.open(version);
  console.log('hi');
  await cache.addAll(manifest);
}
addEventListener('install', (e) => e.waitUntil(install()));
