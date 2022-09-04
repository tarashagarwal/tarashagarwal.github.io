---
title: 'Don’t depend on a Single Stack: Adopt “The Mixed Stack”'
date: 2022-01-01
permalink: /posts/2022/01/the-mixed-stack/
tags:
  - chef
  - opensource
  - mixedstack
---

Most of the software is open source today and companies managing the open-source code have a business model based on providing support to these products. Companies often open source a product to leverage the development support provided by the community and so that the software gets adapted by most of the small-scale technology businesses. This ultimately helps to increase the popularity of the product within the whole community and well as businesses. As the adoption of the software increases, more it gets tested, more bugs get reported, more bugs are fixed by the community and finally more the stable product gets evolved over time.

So open sourcing a software product can be very beneficial to the company. Also, they often manage to generate revenues by providing support for that product or by selling a different distribution of the same software with some additional features on the top. Open source does not necessarily mean that it is free to be used. Companies often add commercial license terms to their official distribution (binaries), and they do this companies increase the revenue once the software is well adopted. Buy it or leave it. The same thing happened when Chef Software, Inc decided to add licence terms to its premier product “chef” with its release version 15 back in 2019 ( https://www.chef.io/pricing/subscription-model-faq ). This is something that can severely affect any project’s business model or may even be a reason for its sunset especially if the business model is based on the product that is solely build upon that free software as the base component. There could be many solutions to reduce such a risk while designing a product with open-source software:

Factor in the licencing cost while setting up the economics of the product.
Developing a product using two different technologies/stacks.
Taking a fork of the existing open-source code have your own distribution and dedicated team for that technology.

1.  Factor in the licencing cost while setting up the economics of the product.
2.  Developing a product using two different technologies/stacks.
3.  Taking a fork of the existing open-source code have your own distribution and dedicated team for that technology.