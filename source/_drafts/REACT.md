---
title: REACT
tags:
---

# 井字棋

## 环境准备

完成这篇教程有两种方式：

1. 可以直接在浏览器中编写代码
2. 也可以在你电脑上搭建本地开发环境

### 方式一：在浏览器中编写代码[^1]

[^1]: 不考虑

### 方式二：搭建本地环境

这是完全可选的，本教程不强制要求。

可选项：使用你喜欢的文本编辑器进行本地开发的步骤：

虽然在本地搭建环境要费一些时间，但是你可以选择自己喜欢的编辑器来完成开发。以下是具体步骤：

1. 确保你安装了较新版本的 `Nodejs`
2. 按照`Create React App`[安装指南](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app)创建一个新的项目

   ```js
   npx create-react-app my-app
   // 由此可见 得使用 npx 命令
   // 项目名称可以有 连字符 但是不能大写
   ```

3. 删除掉新项目`src/`文件夹下的所有文件

   ```bash
   注意：
   不要删除整个 src 文件夹
   删除里面的源文件
   我们会在接下来的步骤中使用示例代码替换原文件

   // 删除命令：
   cd hello-vue3
   cd src

   # 如果你使用 Mac 或 Linux：
   rm -f *

   # 如果你使用 Windows：
   del *

   # 然后回到项目文件夹
   cd ..
   ```

4. 在`src/`文件夹下创建一个名为`index.css`的文件，并拷贝这[些CSS代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0100)。

5. 在`src/`文件夹下创建一个名为`index.js`的文件，并拷贝[这些JS代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)

6. 拷贝以下三行代码到`src/`文件夹下的`index.js`文件的顶部：

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
```

现在，在项目文件夹下执行`npm start`命令，然后在浏览器访问`http://localhost:3000`。这样你就可以在浏览器中看见一个空的井字棋的棋盘了。

## 概览

你已经准备好了，让我们先大致了解一些 React 吧！

### React 是什么

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用React 将一些简短、独立的代码片段组合成复杂的UI界面，这些代码被称作组件。

React 中拥有多种不同类型的组件，我们先从`React.Component`的子类开始介绍：

```react

