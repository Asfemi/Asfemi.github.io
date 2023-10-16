///the index.html scripts


document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleIndex = urlParams.get("article");

    if (articleIndex !== null) {
      openModalWithArticle(parseInt(articleIndex));
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const modalLink = document.querySelector("[data-toggle='modal']");

    if (modalLink !== null) {
      modalLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the link from navigating

        const articleIndex = modalLink.getAttribute("data-article");
        openModalWithArticle(parseInt(articleIndex));
      });
    }
  });


  // Function to load modal content based on the variable
  function openModalWithArticle(articleIndex) {
    // Fetch your JSON data (assuming it's stored in "articles.json")
    fetch("pages/articles.json")
      .then((response) => response.json())
      .then((data) => {
        // Access the article based on the index
        const article = data[articleIndex];

        // Now, you can populate your HTML content with the article data
        document.querySelector(".article-title").textContent = article.title;
        document.querySelector(".article-meta").textContent = `Published on ${article.date} by ${article.author}`;

        // Calculate reading time and display it
        const readingTime = calculateReadingTime(article.content);
        document.querySelector(".reading-time").textContent = `${readingTime} min read`;

        //extra details
        document.querySelector(".project-client").textContent =
          article.client;
        document.querySelector(".project-city").textContent =
          article.city;
        document.querySelector(".project-previewlink").textContent =
          article.previewLink;

        // Populate the article content
        const contentContainer = document.querySelector(".article-content");
        contentContainer.innerHTML = ""; // Clear previous content
        article.content.forEach((item) => {
          if (item.type === "text") {
            const paragraph = document.createElement("p");
            paragraph.textContent = item.data;
            contentContainer.appendChild(paragraph);
          } else if (item.type === "image") {
            const image = document.createElement("img");
            image.src = item.src;
            image.alt = item.alt;
            image.className = "article-image";
            contentContainer.appendChild(image);
          } else if (
            item.type === "list" &&
            item.goals &&
            Array.isArray(item.goals)
          ) {
            const ul = document.createElement("ul");
            item.goals.forEach((goal) => {
              const li = document.createElement("li");
              li.textContent = goal;
              ul.appendChild(li);
            });
            contentContainer.appendChild(ul);
          }
        });

        // Set the article parameter in the URL
        const url = new URL(window.location);
        url.searchParams.set("article", articleIndex);

        // Update the URL with the article parameter
        window.history.pushState({}, "", url.toString());

        // Trigger the modal to open
        $('#exampleModalLong').modal('show');
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }

  function calculateReadingTime(content) {
    // Assuming an average reading speed of 225 words per minute
    const wordsPerMinute = 225;

    // Join the text content of the article items
    const articleText = content
      .filter((item) => item.type === "text")
      .map((item) => item.data)
      .join(" ");

    // Count the number of words in the content
    const wordCount = articleText.split(/\s+/).length;

    // Calculate the reading time in minutes
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

    return readingTimeMinutes;
  }


  //send mail alert
  function showAlert() {
alert("Mail Sent.");
}
