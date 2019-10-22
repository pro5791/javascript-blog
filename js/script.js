'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

const titleClickHandler = function(event) {
    event.preventDefault();

    console.log('Link was clicked!');
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
          optTitleSelector = '.post-title',
          optTitleListSelector = '.titles',
          optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    //console.log('optTitleListSelector():', optTitleListSelector);

    /* for each article */
    let html = '';

    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {

        //console.log('optArticleSelector():', optArticleSelector);

        /* [DONE] get the article id */
        const articleId = article.getAttribute("id");

        //console.log('articleId():', articleId);

        /* [DONE] find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        //console.log('articleTitle:', articleTitle);

        /* get the title from the title element */

        /* [DONE] create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        //console.log('linkHTML:', linkHTML);

        /* [DONE] insert link into html variable */
        html = html + linkHTML;

        //console.log('html:', html);
    }
    titleList.innerHTML = html;
}

generateTitleLinks();

function generateTags(){
    /* find all articles */

    /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

    /* generate HTML of the link */

    /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
}

generateTags();

const links = document.querySelectorAll('.titles a');
for(let link of links) {
    link.addEventListener('click', titleClickHandler);
}

