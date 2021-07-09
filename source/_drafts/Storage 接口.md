---
title: Storage 接口
tags:
---

- [概述](#概述)
- [属性和方法](#属性和方法)
	- [Storage.setItem()](#storagesetitem)
	- [Storage.getItem()](#storagegetitem)
	- [Storage.removeItem()](#storageremoveitem)
	- [Storage.clear()](#storageclear)
	- [Storage.key()](#storagekey)
- [storage 事件](#storage-事件)

## 概述

Storage 接口用于脚本再浏览器保存数据。两个对象部署了这个接口：`window.sessionStorage`和`window.localStorage`。

`sessionStorage` 保存的数据用于浏览器的一次会话(session)，当会话结束（通常是窗口关闭），数据被清空；`localStorage`保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。出了保存期限的长短不同，这两个对象的其他方面都一致。

保存的数据都已 **键值对** 的形式存在。也就是说，每一项数据都有一个键名和对应的键值。所有的数据都以 **文本格式** 保存。

这个接口很像 `Cookie` 的强化版，能够使用大得多的存储空间。目前，每个域名的存储上限视浏览器而定

## 属性和方法

### Storage.setItem()

### Storage.getItem()

### Storage.removeItem()

### Storage.clear()

### Storage.key()

## storage 事件
