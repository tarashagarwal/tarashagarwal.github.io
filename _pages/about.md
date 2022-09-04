---
permalink: /
title: "What I have learned till now about software development"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

In the new age of software development that has been inspired by the Agile Manifesto, there is no time to complain about the continuous changing requirements and priorities during a software iteration. Clients are dumb (not literally!) and have no idea about the software development process. Their aim is to annoy the Devs. This should be accepted, and the Devs should be ready for any challenges tossed by the clients at them. Tools and systems to solve the clients might not be available and might fail anytime. The Dev is the person who despite all these challenges can deliver something useful to the client and is able to continuously press onwards to meet the client requirements which are continuously changing, and these requirements are never met. There are infinite number of bugs in the code, if you could not find any you are not searching hard enough.

Other things that should be assumed:
*  Your code has a bug that has not been discovered yet.
*  You code can fail at any stage, don’t assume that if it works on dev, test, or pre-prod that it will certainly work on production. 
*  Don’t assume that if it is working now, it will work a day, hour or minute later. 
*  Client has got it all wrong, it is just the matter of time that they issue the change in requirement. 
*  What you have planned is of no use, you will have to take a U-turn in the planning process and that also at the last moment.
*  Your code will fail at the last moment, just before the final build; it is okay…. relax.
*  You code will never be perfect, perfect code never exists; all software systems are having a trade-off of one or more parameters.
*  Developers are highly ignorant, extremely lazy, and noxiously crazy; they will do the minimal work to complete the requirement as soon as possible. If you think they will do that, no they won’t and if you think they won’t do that, they certainly will. 
*  Dev’s work using the principal of hit and trial because “using brain” goes against the principle of being lazy.  
* Test team thinks that Devs have probably taken care of all bugs and Devs think that Test team will certainly report all the bugs in the code IF ANY. 
* Manager wants everything done by Monday.



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
