(function ($) {
    "use strict";

    /*--------------------- Site Loader   --------------------*/
    $(window).on("load", function () {
        $(".br-loader").fadeOut("slow");
    });

    /*--------------------- Skill progress (in about section) --------------------*/
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };

    var a = 0;
    var b = 0;
    var oTop = 0;
    var progress = $('#about');
    $(window).scroll(function () {
        if (progress.length) {
            var oTop = progress.offset().top - window.innerHeight;
            if (b == 0 && $(window).scrollTop() > oTop) {

                var max = -219.99078369140625;
                forEach(document.querySelectorAll('.progress'), function (index, value) {
                    var percent = value.getAttribute('data-progress');
                    value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                    value.querySelector('.value').innerHTML = percent + '%';
                });

                b = 1;
            }
        }
    });

    /*----------------------------- Sidebar js | Toggle Icon OnClick Open sidebar  -----------------------------------*/
    $(".br-sidebar-toggle").on("click", function () {
        $(".br-sidebar-overlay").fadeIn();
        $(".br-sidebar").addClass("br-open");
    });

    $(".close-sidebar, .nav-link.br-nav").on("click", function () {
        $(".br-sidebar").removeClass("br-open");
        $(".br-sidebar-overlay").fadeOut();
    });

    $(".br-sidebar-overlay").on("click", function () {
        $(".br-sidebar").removeClass("br-open");
        $(".br-sidebar-overlay").fadeOut();
    });

    /*-------------------- Potfolio for Mixit up --------------------*/
    var portfolioContent = $('.portfolio-content');
    portfolioContent.mixItUp();

    /*--------------------- Replace all SVG images with inline SVG -------------------------------- */
    $(document).ready(function () {
        $('img.svg_img[src$=".svg"]').each(function () {
            var $img = $(this);
            var imgURL = $img.attr('src');
            var attributes = $img.prop("attributes");

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Remove any invalid XML tags
                $svg = $svg.removeAttr('xmlns:a');

                // Loop through IMG attributes and apply on SVG
                $.each(attributes, function () {
                    $svg.attr(this.name, this.value);
                });

                // Replace IMG with SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    });

    /*--------------------- on click to scroll next section -------------------------------- */
    $(document).ready(function () {
        $('.scroll-next').on("click", function (e) {

            var targetHref = $(this).attr('data-scroll');

            $('html, body').animate({
                scrollTop: $('#' + targetHref).offset().top
            }, 100);

            e.preventDefault();
        });
    });

    /*--------------------- Scroll icon on hover mouse animation  -------------------------------- */
    $('.menu').mousemove(function (e) {

        var i = $(".circle"),
            s = e.pageX - i.offset().left,
            o = e.pageY - i.offset().top;

        TweenMax.to($('.circle'), .3, {
            x: (s - i.width() / 2) / i.width() * 50,
            y: (o - i.height() / 2) / i.height() * 50,
            scale: 1.2,
            ease: Power2.easeOut
        })

        TweenMax.to($('.text'), .3, {
            x: (s - i.width() / 2) / i.width() * 80,
            y: (o - i.height() / 2) / i.height() * 80,
            ease: Power2.easeOut
        })

    });

    $('.menu').mouseleave(function (e) {

        var i = $(".circle"),
            s = e.pageX - i.offset().left,
            o = e.pageY - i.offset().top;
        TweenMax.to($('.circle'), .3, {
            x: 0,
            y: 0,
            scale: 1,
            ease: Power2.easeOut
        })

        TweenMax.to($('.text'), .3, {
            x: 0,
            y: 0,
            ease: Power2.easeOut
        })

    });

    /*--------------------- Image tilt animation -------------------------------- */
    $(".br-card").tilt({
        maxTilt: 15,
        perspective: 1400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 1200,
        glare: true,
        maxGlare: 0.2,
        scale: 1.04
    });

    /*--------------------- Blog Slider ---------------------- */
    $('.news-carousel').slick({
        dots: false,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1367,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    /*----------------------------- Client Slider -------------------------------- */    
    $('#br-client-slider').slick({
        rows: 1,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        }
        ]
    });

    /*--------------------- On click menu scroll section to section -------------------------------- */
    // Cache selectors
    var lastId,
        topMenu = $("#top-menu, header"),
        topMenuHeight = topMenu.outerHeight() + 0,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });
})(jQuery);

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
