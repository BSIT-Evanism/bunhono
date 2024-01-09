import { Hono } from "hono";
import type { FC } from "hono/jsx";

const app = new Hono();

const Layout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <title>Document</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const Second: FC<{ id: string }> = (props: { id: string }) => {
  return (
    <div>
      <h1>Second Page with id number {props.id}</h1>
    </div>
  );
};

app.get("/hello", (c) => {
  return c.json({
    hello: "world",
  });
});

app.get("/", (c) => {
  return c.html(
    <Layout>
      <h1>Hello World</h1>
      <button hx-get="/hello" hx-swap="innerHTML">
        Click Me
      </button>
    </Layout>
  );
});

app.get("/jsx/:id", (c) => {
  const id = c.req.param("id");
  return c.html(<Second id={id} />);
});

export default app;
