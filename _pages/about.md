---
permalink: /
title: "Dont depend on a Single Stack: Adopt \"The Mixed Stack\""
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Most of the software is open source today and companies managing the open-source code have a business model based on providing support to these products. Companies often open source a product to leverage the development support provided by the community and so that the software gets adapted by most of the small-scale technology businesses. This ultimately helps to increase the popularity of the product within the whole community and well as businesses. As the adoption of the software increases, more it gets tested, more bugs get reported, more bugs are fixed by the community and finally more the stable product gets evolved over time.

So open sourcing a software product can be very beneficial to the company. Also, they often manage to generate revenues by providing support for that product or by selling a different distribution of the same software with some additional features on the top. Open source does not necessarily mean that it is free to be used. Companies often add commercial license terms to their official distribution (binaries), and they do this companies increase the revenue once the software is well adopted. Buy it or leave it. The same thing happened when Chef Software, Inc decided to add licence terms to its premier product “chef” with its release version 15 back in 2019 ( https://www.chef.io/pricing/subscription-model-faq ). This is something that can severely affect any project’s business model or may even be a reason for its sunset especially if the business model is based on the product that is solely build upon that free software as the base component.  There could be many solutions to reduce such a risk while designing a product with open-source software:

1.  Factor in the licencing cost while setting up the economics of the product.
2.  Developing a product using two different technologies/stacks.
3.  Taking a fork of the existing open-source code have your own distribution and dedicated team for that technology.


The Database Scaling Problem
======
The larger the data on a relational database becomes the slower the queries get. The b+tree has then best time complexity of log(n) and it could not be better than this. What to do when number of records i.e., 'n' in a table is very large. Though portioning and splitting of a table is one of the solutions. Implementing it is quite hard and many open-source app libraries that we use do not have a support of such a database managing technique. So, what is the best solution for scaling? Well for now truncating such records in the database is the quickest solution. Other solution can be using a hybrid approach of using Relation Database along side Non-relational databases depending upon the data being queried more frequently.

<!-- Getting started
======
1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this repository](https://github.com/academicpages/academicpages.github.io) by clicking the "fork" button in the top right. 
1. Go to the repository's settings (rightmost item in the tabs that start with "Code", should be below "Unwatch"). Rename the repository "[your GitHub username].github.io", which will also be your website's URL.
1. Set site-wide configuration and create content & metadata (see below -- also see [this set of diffs](http://archive.is/3TPas) showing what files were changed to set up [an example site](https://getorg-testacct.github.io) for a user with the username "getorg-testacct")
1. Upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.  
1. Check status by going to the repository settings, in the "GitHub pages" section -->

<!-- Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

I have also created [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual markdown files that will be properly formatted for the academicpages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the markdown files, then commit and push them to the GitHub repository.

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a markdown file for a talk
![Editing a markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring academicpages can be found in [the guide](https://academicpages.github.io/markdown/). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful. -->
