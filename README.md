# 岁岁记隐私政策网页

这是与当前 Android App 行为一致的静态隐私政策页，用于在应用商店提交时提供公开 HTTPS 链接。它已包含可直接用于独立 GitHub 仓库的 GitHub Pages 自动部署工作流。

## 上线前填写资料

1. 在本目录执行 `Copy-Item site-config.example.js site-config.js`。
2. 编辑 `site-config.js`，填入与华为开发者认证一致的运营者姓名或名称、长期可用的客服邮箱、APP 备案号。
3. 浏览器直接打开 `index.html` 检查内容；配置完成后，页面不会再显示黄色的“上线前请完成资料配置”提示。
4. 若使用阿里云 OSS，将本目录中的 `index.html`、`styles.css`、`policy.js` 和 `site-config.js` 上传到静态网站目录，并绑定 HTTPS 域名。
5. 将最终地址填入 `mobile/release.properties` 的 `PRIVACY_POLICY_URL`，再构建正式包。

`site-config.js` 已被 Git 忽略，避免将个人姓名、邮箱和备案号提交到代码仓库；不要把示例配置或含占位文字的版本部署到公开网址。

## 本地预览

在本目录双击 `index.html` 即可预览。页面不依赖网络、框架或第三方脚本。

## GitHub Pages 自动部署

将 **本目录的内容** 单独推送至一个新的 GitHub 仓库的 `main` 分支。进入仓库的 **Settings → Pages**，在 Source 中选择 **GitHub Actions**。然后在 **Settings → Secrets and variables → Actions → Variables** 新建以下三个变量：

- `OPERATOR_NAME`：与华为开发者认证一致的运营者姓名或名称
- `SUPPORT_EMAIL`：长期可用的客服邮箱
- `APP_FILING_NUMBER`：APP 备案号

工作流会在每次推送 `main` 时生成最终的 `site-config.js` 并部署。三个变量缺任意一个时，构建会失败而不会公开包含占位资料的页面。部署成功后，将 GitHub Pages 地址填入 `mobile/release.properties` 的 `PRIVACY_POLICY_URL`。
