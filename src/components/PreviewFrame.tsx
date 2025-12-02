import React, { useEffect, useRef } from 'react';
import { GeneratedSite } from '../../types';

interface PreviewFrameProps {
  site: GeneratedSite | null;
  className?: string;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ site, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!site || !iframeRef.current) return;

    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    let fullContent = site.html;

    // Backward compatibility: If the model returns just body content or incomplete HTML
    if (!fullContent.includes('<!DOCTYPE html>') && !fullContent.includes('<html')) {
       fullContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>${site.css}</style>
          </head>
          <body>
            ${site.html}
            <script>try { ${site.javascript} } catch (e) { console.error(e) }</script>
          </body>
        </html>
      `;
    } else {
      // It is a full document. We need to inject the CSS and JS for the preview to work
      // without needing actual external files.
      
      // Inject CSS: Try to replace the link tag, otherwise append to head
      if (fullContent.includes('style.css')) {
         fullContent = fullContent.replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${site.css}</style>`);
      } else if (fullContent.includes('</head>')) {
         fullContent = fullContent.replace('</head>', `<style>${site.css}</style></head>`);
      } else {
         fullContent = `<style>${site.css}</style>` + fullContent;
      }

      // Inject JS: Try to replace the script tag, otherwise append to body
      if (fullContent.includes('script.js')) {
        fullContent = fullContent.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/i, `<script>try { ${site.javascript} } catch (e) { console.error(e) }</script>`);
      } else if (fullContent.includes('</body>')) {
        fullContent = fullContent.replace('</body>', `<script>try { ${site.javascript} } catch (e) { console.error(e) }</script></body>`);
      } else {
        fullContent = fullContent + `<script>try { ${site.javascript} } catch (e) { console.error(e) }</script>`;
      }
    }

    doc.open();
    doc.write(fullContent);
    doc.close();

  }, [site]);

  if (!site) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 text-slate-400 rounded-lg border-2 border-dashed border-slate-300 ${className}`}>
        <div className="text-center p-8">
          <p className="text-lg font-medium">No Preview Available</p>
          <p className="text-sm mt-2">Generate a website to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="Site Preview"
      className={`w-full h-full bg-white rounded-lg shadow-xl border border-slate-200 ${className}`}
      sandbox="allow-scripts allow-same-origin allow-modals"
    />
  );
};