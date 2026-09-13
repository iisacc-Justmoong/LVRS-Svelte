import adapter from '@sveltejs/adapter-static';
export default { kit: { outDir: 'build/kit', adapter: adapter({ pages: 'build/catalog', assets: 'build/catalog' }) } };
