# Memory Cube · 作品贴图版

纯静态网页，无需安装依赖，无外部字体、图片服务或框架。可以直接打开 index.html，或用静态服务器预览。

## 互动

- 单击画面任意位置：旋转一次，平滑过渡。每两次会增加一次纵向转动，让上下表面也能出现。
- 在同一位置附近 340 毫秒内双击：放大至 1.4 倍；再次双击还原。这次双击不会触发旋转。单击因此有约 340 毫秒等待时间。
- 手机使用单点、双点。拖动不会旋转。
- 键盘：Tab 聚焦画面，空格或方向键旋转，Enter 切换放大，Escape 还原。
- 跟随系统的减少动态效果偏好。

## 替换五张贴图

| 面 | 当前文件 |
| --- | --- |
| 正面 | assets/front.jpg |
| 背面 | assets/back.jpg |
| 右面 | assets/right.jpg |
| 顶面 | assets/top.jpg |
| 底面 | assets/bottom.jpg |
| 左面 | 纯白，不使用贴图 |

把自己的 JPG、PNG 或 WebP 图片放进 assets，再修改 index.html 对应 img 的 src（例如 ./assets/front.jpg），同时更新 alt。五张图完全独立。建议正方形 1600–2048 像素；非正方形默认居中裁切。留白为不透明纯白面，并非透明开口。

尺寸、初始角度、动画速度、放大倍率分别在 style.css 的 --size、#cube、transition、#stage.enlarged 中调整。若改初始角度，也要同步 app.js 中的 x、y 及 rotateZ。

## 本地预览

在本文件所在目录运行：

```sh
python3 -m http.server 8000
```

浏览器访问 http://localhost:8000 。直接双击 index.html 也可以运行。

## GitHub Pages

1. 新建 GitHub 仓库，把本目录里的所有文件上传到仓库根目录，保留 assets 文件夹。
2. 仓库 Settings → Pages → Build and deployment，选择 Deploy from a branch。
3. 选择 main 分支、/(root)，保存，等待 GitHub 给出网站地址。

所有资源都使用相对路径，兼容仓库子路径。无需构建步骤，不要只上传 index.html。

当前贴图对应：正面 IMG_1015、背面 IMG_1016、右面 IMG_1018、顶面 IMG_1019、底面 IMG_1020。保留原始 JPG，不加滤镜、不裁切正方形画面。
