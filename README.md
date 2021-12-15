## 参考

`杨村长`
https://juejin.cn/post/6924912613750996999

https://fouber.github.io/lottery/

## 做什么

## npm script
9/13 我 npm run serve 发现一直没有热更新 找了很久问题 没找到
后来去 Network 调试发现请求的文件都是 dist/assets 中的文件 才去看是 npm run serve: vite previte 
所以我把 npm run serve 删了
