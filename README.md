# Cnode Client（App）

> 基于react-native技术栈所开发的cnode社区客户端

UI这一块是边开发边整理的，不好看别见怪，等有时间再花心思搞漂亮点。

## gif 效果图

![gif](https://github.com/Mrlyjoutlook/cnode-native/blob/master/doc/QQ20171022-213440.gif)

## Features

> native

- HTMLKit HTML的解析
- AsyncDisplayKit 渲染图文混排的页面

以上依赖库再结合原生封装的组件 `src/ios/HtmlRender` 组件来渲染html（感谢[bawn](https://github.com/bawn)作者提供的帮助）

> react-native 第三方库或组件

- react-native-htmlview
-	react-native-modalbox
- [react-native-scrollable-tab-view]() 滚动视图组件
- react-native-splash-screen
- [react-native-vector-icons]() icon
- [react-navigation](https://reactnavigation.org/docs/intro/) 页面管理和跳转
- react-native-spinkit

> react 技术栈

- react-redux
- redux
- redux-persist
- redux-persist-transform-immutable
- redux-saga
- redux-thunk

## Task list

> 近期要solve task

- [ ] 开发消息页面
- [ ] 优化帖子详情页面
- [ ] 完善列表下拉刷新，上拉加载功能
- [ ] 完成评论功能
- [ ] 国际化

## License

[MIT](https://github.com/Mrlyjoutlook/cnode-native/blob/master/LICENSE)
