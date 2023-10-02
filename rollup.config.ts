/*
 * @Author: Semmy Wong
 * @Date: 2023-09-21 09:03:16
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2023-09-21 19:43:08
 * @Description: 描述
 */
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';

const config: RollupOptions = {
    input: `src/index.ts`,
    output: [{ file: 'dist/koa-owler.js', format: 'cjs', sourcemap: false }],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['owler'],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // Allow json resolution
        json(),
        // Compile TypeScript files
        typescript({ sourceMap: false }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
    ],
};

export default config;
