import { Hono } from "hono";
import type { FC } from "hono/jsx";

const app = new Hono();

const Layout: FC = () => {
  return (
    <div>
      <h1>Hello Hono!</h1>
    </div>
  );
};

const Second: FC<{ id: string }> = (props: { id: string }) => {
  return (
    <div>
      <h1>Second Page with id number {props.id}</h1>
    </div>
  );
};

app.get("/", (c) => {
  return c.html(<Layout />);
});

app.get("/jsx/:id", (c) => {
  const id = c.req.param("id");
  return c.html(<Second id={id} />);
});

export default app;
