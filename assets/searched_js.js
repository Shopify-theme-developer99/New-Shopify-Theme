window.addEventListener("DOMContentLoaded", function () {
  const search_id = document.querySelector(".search_id");
  const resulted_search = document.querySelector(".resulted_search");
  const product_wrapper = document.querySelector(".search_products_wrapper");
  const search_articles_wrapper = document.querySelector(".search_articles_wrapper");
  const article_wrapper = document.querySelector(".search_articles_wrapper .actual_articles");
  let search_overlay_wrapper = document.querySelector(".search_overlay_wrapper");
  let customized_search_result = document.querySelector(".customized_search_result");


  // Main search trigger
  function handle_search(query) {
    if (query.length > 0) {
      clear_results();
      resulted_search.style.display = "block";
      overlayPopupVisible()
      fetch_products(query);
      fetch_search(query);
    } else {
      clear_results();
      overlayPopupHide();
    }
  }

  // Clear all results
  function clear_results() {
    resulted_search.style.display = "none";
    product_wrapper.innerHTML = "";
    article_wrapper.innerHTML = "";
    article_wrapper.style.display = "none";
    search_articles_wrapper.style.display = "none";
  }

  function overlayPopupVisible() {
    if (search_overlay_wrapper.classList.contains("hide_search") && customized_search_result.classList.contains("hide_search")) {
      search_overlay_wrapper.classList.remove("hide_search");
      customized_search_result.classList.remove("hide_search");
      document.body.style.overflow = "hidden";
    }
  }
  
  function overlayPopupHide() {
    if (!search_overlay_wrapper.classList.contains("hide_search") && !customized_search_result.classList.contains("hide_search")) {
      search_overlay_wrapper.classList.add("hide_search");
      customized_search_result.classList.add("hide_search");
      document.body.style.overflow = "auto";
    }
  }

  // Fetch predictive search products
  function fetch_products(search_keyword) {
    fetch(`https://kiwikisanwindow.com/search/suggest?q=${search_keyword}&section_id=predictive-search`)
      .then((response) => response.text())
      .then((html) => {
        product_wrapper.innerHTML = html;
      });
  }

  // Fetch articles via Shopify suggest API
  function fetch_search(search_keyword) {
    fetch(`${window.Shopify.routes.root}search/suggest.json?q=${search_keyword}&resources[type]=product,page,article,collection&resources[options][unavailable_products]=hide`)
      .then((response) => response.json())
      .then((suggestions) => {
        const search_suggestions = suggestions.resources.results;
        const articles = search_suggestions.articles || [];
        search_articles(articles);
      });
  }

  // Render found articles
  function search_articles(articles) {
    article_wrapper.innerHTML = "";

    if (articles.length > 0) {
      article_wrapper.style.display = "grid";
      search_articles_wrapper.style.display = "block";

      articles.forEach(article => {
        const article_div = `
          <div class="searched_article">
            <a href="${article.url}">
              <div class="article_img">
                <img src="${article.image || 'https://via.placeholder.com/150'}" alt="${article.title}">
              </div>
              <div class="article_title">
                <p>${article.title}</p>
              </div>
            </a>
          </div>`;
        article_wrapper.innerHTML += article_div;
      });
    } else {
      article_wrapper.style.display = "none";
      search_articles_wrapper.style.display = "none";
    }
  }

  // Event: Live search on typing
  search_id.addEventListener("keyup", function () {
    const query = this.value.trim();
    handle_search(query);
  });

  // 🚀 Trigger search on page load if input already has value
  const initialQuery = search_id.value.trim();
  if (initialQuery.length > 0) {
    handle_search(initialQuery);
  }

  search_overlay_wrapper.addEventListener("click", function() {
    if (!search_overlay_wrapper.classList.contains("hide_search") && !customized_search_result.classList.contains("hide_search")) {
      search_overlay_wrapper.classList.add("hide_search");
      customized_search_result.classList.add("hide_search");
       document.body.style.overflow = "auto";
    }
  })
  
});
