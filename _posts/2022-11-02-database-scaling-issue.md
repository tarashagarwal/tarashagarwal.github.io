---
title: 'There will be a database scaling issue soon'
date: 2022-11-02
permalink: /posts/2022/11/the-database-scaling-issue/
tags:
  - database
  - relational-database
  - data
---

The larger the data on a relational database becomes the slower the queries get. The b+tree has then best time complexity of log(n) and it could not be better than this. What to do when number of records i.e., 'n' in a table is very large. Though portioning and splitting of a table is one of the solutions. Implementing it is quite hard and many open-source app libraries that we use do not have a support of such a database managing technique. So, what is the best solution for scaling? Well for now truncating such records in the database is the quickest solution. Other solution can be using a hybrid approach of using Relation Database along side Non-relational databases depending upon the data being queried more frequently.