---
title: Hook 概览
tags:
---

## Hook 概览

*Hook 是 React 16.8 的新特性。它可以让你在不编写class的情况下使用state以及其他的React特性。*

Hook 是向下兼容的本页面对有经验的 React 用户提供一个对 Hook 的概览。这是一个相当快速的概览，如果你有疑惑，可以参阅下面这样的黄色提示框。

**`详细说明: 有关我们为什么要在 React 中引入 Hook 的原因,请参考动机。`**

### State Hook

这个例子用来显示一个计数器。当你点击按钮，计数器的值就会增减：

```js
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

在这里, *useState* 就是一个 *Hook* (等下我们会讲到这是什么意思)。通过在函数组件中调用它来给组件添加一些内部 state 。**React 会在重复渲染时保留这个 state**。*useState* 会返回**一对值**:*当前状态和一个让你更新它的函数*,你可以在事件处理函数中,或其它一些地方调用这个函数。他类似 class 组建的 `this.setState`,但是它不会把新的 state 和旧的 state 进行合并。(我们会使用 State Hook 里展示一个对比 `useState`和`this.state`的例子)。

**useState 唯一的参数就是初始 state。**在上面的例子中,我们的计数器时从零开始的,所以初始 state 就是 0 。**值得注意的是：不同于`this.state`,这里的 state 不一定要是一个对象————如果你需要，他也可以是。这个初始 state 参数只有在第一次渲染时会被用到。**

#### 声明多个 state 变量

你可以在一个组件中多次使用 State Hook:

```js
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

数组结构的语法让我们再调用 `useState`时可以给state变量取不同的名字。当然，这些名字并不是 useState API 的一部分。React 假设当你多次调用 useState 的时候，你能保证每次渲染时他们的调用顺序是不变的。后面我们会再次解释它是如何工作的以及在什么场景下使用。

#### 那么，什么是 Hook ？

Hook 是一些可以让你在函数组件里 “钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用————这使得你不适用 class 也能使用 React 。（我们不推荐你把已有的组件全部重写，但是你可以在新组件中开始使用 Hook。）

React 内置了一些像 `useState` 这样的Hook。你也可以创建你自己的 Hook 来复用不同组件之间的状态逻辑。我们会先介绍这些内置的 Hook。

### Effect Hook
