// recup l id dans l'url pour afficher les datas
const queryString_url_id = window.location.search;
console.log("id dans l'url", queryString_url_id);
const urlParams = new URLSearchParams(queryString_url_id);
console.log("object url params", urlParams);
const theId = urlParams.get("id");
console.log("the id", theId);

// Vérifier sur quelle page on est
const isIndexPage = document.querySelector(".popular"); // Check si on est sur index.html
const isMesLivresPage = document.getElementById("book-details"); // Check si on est sur mes-livres.html
const isBookDetailsPage = document.getElementById("bookDetailsMain-container"); // Check si on est sur bookDetails.html
const isAuthorPage = document.getElementById("author-main-container"); // Check si on est sur author.html

async function getAPIData(search = "fiction", maxResults = 10) {
  try {
    const response = await fetch(
      `https://books.googleapis.com/books/v1/volumes?q=subject:${search}&maxResults=${maxResults}`
    );
    const data = await response.json();
    console.log("Books Datas :", data);
    return data;
  } catch (e) {
    console.error("Erreur du fetch des books : ", e);
  }
}

async function getAPIDataDetails() {
  try {
    const response = await fetch(
      `https://books.googleapis.com/books/v1/volumes/${theId}`
    );
    const data = await response.json();
    console.log("Book Data Detail :", data);
    return data;
  } catch (e) {
    console.error("Erreur du fetch du book détail : ", e);
  }
}

if (isIndexPage) {
  getAPIData("romance", 20).then((data) => {
    console.log("data", data);
    const bookContainer = document.getElementById("carousel");

    data.items.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const image = book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://via.placeholder.com/150";
      const title = book.volumeInfo.title || "Titre non renseigné";
      const author = book.volumeInfo.authors || "Auteur non connu";
      const price = book.saleInfo.listPrice
        ? book.saleInfo.listPrice.amount
        : "Prix non défini";
      const rating = book.volumeInfo.averageRating || 0;
      const link = `pages/bookDetails.html?id=${book.id}`;

      bookCard.innerHTML = `
      <img src="${image}" alt="${title}">
      <h3>${title}</h3>  if (isIndexPage) {
      <p>${author}</p>
      <p>${price}</p>
      <div class="book-rating">${"★".repeat(rating)}</div>
      <a href="${link}">Voir plus</a>`;

      bookContainer.appendChild(bookCard);
    });
  });
} else if (isMesLivresPage) {
  // code Arnaud
  getAPIData().then((data) => {
    console.log("data", data);
    const bookListContainer = document.getElementById("book-list");

    data.items.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      const bookLink = `bookDetails.html?id=${book.id}`;
      const bookImage = book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://via.placeholder.com/150";
      const bookTitle = book.volumeInfo.title || "Titre non renseigné";
      const bookAuthor = book.volumeInfo.authors || "Auteur non connu";
      const bookRating = book.volumeInfo.averageRating || 0;
      const bookPrice = book.saleInfo.listPrice
        ? book.saleInfo.listPrice.amount
        : "Prix non défini";

      bookDiv.innerHTML = `
            <a href="${bookLink}" class="book-link">
                <div class="book-image">
                    <img src="${bookImage}" alt="${bookTitle}">
                </div>
                <div class="book-infos-container">
                    <div class="book-title">${bookTitle}</div>
                    <div class="book-author">${bookAuthor}</div>
                    <div class="book-rating">${bookRating}</div>
                    <div class="book-price">${bookPrice}</div>                
                </div>
            </a>
        `;

      bookListContainer.appendChild(bookDiv);
    });
  });
} else if (isBookDetailsPage) {
  getAPIDataDetails().then((data) => {
    console.log("data", data);
    const bookDetailsContainer = document.getElementById(
      "bookDetails-container"
    );

    const image = data.volumeInfo.imageLinks
      ? data.volumeInfo.imageLinks.thumbnail
      : "https://via.placeholder.com/150";
    const title = data.volumeInfo.title || "Titre non renseigné";
    const author = data.volumeInfo.authors || "Auteur non connu";
    const rating = data.volumeInfo.averageRating || 0;
    const publicationDate = data.volumeInfo.publishedDate || "Date inconnue";

    bookDetailsContainer.innerHTML = `
              <img src="${image}" alt="${title}" />
          <h3 class="details-title">${title}</h3>
          <span class="book-info">
            <p class="book-author"> ${author}</p>
            <p class="book-date">Date de publication : ${publicationDate}</p>
          </span>
          <span class="solid-stars" aria-label="Évaluation du livre : ${"★".repeat(
            rating
          )} étoiles">
            ${"★".repeat(rating)}
          </span>
    `;
  });
}
