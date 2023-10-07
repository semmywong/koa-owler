/*
 * @Author: Semmy Wong
 * @Date: 2023-09-21 09:03:16
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2023-10-02 14:32:25
 * @Description: 描述
 */
import fs from 'fs';
import { Context } from 'koa';
import owler from 'owler';
import path from 'path';

export default class KoaOwler {
    private rootPath: string = '';
    private options: KoaOwlerOption = {
        autoRender: true,
        extension: 'html',
    };
    private koaContext: Context;
    public view(rootPath: string, options = {}) {
        this.rootPath = rootPath;
        this.options = Object.assign({}, this.options, options);
        return async (ctx: Context, next: () => Promise<any>) => {
            this.koaContext = ctx;
            if (!ctx) {
                return this.render.bind(this);
            }

            if (ctx.render) {
                return next();
            }

            ctx.response.render = ctx.render = this.render.bind(this);

            return next();
        };
    }

    private async render(filePath: string, data = {}, localOptions = {}) {
        const file = path.join(this.rootPath, filePath + '.' + this.options.extension);
        const content = fs.readFileSync(file);
        const options = Object.assign({}, this.options, localOptions);
        const html = owler.render(content.toString(), data, options);
        if (options.autoRender) {
            this.koaContext.type = 'text/html';
            this.koaContext.body = html;
        } else {
            return html;
        }
    }
}

export const koaOwler = new KoaOwler();
