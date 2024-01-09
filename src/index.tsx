import { Hono } from "hono";
import {cors} from 'hono/cors'
import type { FC } from "hono/jsx";

const app = new Hono();
app.use('*', cors())

const Layout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <title>ByteByte API</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const HomePage: FC = () => {
  return (
    <div class={'bg-slate-200 w-full h-screen'}>
      <h1 class={'text-2xl'}>Welcome to the BytByte API</h1>
      <p>Please direct to the official docs and page for more info, this page is intended for developers and tools built for the site</p>
    </div>
  )
}

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
      <HomePage />
    </Layout>
  );
});

app.get("/jsx/:id", (c) => {
  const id = c.req.param("id");
  return c.html(<Second id={id} />);
});

app.get("/json/:id", (c) => {
  const id = c.req.param('id')
  const page = c.req.query('page')
  return c.json({
    idName: id,
    pageNum: page
  })
})

export default app;
