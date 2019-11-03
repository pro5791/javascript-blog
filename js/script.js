'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

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
      optArticleTagSelector = '.post-tags a',

      optTitleSelector = '.post-title',
      optTagsListSelector = '.list.tags a',

      optTitleListSelector = '.titles';

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

function generateTags(){
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log('articles:', articles);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles) {
    //console.log('article:', article);

        /* [DONE] find tags wrapper */
        const titleList = article.querySelector(optArticleTagsSelector);
        //console.log('titleList:', titleList);

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

            /* √generate HTML of the link */
            const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
            //console.log('linkHTML:', linkHTML);

            /* [DONE] add generated code to html variable */
            html = html + linkHTML;
            //console.log('html:', html);

            /* [DONE] END LOOP: for each tag */
        }
        /* [DONE] insert HTML of all the links into the tags wrapper */
        titleList.innerHTML = html;

        /* [DONE] END LOOP: for every article: */
    }
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

