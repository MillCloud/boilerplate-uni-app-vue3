# boilerplate-uni-app-vue3

WIP

## 简介

`boilerplate-uni-app-vue3` 是一个面向中国用户的简单 `uni-app (vue3)` 模板，目标是帮助你快速开发小程序/移动端应用。当然，也希望能引导你更进一步地了解 `uni-app (vue3)` 生态。

如果你想要快速开发桌面端网页/移动端网页，请考虑使用 [boilerplate-vue3](https://github.com/MillCloud/boilerplate-vue3)。

`uni-app` 并不是一个尽善尽美的方案，在很多细节上还有待提高。如果你只是想要开发移动端应用，也可以考虑使用 [boilerplate-vue3](https://github.com/MillCloud/boilerplate-vue3)，加入 [cordova](https://cordova.apache.org/)、[native-script](https://nativescript.org/)、[ionic](https://ionicframework.com/) 或 [capacitor](https://capacitorjs.com/)。

该模板只支持 vue 3。vue 2 支持请查看 [boilerplate-uni-app-vue2](https://github.com/MillCloud/boilerplate-uni-app-vue2)。

### 主要依赖

- [vue3](https://v3.cn.vuejs.org/)
- [vite](https://cn.vitejs.dev/)
- [pinia](https://pinia.esm.dev/)
- [vue-use](https://vueuse.org)
- [typescript](https://www.typescriptlang.org/zh/)
- [vue-query](https://vue-query.vercel.app/)
- [statuses](https://github.com/jshttp/statuses)
- [tailwindcss](https://tailwindcss.com/)
- [@dcloudio/uni-ui](https://github.com/dcloudio/uni-ui)
- [thor-ui](https://thorui.cn/)
- [lodash](https://lodash.com/)
- [ramda](https://ramdajs.com/)
- [dayjs](https://dayjs.gitee.io/zh-CN/)
- [sass](https://sass-lang.com/)
- [@modyqyw/fabric](https://github.com/ModyQyW/fabric)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

请先阅读上面的文档，并确保对 `node` 和 `npm` 有 [基本了解](http://nodejs.cn/learn)。

## 起步

这部分说明将让你得到能在本地运行的项目副本以开始开发。有关如何部署项目，请阅读 [部署部分](#部署)。

### 准备

你可能需要使用梯子或手机 WiFi 完成准备步骤。

对于 macOS 用户，请按照以下指引操作。

```sh
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# 设置镜像，加快下载速度
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
# 安装 node@lts
nvm install --lts
# 使用 node@lts
nvm use --lts
# 设置默认版本
nvm alias default node
# 更新 npm
npm i -g npm --registry=https://registry.npmmirror.com
# 安装 homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 安装 git
brew install git
# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main

```

设置 `~/.huskyrc`。

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

```

对于 Windows 用户，请按照以下指引操作。

首先安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.8/nvm-setup.zip) 和 [Git](https://git-scm.com/downloads)。

然后使用 Windows Terminal 作为终端，Git Bash 作为 Shell，参考 [让 Win10 的终端更好用](https://sspai.com/post/63814) 和 [配置 Windows Terminal](https://sspai.com/post/62167)。

如果你正在使用 [Chocolatey](https://chocolatey.org/) 或 [Scoop](https://scoop.sh/)，你也可以通过命令安装，然后配置。

```sh
# 使用 Chocolatey
choco install nvm
choco install git

# 使用 Scoop
scoop install nvm
scoop install git

# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main
# 设置镜像，加快下载速度
nvm node_mirror https://npmmirror.com/mirrors/node
nvm npm_mirror https://npmmirror.com/mirrors/npm
# 安装 node@lts
nvm install lts
# 使用 node@lts
nvm use lts
# 更新 npm
npm i -g npm --registry=https://registry.npmmirror.com

```

你可能需要配置 `~/.huskyrc`。

其它系统请根据以上指引自行调整。

另外，你还需要安装最新的 [HBuilderX 正式版](https://www.dcloud.io/hbuilderx.html)，用于申请一个 appid（DCloud 应用标识，也可以在 [网页](https://dev.dcloud.net.cn/) 上申请），以及把项目运行到真机或模拟器上。

### 安装与运行

```sh
# clone 项目到本地
git clone git@github.com:MillCloud/boilerplate-uni-app-vue3.git
# git clone git@gitee.com:MillCloud/boilerplate-uni-app-vue3.git
# 进入项目
cd boilerplate-uni-app-vue3
# 安装依赖
npm install --legacy-peer-deps

```

运行到支付宝小程序时，除运行 `npm run dev:mp-alipay`，还需要运行 `npm run watch:mp-alipay` 以保证样式正确。

## 使用

### 目录结构

```sh
.
├── .github                     # github 配置目录
├── .husky                      # husky 配置目录
├── public
├── scripts
│   ├── patch-mp-alipay.mts     # 运行到支付宝小程序时的 patch
│   ├── update-manifest.mts     # 配置 release-it 自动更新 manifest.json 的文件
├── src
│   ├── components              # 全局组件目录
│   ├── composables             # 全局组合式 API 目录
│   ├── constants               # 固定数据目录
│   ├── helpers                 # 辅助方法目录
│   ├── pages                   # 页面视图目录
│   ├── static                  # 资产目录
│   ├── stores                  # 状态仓库目录
│   ├── styles                  # 全局样式和全局变量目录
│   ├── App.vue
│   ├── global.d.ts
│   ├── main.ts
│   └── shims-vue.d.ts
├── .commitlintrc.cjs           # commitlint 配置文件
├── .editorconfig
├── .eslintrc.cjs               # eslint 配置文件
├── .gitignore                  # git 配置文件
├── .lintstagedrc.cjs           # lint-staged 配置文件
├── .markdownlint.json          # markdownlint 配置文件
├── .npmrc                      # npm 配置文件
├── .prettierrc.cjs             # prettier 配置文件
├── .release-it.cjs             # release-it 配置文件
├── .stylelintrc.cjs            # stylelint 配置文件
├── components.d.ts             # 组件定义文件
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── renovate.json               # renovate 配置文件
└── tailwind.config.cjs         # tailwindcss 配置文件
├── tsconfig.json               # typescript 配置文件
└── vite.config.ts              # vite 配置文件
```

### VSCode 支持

你可以参考 [插件](https://modyqyw.top/summarize/environment/#%E6%8F%92%E4%BB%B6) 和 [settings.json](https://modyqyw.top/summarize/environment/#settings-json)。

### 路由

uni-app 使用 [pages.json](./src/pages.json) 配置路由，请查看 [文档](https://uniapp.dcloud.io/collocation/pages)。

### 状态

使用 [pinia](https://pinia.vuejs.org/) 作为状态管理工具。

### 请求

使用 [uni.request](https://uniapp.dcloud.io/api/request/request.html) 作为底层请求，使用 [vue-query](https://vue-query.vercel.app/) 管理底层请求。

查看 [@/helpers/request.ts](./src/helpers/request.ts) 了解预设配置。

如果不喜欢 vue-query，也可以自行配置 [swrv](https://github.com/Kong/swrv) 使用。

### 测试

WIP

- [vitest](https://vitest.dev/)
- [cypress](https://www.cypress.io/)
- [playwright](https://playwright.dev/)
- [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro/)

### 部署

- 确认所有环境变量和模式相关的地方已经配置完成，参考 [vite 文档 - 环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html) 和 [vite-plugin-env-compatible](https://github.com/IndexXuan/vite-plugin-env-compatible)。
- 运行 `npm run release`，更新版本号并上传 `dist` 目录下的内容。
- 更多自定义可以参考 `release-it` 文档说明，使用 `node` 运行脚本完成操作。
