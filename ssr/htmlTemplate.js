export const template = (rootContent, state) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="icon" href="favicon.png" type="image/png" />
      <link href="main.css" rel="stylesheet">
      <title>Memo</title>
    </head>
    <body>
      <div id="root">${rootContent}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/usage/server-rendering#security-considerations
        window.__PRELOADED_STATE__=${state}
      </script>
      <script src="bundle.js"></script>
    </body>
  </html>
`;
