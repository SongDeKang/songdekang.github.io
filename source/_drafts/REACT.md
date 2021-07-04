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

4. 在`src/`文件夹下创建一个名为`index.css`的文件，并拷贝这[些 CSS 代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0100)。

5. 在`src/`文件夹下创建一个名为`index.js`的文件，并拷贝[这些 JS 代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)

6. 拷贝以下三行代码到`src/`文件夹下的`index.js`文件的顶部：

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
```

现在，在项目文件夹下执行`npm start`命令，然后在浏览器访问`http://localhost:3000`。这样你就可以在浏览器中看见一个空的井字棋的棋盘了。

## 概览

你已经准备好了，让我们先大致了解一些 React 吧！

### React 是什么

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码被称作组件。

React 中拥有多种不同类型的组件，我们先从`React.Component`的子类开始介绍：

```js
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li> Instagram </li>
          <li> WhatsApp </li>
          <li> Oculus </li>
        </ul>
      </div>
    );
  }
}
// 用法示例： <ShoppingList name="mark">
```

我们马上会谈论这些又奇怪、又像 XML 的标签。我们通过使用组件来告诉 React 我们希望在屏幕上看到什么。当数据发生改变时，React 会高效地更新并重新渲染我们的组件。

其中，ShoppingList 是一个 React 组件累，或者说是一个 React 组件类型。一个组件接收一些参数，我们把这些参数叫做 props （“props”是“property”简写），然后通过 render 方法返回需要展示在屏幕上的视图层次结构。

render 方法的返回值 _描述了_ 你希望在屏幕上看到的内容。 React 根据描述，把结果展示出来。更具体地来说，render 返回了一个 React 元素，这是一种对渲染内容的 **轻量级** 描述。大多数的 React 开发者使用一种名为 "JSX" 的特殊语法，JSX 可以让你更轻松的书写这些结构。语法`<div/>`会被编译成 `React.createElement('div')`。上述的代码等同于：

```js
return React.createElement('div',{className:'shopping-list'},
   React.createElement('h1',/* ... h1 children ... */),
   React.createElement('ul',/* ... ul children ... */)
),
```

如果你对这个比较感兴趣，可以查阅 API 文档了解有关`createElemnt()`更详细的用法。但是接下来的教程中，我们并不会直接使用这个方法，而是继续使用 **JSX**。

在 JSX 中你可以任意使用 **JavaScript 表达式**，只需要用一个大括号括起来。

每一个 React 元素 事实上都是一个 _JavaScript 对象_，你可以在你的程序里把它保存在变量中或者作为参数传递。

前文中的 `ShoppingList` 组件只会渲染一些内置的 DOM 组件（是说标签元素吧）,如`<div />、<li />`等。但是你也可以组合和渲染自定义的 React 组件。例如，你可以通过 `<ShoppingList />`来表示整个购物清单组件。每个组件都是封装好的，并且可以单独运行，这样你就可以通过简单的组件来构建复杂的 UI 界面。

### 阅读初始代码

如果你要在 **浏览器** 中学习该教程，在新标签页中打开初始代码。
如果你要在本地环境中学已开发该教程的内容，就在你的工程文件夹下打开 `src/index.js`（你已经在前面的环境准备中创建过这个文件了） <!-- Yes I remember -->

这些初始代码，是我们要开发小游戏的基础代码。我们已经提供了 CSS 样式，这样你只需要关注使用 React 来开发这个井字棋了。

通过阅读代码，你开一看到我们又三个 React 组件：

- Square
- Board
- Game

Square 组件渲染了含有默认值的一个棋盘，我们一会会修改这些默认值。到目前为止还没有可以交互的组件。

### 通过 Props 传递数据

让我们试试水，尝试将数据从 Board 组件传递到 Square 组件中。

我们强烈建议你手动编写本教程中的代码，不要使用 _复制/粘贴_ 。这将加深你对 React 的记忆和理解。

在 Board 组件中的 `renderSquare` 方法中，我们将代码改写成下面这样，**传递一个名为`value`的`prop`到`Square`组件当中**：

```js
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
    // 封装成 函数 应该就是方便【传参】调用
    // 也简化了书写，要不然使用到的每个【Square】组件都要写【value】属性了
  }
}
```

修改 Square 组建中的 render 方法，把 `l{/* TODO */}`，以显示上文传入的值：

```js
class Square extends React.Component {
  render() {
    return <button className="Square">{this.props.value}</button>;
  }
}
```

恭喜你！你刚刚成功地把一个 prop 从父组件 Board **传递** 给了子组件 Square 。在 React 应用中，数据通过 props 的传递，从父组件流向子组件。

### 给组件添加交互功能

