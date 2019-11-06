'use strict';

const titleClickHandler = function(event) {
  event.preventDefault();
  //console.log('Link was clicked!');
  //console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  const clickedElement = this;
  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);
  //console.log('clickedElement (with plus): ' + clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  //console.log('articleSelector:', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log('targetArticle:', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optArticleTagSelector = '.post-tags a',
  optArticleAuthorSelectorLink = '.post-author a',
  optTagsListSelector = '.list.tags a',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optAuthorsListSelector = '.list.authors a',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){
  /* [DONE]  remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  //console.log('optTitleListSelector():', optTitleListSelector);

  /* [DONE]  for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles) {
    //console.log('optArticleSelector():', optArticleSelector);
    //console.log('customSelector():', customSelector);

    /* [DONE] get the article id */
    const articleId = article.getAttribute("id");
    //console.log('articleId():', articleId);

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log('articleTitle:', articleTitle);

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li> ';
    //console.log('linkHTML:', linkHTML);

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
    //console.log('html:', html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log('links:', links);

  for(let link of links) {
    link.addEventListener('click', titleClickHandler);
    //console.log('link:', link);
  }
}
generateTitleLinks();

  /* [NEW] Create new variable - params with max and min values */
function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  }
  for(let tag in tags){
    //console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
      //console.log('params.max:', params.max);
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
      //console.log('params.min:', params.min);
    }
  }
  return params;
}

function calculateTagClass(count, params){
  //console.log('calculateTagClass:', calculateTagClass, 'count:' ,count, 'params:', params);
  const normalizedCount = count - params.min;
  //console.log('normalizedCount:', normalizedCount);
  const normalizedMax = params.max - params.min;
  //console.log('normalizedMax:', normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  //console.log('percentage:', percentage);
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  //console.log('classNumber:', classNumber);
  return classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  //let allTags = [];
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('articles:', articles);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles) {
    //console.log('article:', article);

    /* [DONE] find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    //console.log('titleListallTagsHTML:', titleList);

    /* [DONE] make html variable with empty string */
    let html = '';
    //console.log('html:', html);

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    //console.log('articleTags:', articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log('articleTagsArray:', articleTagsArray);

    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      //console.log('tag:', tag);

      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      //console.log('linkHTML:', linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      //console.log('html:', html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
        //console.log('allTags:', allTags);
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  //console.log('tagList:', tagList);

  const tagsParams = calculateTagsParams(allTags);
  //console.log ('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML ='';

  /* [NEW] START LOOP: for each in allTags: */
  for(let tag in allTags) {
    const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) +'" href="#tag-' + tag + '">' + tag + '</a> (' + allTags[tag] + ')</li>' + ' ';
    //console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;
    //console.log('allTagsHTML:', allTagsHTML);

    /* [NEW] STOP LOOP: for each in allTags: */
  }
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  //console.log('allTags:', allTags);
}
generateTags();

function tagClickHandler(event){
  //console.log('tagClickHandler:', tagClickHandler);

  /* [DONE]  prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('clickedElement:', clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  //console.log('href:', href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log('tag:', tag);

  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log('activeTags:', activeTags);

  /* [DONE] START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* [DONE] remove class active */
    activeTag.classList.remove('active');
    //console.log('activeTag:', activeTag);

    /* END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
  //console.log('tagLinks:', tagLinks);

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    //console.log('tagLink:', tagLink);

    /* [DONE] add class active */
    tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagSelector + ',' + optTagsListSelector);
  //console.log('tagLinks:', tagLinks)

  /* [DONE] START LOOP: for each link */
  for (let tag of tagLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

     /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();


function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999
  }
  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');

    if (authors[author] > params.max) {
      params.max = authors[author];
      //console.log('params.max:', params.max);
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
      //console.log('params.min:', params.min);
    }
  }
  return params;
}

function calculateAuthorClass(count, params){
  //console.log('calculateAuthorsClass:', calculateAuthorsClass, 'count:' ,count, 'params:', params);
  const normalizedCount = count - params.min;
  //console.log('normalizedCount:', normalizedCount);
  const normalizedMax = params.max - params.min;
  //console.log('normalizedMax:', normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  //console.log('percentage:', percentage);
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  //console.log('classNumber:', classNumber);
  return classNumber;
}

function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};

  /* [DONE] find all articles */
  const authorArticles = document.querySelectorAll(optArticleSelector);
  //console.log('authorArticles:', authorArticles);

  /* [DONE] START LOOP: for every author */
  for(let authorArticle of authorArticles) {
    //console.log('authorArticle:', authorArticle);

    /* [DONE] find authors wrapper */
    const authorList = authorArticle.querySelector(optArticleAuthorSelector);
    //console.log('authorList:', authorList);

    /* [DONE] make html variable with empty string */
    let html = '';
    //console.log('html:', html);

    /* [DONE] get tags from data-authors attribute */
    const articleAuthor = authorArticle.getAttribute("data-authors");
    //console.log('articleAuthor:', articleAuthor);

    /* [DONE] generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>' + ' ';
    //console.log('linkHTML:', linkHTML);

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    //console.log('html:', html);

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorList.innerHTML = html;
    //console.log('authorList:', authorList);

    /* [DONE] END LOOP: for every author: */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.authors');
  //console.log('authorList:', authorList);

  const authorParams = calculateAuthorsParams(allAuthors);
  //console.log ('authorParams:', authorParams);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML ='';

  /* [NEW] START LOOP: for each in allAuthors: */
  for (let articleAuthor in allAuthors) {
    /* [NEW] Generate code of a link and it to allAuthorsHTML */
    const authorLinkHTML = '<li><a class ="tag-size-' + calculateAuthorClass(allAuthors[articleAuthor], authorParams) + '" href="#author-' + articleAuthor + '">' + articleAuthor + '</a>(' + allAuthors[articleAuthor] + ')</li>' + ' ';
    //console.log('allAuthors[articleAuthor]:', allAuthors[articleAuthor], authorParams);

    allAuthorsHTML += authorLinkHTML;
    //console.log('allAuthorsHTML:', allAuthorsHTML);

    /* [NEW] STOP LOOP: for each in allAuthors: */
  }
  /* [NEW] add html from allTags to tagList */
  authorList.innerHTML = allAuthorsHTML;
  //console.log('authorList:', authorList);
}
generateAuthors();

function authorClickHandler(event){
  //console.log('authorClickHandler:', authorClickHandler);

  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('clickedElement:', clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  //console.log('href:', href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  //console.log('author:', author);

  /* [DONE] find all authors links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log('activeAuthors:', activeAuthors);

  /* [DONE] START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {

    /* [DONE] remove class active */
    activeAuthor.classList.remove('active');
    //console.log('activeAuthor:', activeAuthor);

  /* [DONE] END LOOP: for each active author link */
  }

  /* [DONE] find all authors links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
  //console.log('authorLinks:', authorLinks);

  /* [DONE] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    //console.log('authorLink:', authorLink);

    /* [DONE] add class active */
    authorLink.classList.add('active');

  /* [DONE] END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* [DONE] find all links to Authors */
  const linksToAuthors = document.querySelectorAll(optArticleAuthorSelectorLink + ',' + optAuthorsListSelector);
  //console.log('linksToAuthors:', linksToAuthors)

  /* [DONE] START LOOP: for each link */
  for (let author of linksToAuthors) {

    /* [DONE] add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
    //console.log('author:', author)

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
