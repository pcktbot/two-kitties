const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const file = Bun.file(`src/${path}`);
    return new Response(file);
  },
});

console.log(import.meta.dir);
console.log(`Listening on localhost:${server.port}`);