接下来我们试着让期盼的每一个格子在点击之后能落下一颗 "X" ,作为棋子。首先，我们把 Square 组件中的 render() 方法的返回值中 button 标签修改为如下内容：

```js
class Square extends React.Component {
  render() {
    return (
      <button className="Square" onClick={() => alert("click")}>
        {this.porps.value}
      </button>
    );
  }
}
```

如果此刻点击某个格子，浏览器就会弹出提示框。

`注意: 为了减少代码量，同时避免*[this]造成的困扰，我们在这里使用 [箭头函数] 来进行事件处理。`
`注意：此处使用了*onClick={()=>alert("click")}*的方式向*onClick*这个*prop*传入一个函数。 React 将在单机时调用此函数。但很多人经常忘记编写 ()=> ,而写成 onClick = {alert("click")},这种常见的错误会导致每次这个组件渲染的时候都会出发弹出框`

接下来，我们希望 Square 可以 “记住” 他被点击过，然后用 “X" 来填充对应的方格。我们用 state 来实现所谓的 “记忆” 功能。

可以通过在 React 组建的构造函数中设置 this.state 来初始化 state。 this.state 应该被是为一个组建的私有属性。我们在`this.state`中储存当前每个方格（Square）的值，并且在每次方格被点击时改变这个值。

首先，我们向这个 class 中添加一个构造函数，用来初始化 state：

```js
class Square extends React.Component{
   constructor(props){
      super(props)

      this.state = {
         value:null,
      }
   }

   render(){
      return (
         <button className="square" onClick={() => alert('click')}>
            {this.props.value}
         </button>
         );
      }
   }
}
```

`注意：在JavaScript中，每次你定义其子类的构造函数时，都需要调用 super 方法。因此，在所有含有构造函数的 React 组件中，**构造函数必须以super(props)开头**。`<!--这件事我一直想知道原因-->

现在，我们来修改一下 Square 组件的 render 方法，这样，每当方格被点击的时候，就可以显示当前 state 的值了：

- 在`button`标签中，把`this.props.value`替换为 `this.state.value`
- 将`onClick={...}`事件监听函数替换为`onClick={()=>this.setState({value:"X"})}`。
- 为了更好的可读性，将`className`和`onClick`的 prop 分两行书写。

修改之后，Square 组件中的 render 方法的返回值中的 button 标签变成了下面这样：

```js
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="Square" onClick={() => this.setState({ value: "X" })}>
        {this.state.value}
      </button>
    );
  }
}
```

在 Square 组件 render 方法中 onClick 事件监听函数中调用 this.setState ,我们就可以在每次 `<button>`被点击的时候通知 React 去重新渲染 Square 组件。组件更新之后，Square 组件的 this.state.value 的值会变为 “X”，因此，我们在游戏棋盘上就能看见 X 了。点击任意一个方格， X 就会出现。

每次在组件中调用 `setState` 时，React 都会自动更新其子组件。

### 开发者工具

在 Chrome 或者 Firefox 中安装扩展 `React Devtools`可以让你在浏览器开发工具中查看 React 组件树。

你还可以在 React Devtools 中检查 React 组件的 state 和 props 。

安装 React Devtools 之后，右键点击页面的任何一个元素，然后选择**查看**，这样就能打开浏览器的开发者工具了，并且工具栏最后会多展示一个 React 的选项卡（包含 `components`和`profiler`）。你可以使用 _components_ 来检查组件树。

### 游戏完善

我们现在已经编写好了，游戏中最基础的可以落子的棋盘。为了开发一个完整的游戏，**我们还需要交替在棋盘上放置“X”和“O”，并且判断出胜者**

### 状态提升

当前，每个 Square 组件都维护了游戏的状态。我们可以把所有 9 个 Square 放在一个地方，这样我们就可以判断出胜者了。

你可能回想，我们也可以在棋盘 Board 组件中收集每个格子 Square 组件中的 state。虽然技术上来讲是可以实现的，但是代码如此编写会让人很难理解，并且我们以后想要维护重构时也会非常困难。

所以，最好的解决方式是直接将所有的 **state** 状态数据存储在 Board 父组件当中。之后 Board 组件可以将这些数据通过 props 传递给各个 Square 子组件，正如上文：我们把数字传递给每个 Square 一样。

**`当你需要同时获取多个子组件的数据，或者两个组件之间需要相互通讯的情况下，需要把自组建的 state 提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有的组件状态数据就能够方便的同步共享了`**

像这种将组件 state 提升到父组件的情形在重构 React 组件时经常会遇到————借此我们来实践一下。

为 Board 组件添加构造函数，将 Board 组件的初始状态设置为长度为 9 的空值数组：

