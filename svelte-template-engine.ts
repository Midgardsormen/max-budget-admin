import { join, basename } from 'path';
import { NextFunction } from 'express';

type RenderCallback = (err: Error | null, rendered?: string) => void;

export function svelteTemplateEngine(filePath: string, options: any, callback: RenderCallback) {
  try {
    const templateName = basename(filePath, '.svelte');
    const compiledPath = join(process.cwd(), 'dist', 'server', `${templateName}.js`);
    const Component = require(compiledPath);

    const $$payload = { out: '' };
    Component($$payload, options);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${templateName}</title>
          <link rel="stylesheet" href="/assets/assets/home.css" />
        </head>
        <body>
          <div id="app">${$$payload.out}</div>
          <script type="module" src="/assets/home.js"></script>
        </body>
      </html>
    `;

    callback(null, html);
  } catch (err) {
    callback(err as Error);
  }
}
