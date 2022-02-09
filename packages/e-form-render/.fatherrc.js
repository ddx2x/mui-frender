import copy from 'rollup-plugin-copy';

export default {
	// cjs: 'rollup',
	cjs: 'babel',
	// esm: {
	//   type: 'rollup',
	//   importLibToEs: true,
	// },
	esm: {
		type: 'babel',
		importLibToEs: true,
	},
	lessInBabelMode: true,
	extraRollupPlugins: [
		copy({
			targets: [{ src: 'src/index.d.ts', dest: 'dist/' }],
		}),
	],
};