```js
// 唉！。。。
// 到这我可以理解：分别获取每个子组件的状态就算可实现也是不切实际。所以通过父组件统一控制状态并分发给子组件确实是很好的选择。
// 但是我是真的没想到父组件要，设定什么样的状态数据结构，也完全想不到怎么去实现
class Board extends React.Component{
   constructor(props){
      super(props)
      this.state={
         squares=Array(9).fill(null)
         // 高级，这数组操作我是没掌握
      }
   }

   renderSquare(i){
      return <Square value={i}>
   }
}
```

当我们填充棋盘后，`this.state.squares`数组的值可能如下所示：

```js
["O", null, "X", "X", "X", "O", "O", null, null];
// 本来还在想数组怎么会呈现这样的结构呢
// 原来就是三个一换行啊
```

开始时，我们依次把 0 到 8 的值通过 prop 从 Board 向下传递，从而让他们显示出来。上一步与此不同，我们根据 Square 自己内部的 state， 使用了 “X” 来代替之前的数字。因此，Square 忽略了从 Board 传递给它的那个 `value` prop。

让我们再一次使用 prop 的传递机制。我们通过修改 Board 来指示每一个 Square 的当前值（“X”，“O",或者 null）。我们在 Board 的构造函数中已经定义好了 squares 数组，这样，我们就可以通过修改 Board 的 renderSquare 方法来读取这些值了。

```js
renderSquare(i){
   return <Square value={this.state.squares[i]}>
   // 我是真没想到，之前每个穿的数组干什么用，做个标识看看么
   // 没想到能直接拿到这当 数组 索引 绝了
   // 还有就是，本来点击显示 X ，之后不是该讲显示 O 了么？
   // 怎么就岔开将状态提升了，原来之前显示 X 只是个示例
   // 真实优化修改还没讲到啊
}
```

这样，每个 Square 就都能结束到一个 `value` prop 了，这个 prop 的值可以是 "X"、"O"或 null（null 代表空方格）。

接下来，我们要修改一下 Square 的点击事件监听函数。Board 组件当前维护了那些已经被填充了的方格。**我们需要想办法让 Square 去更新 Board 的 state**。由于 state 对于每个组件来说是私有的，因此我们不能直接通过 Square 来更新 Board 的 state 。

相反，**从 Board 组件向 Square 组件传递一个函数，当 Square 被点击的时候，这个函数就会被调用。**接着，我们将 Board 组件的 renderSquare 方法改写为如下效果：

```js
renderSquare(i){
   return(
      <Square
         value={this.state.squares[i]}
         onClick={()=>this.handleClick(i)}
      />
   )
}
```

**`注意：为了提到可读性，我们把返回的 React 元素拆分成了多行。同时在最外层加了小括号，这样 JavaScript 解析的时候就不会咋 return 的后面自动插入一个分号，从而破坏代码结构了`**

现在我们从 Board 组件向 Square 组件中传递了两个 porps 参数 value 和 onClick 。onClick prop是一个 Square 组件点击事件监听函数。接下来，我们需要修改 Square 的代码：

- 将 Square 组件的 render 方法中的 this.state.value 替换为 this.props.value

- 将 Square 组件的 render 方法中的 this.setState() 替换为 `this.props.onClick()`
  <!-- 我真是没想到 这个属性还真的要在子组件里面重新调用一下 我是真懵 -->
  <!-- 我还以为子组件里面点击事件都不需要了 -->
  <!-- 还是 too young 啊 -->
- 删除 Square 组件中的构造函数 constructor ，该组件不需要再保存游戏的 state

进行上述修改之后，代码会变成下面这样：

```js
class Square extends React.Component{
  render(){
    return (
      <button 
        className="Square"
        onClick={()=>this.props.onClick()}
      >
        {this.props.value}
      </button>
    )
  }
}
```

每一个 Square 被点击时，Board 提供的 onClick 函数就会触发。我们回顾一下这是怎么实现的：

1. 向 DOM 元素 button **添加 onClick prop ，让 React 开启对点击事件的监听。**
2. 当 button 被点击时， React 会调用 Square 组件的 render() 方法中 onClick 事件处理函数
3. 事件处理函数触发了传入其中的 `this.props.onClick()` 方法。这个方法是由 Board 组件传递给 Square 的。
4. 由于 Board 把 `onClick={()=>this.handleClick(i)}` 传递给了 Square ，所以当 Square 中的事件处理函数触发时，其实就是出发的 Board 当中的 this.handleClick(i) 方法。
5. 我们还未定义 handleClick 方法，所以代码还不能正常工作。如果此时点击 Square ，你会在屏幕上看到红色的错误提示，提示内容为： " this.handleClick is not a function "。
  
**`注意：因为 DOM 元素 <button/> 是一个内置组件[ 哦哦懂了，我一直以为该说时html元素的，原来这是指 react 内置组件啊 ]`**
