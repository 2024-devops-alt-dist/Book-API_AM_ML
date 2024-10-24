async function getAPIData() {
  try {
    const response = await fetch(
      "https://books.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20"
    );
    const data = await response.json();
    console.log("Books Datas :", data);
    return data;
  } catch (e) {
    console.error("Erreur dans ton fetch !!!! : ", e);
  }
}

getAPIData().then((data) => {
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
    const link = `bookDetails.html?id=${book.id}`;

    bookCard.innerHTML = `
      <img src="${image}" alt="${title}">
      <h3>${title}</h3>
      <p>${author}</p>
      <p>${price}</p>
      <div class="book-rating">${"★".repeat(rating)}</div>
      <a href="${link}">Voir plus</a>`;

    bookContainer.appendChild(bookCard);
  });
});
