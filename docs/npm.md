
# NPM

### Docker run npm registry [verdaccio](https://verdaccio.org/docs/docker) / 部署 verdaccio

```sh
docker run -itd --restart=always --name verdaccio \
  -p 4873:4873 \
  verdaccio/verdaccio

# or

V_PATH=/path/for/verdaccio; docker run -itd --restart=always --name verdaccio \
-p 4873:4873 \
-v $V_PATH/conf:/verdaccio/conf \
-v $V_PATH/storage:/verdaccio/storage \
-v $V_PATH/plugins:/verdaccio/plugins \
verdaccio/verdaccio
```

### npm add user // 添加 登录 用户

```sh
npm adduser --registry http://{npm-host}:4873/
```

### npm login // 登录

```sh
npm login --registry http://{npm-host}:4873/
```

### npm publish // 推送 npm package 到私有仓库

```sh
npm publish --registry http://{npm-host}:4873/
```

or add `.npmrc` file in your project // 或者 添加 `.npmrc` 到项目中, 然后运行 `npm publish`

```
# .npmrc
@{your-scope / 你的域}:registry=http://{npm-host}:4873/
```

and

```sh
npm publish
```

### npm `.npmignore` file

```
# .npmignore
node_modules/
.tgz
```