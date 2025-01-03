// svelte-template-engine.ts
import { join, basename } from 'path';
import { NextFunction } from 'express';

type RenderCallback = (err: Error | null, rendered?: string) => void;

export function svelteTemplateEngine(filePath: string, options: any, callback: RenderCallback) {
  try {
    // 1) Déterminer le nom du template (ex. "Home")
    const templateName = basename(filePath, '.svelte');
    
    // 2) Charger le fichier compilé (ex. "dist/views/Home.js")
    const compiledPath = join(process.cwd(), 'dist', 'views', `${templateName}.js`);
    const Component = require(compiledPath);

    // 3) Créer un "payload" vide
    const $$payload = { out: '' };

    // 4) Appeler la fonction exportée (Component), en passant le payload et les props
    //    Les "props" sont ce que tu retournes dans le @Render() => { message: "Hello" }
    Component($$payload, options);

    // 5) Récupérer le HTML final dans $$payload.out
    const html = $$payload.out;

    // 6) Renvoyer le HTML à Express
    callback(null, html);
  } catch (err) {
    callback(err as Error);
  }
}
