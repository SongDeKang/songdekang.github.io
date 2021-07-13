---
title: React hook
date: 2021-07-12 22:03:20
tags:
---

## HOOK 简介

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

```js
import React,{ useState } from 'react';

function Example(){
 // 声明一个叫做 count 的 state 变量
 const [count, setCount] = useState(0)

 return (
  <div>
    <p>You clicked {count} times</p> 
    <button onClick={()=>setCount(count+1)}>
      Click me
    </button>
  </div>
 )
}
```

`useState` 是我们要学习的第一个"Hook",这个例子是简单的演示，如果不理解也不用担心。

**你将在下一章正式开始学习 Hook**。这一章节，我们将会解释为什么会在 React 中加入 Hook，以及如何使用Hook写出更好的应用。

**`React 16.8.0 是第一个支持 Hook 的版本。升级时，请注意更新所有的 package，包括 ReactDOM 。 ReactNative 从 0.59 版本开始支持 Hook 。`**

### 没有破坏性的改动

在我们继续之前，请记住 Hook 是：

- **完全可选的**。你无须重写任何已有的代码就可以在一些组件中尝试 Hook 。但是如果你不想，你不必现在就去学习或使用 Hook。
- **100%向后兼容**。Hook 不包含任何破坏性改动
- **现在可用**。Hook 已发布于 v16.8.0

**没有计划从 React 中移除 class**。你可以在本页底部的章节读到更多关于 Hook 的渐进策略。

**Hook 不会影响你对 React 概念的理解。**恰恰相反，Hook为已知的 React 概念提供了更直接的 API：props，state，context，refs以及生命周期。稍后我们将看到，Hook还提供了一种更强大的方式来组合他们。

**如果你不想了解添加 Hook 的具体原因，可以直接跳到下一章节开始学习 Hook！**当然你也可以继续阅读这一章节来了解原因，并且可以学习到如何不重写应用的情况下使用 Hook。

### 动机

Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正在学习 React，或每天使用，或者更愿意尝试另一个和 React 有相似组件模型的框架，你都可能对这些问题似曾相识。

### 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为"附加”到组件的途径（**例如：把组件连接到 store**）。如果你是用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 `render props`和`高阶组件`。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题：**React 需要为共享状态逻辑提供更好的原生途径**。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑**。这使得在组件间或社区内共享 Hook 变得很便捷。

具体将在自定义 Hook 中对此展开更多的讨论。

### 复杂组件变得难以理解

我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件经常在 `componentDidMount` 和 `componentDidUpdate`中获取数据。但是，同一个`componentDidMount`中可能也包含很多其它的逻辑，如设置事件监听，而之后需在`componentWillUnmount`中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug ，并且导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组建的内部状态，使其更加可预测。

我们将在使用`EffectHook`中对此展开更多的讨论

### 难以理解的 class

除了代码复用和代码管理会遇到困难外,我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 this 的工作方式，这与其他语言存在巨大的差异。还不能忘记绑定事件处理器。没有稳定的语法提案，这些代码非常冗余。大家可以很好地理解 props，state 和自顶向下的数据流，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景。

另外，React 已经发布五年了，我们希望他能在下一个五年也与时俱进。就像 Svelte,Angular,Glimmer等其它库展示的那样,组件预编译会带来巨大的潜力。尤其是在它不局限于模板的时候。最近，我们一直在使用 Prepack 来试验 component folding，也取得了初步成效。但是我们发现使用 class 组件会无意中鼓励开发者使用一些让优化措施无效的方案。class 也给目前的工具带来了一些问题。例如，class 不能含好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。

为了解决这些问题，**Hook使你在非 class 的情况下可以使用更多的 React 特性**从概念上来讲,React 组件一直更像是函数。而 Hook 则拥抱了函数,同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式的编程技术。

### 监禁策略

**`总结: 没有计划从 React 中移除 class`**

大部分 React 开发者会专注于开发产品,而没时间关注每一个新 API 的发布。Hook 还很新，也许有更多的示例和教程后，再考虑学习或使用它们也不迟。

我们也明白向 React 添加新的原生概念的门槛非常高。我们为好奇的读者准备了详细的征求意见文档，在文档中用更多细节深入讨论了我们推进这件事的冬季，也在具体设计决策和相关先进技术上提供了额外的视角。

**最重要的是，Hook和现有代码可以同时工作，你可以渐进式地使用他们。**不用急着迁移到Hook。我们建议避免任何"大规模重写",尤其是对于现有的、复杂的 class 组件。开始“用 Hook 的方式思考”前，需要做一些思维上的转变。按照我们的经验，最好现在新的不复杂的组件中尝试使用 Hook，并确保团队中的每一位成员都能适应。在你尝试使用Hook后，欢迎给我们提供反馈，无论好坏。

我们准备让 Hook 覆盖所有 class 组件的使用场景，但是我们将继续为class 组件提供支持。在Facebook，我们有成千上万的组件用 class 书写，我们完全没有重写他们的计划。相反，我们开始在新的代码中同时使用 Hook 和 class 。