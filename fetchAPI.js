async function getAPIData() {
  try {
    const response = await fetch(
      "https://books.googleapis.com/books/v1/volumes?q=%7Bsearch%20terms%7D&maxResults=20&key=AIzaSyDkjFNjWDXShLAlL_ycrvJHhGQzCy3RtPw"
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

    const bookImage = document.createElement("img");
    bookImage.src = book.volumeInfo.imageLinks.thumbnail;
    bookImage.alt = book.volumeInfo.title;

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.volumeInfo.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.volumeInfo.authors;

    if (book.saleInfo.listPrice === undefined) {
      book.saleInfo.listPrice = { amount: "Prix non disponible" };
    }
    const bookPrice = document.createElement("p");
    bookPrice.textContent = book.saleInfo.listPrice.amount;

    const bookRating = document.createElement("div");
    bookRating.classList.add("book-rating");
    bookRating.textContent = `${"★".repeat(book.volumeInfo.averageRating)}`;

    const bookLink = document.createElement("a");
    bookLink.href = `bookDetails.html?id=${book.id}`;
    bookLink.textContent = "Voir plus";

    bookCard.append(
      bookImage,
      bookTitle,
      bookAuthor,
      bookPrice,
      bookRating,
      bookLink
    );
    bookContainer.appendChild(bookCard);
  });
});
