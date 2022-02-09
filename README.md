
# mui form render

基于 [x-render](https://x-render.gitee.io/) 的 [mui](https://mui.com/getting-started/usage/) 动态表单

[部署私有 npm 仓库](./docs/npm.md)

### Install

```sh
yarn global add lerna
lerna bootstrap --force-local
```

### Dev

```sh
# 编译动态表单
cd packages/form-render
yarn dev
# 编译表单生成器
cd packages/fr-generator
yarn build
# 启动调试
cd packages/emalutor
yarn start
```

### Build

```sh
# 表单生成器编译并推送到 npm 仓库
cd packages/fr-generator
yarn build && yarn publish
```

### Docker

```sh
# 构建
make build
# 运行
make run
```