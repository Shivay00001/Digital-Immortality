import { PassThrough } from "stream";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";

export default function handleRequest(
  request,
  statusCode,
  headers,
  context
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe } = renderToPipeableStream(
      <RemixServer context={context} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough();
          headers.set("Content-Type", "text/html");
          resolve(new Response(body, { status: didError ? 500 : statusCode, headers }));
          pipe(body);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );
  });
}