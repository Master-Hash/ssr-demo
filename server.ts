/** @jsxImportSource https://esm.sh/react */
import { serve } from "https://deno.land/std/http/server.ts";
import { render } from "./app/entry.server.tsx";

// 冷启动有亿点慢
// 不知道 emit esm.sh 干嘛
const { files } = await Deno.emit("./app/entry.client.tsx");
console.log("编译完成！");
const routePath = new URLPattern({ pathname: "/app/routes/*" });

serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;
  // 这些明明可以根据路径静态生成（
  if (pathname === "/app/entry.client.tsx") {
    return new Response(files["file:///C:/Users/90895/Desktop/ssr-demo/app/entry.client.tsx.js"], {
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  }
  else if (pathname === "/app/root.tsx") {
    return new Response(files["file:///C:/Users/90895/Desktop/ssr-demo/app/root.tsx.js"], {
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  }
  else if (routePath.test(url)) {
    return new Response(files[`file:///C:/Users/90895/Desktop/ssr-demo${pathname}.js`], {
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  }
  else { return await render(pathname); }
});

