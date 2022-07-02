import { serve } from "std/http/server.ts";
import { render } from "./app/entry.server.tsx";

// 冷启动有亿点慢
// 不知道 emit esm.sh 干嘛
const { files } = await Deno.emit("./app/entry.client.tsx");
console.log("编译完成！");

function getFileUrl(relPath: string): string {
  return new URL(relPath, import.meta.url).href;
}

const routePath = new URLPattern({ pathname: "/app/routes/*" });

serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;
  // 这些明明可以根据路径静态生成（
  if (pathname === "/app/entry.client.tsx") {
    return new Response(files[`${getFileUrl("./app/entry.client.tsx")}.js`], {
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  } else if (pathname === "/import_map.json") {
    /**
     * fetch 本地文件，免去处理句柄的烦恼\
     * 不过话说，“返回”副作用这种 API 设计真的不好
     * @see https://deno.com/blog/deploy-static-files
     */
    const p = getFileUrl("/import_map.json");
    const importMap = await fetch(p);
    const res = new Response(importMap.body, {
      headers: { "Content-Type": "application/importmap+json; charset=utf-8" },
    });
    return res;
  } else if (pathname === "/app/root.tsx") {
    return new Response(files[`${getFileUrl("./app/root.tsx")}.js`], {
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  } else if (routePath.test(url)) {
    return new Response(files[`${getFileUrl(`.${pathname}`)}.js`], {
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  } else return await render(pathname);
});
