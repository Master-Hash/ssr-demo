# ssr-demo

## 运行

```console
$ deno task dev
```

## 技术栈

- React 18
- React Router 6
- Deno

## 已知问题

> Hydration failed because the initial UI does not match what was rendered on
> the server.
> ([Error 418](https://reactjs.org/docs/error-decoder.html/?invariant=418))

> There was an error while hydrating. Because the error happened outside of a
> Suspense boundary, the entire root will switch to client rendering.
> ([Error 423](https://reactjs.org/docs/error-decoder.html/?invariant=423))

经控制变量，

- 不是 `hydrateRoot(e, c)` 首个参数的锅（`document` 和 `<html>` 都不对）
- 不是 `renderToReadableStream(c)` 的锅，换成 `renderToString(c)` 一样不对
- 不是 React Router 的锅，把 `./app/root.tsx` 换成普通的计数器依然不对

<!-- ## Fetch Router

懒得多开仓库，先放一起。

路径解析逻辑参考：

- Starlette, Django
- oak
- servest
- URLPattern

中间件不打算做。 -->
