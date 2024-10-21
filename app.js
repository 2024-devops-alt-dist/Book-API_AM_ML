document.getElementById('favoris-btn').addEventListener('click', function() {
    window.location.href = 'mes-livres.html';
});


// Fonction pour générer les cartes de livre
function generateBookCards(books, containerSelector) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';

    books.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookImage = document.createElement('img');
        bookImage.src = 'book-cover.jpg'; // Remplacez par l'URL de l'image de couverture
        bookCard.appendChild(bookImage);

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.author;
        bookCard.appendChild(bookAuthor);

        container.appendChild(bookCard);
    });
}
// ProgressBar dans les livres du user
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress');

    progressBars.forEach(progress => {
        const randomPercentage = Math.floor(Math.random() * 101); // Generate a random percentage between 0 and 100
        progress.style.width = randomPercentage + '%';
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
      });
  });

  const backButton = document.querySelector('.back-button');
  backButton.addEventListener('click', function() {
      alert('Retour à la page précédente');
  });

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Navigation vers ' + this.textContent + ' non implémentée dans cette démo');
      });
  });

  const bookmarks = document.querySelectorAll('.bookmark');
  bookmarks.forEach(bookmark => {
      bookmark.addEventListener('click', function() {
          this.textContent = this.textContent === '★' ? '☆' : '★';
      });
  });
});

// Générer les cartes de livre
generateBookCards(featuredBooks, '.featured-books .book-grid');
generateBookCards(newReleases, '.new-releases .book-grid');

document.querySelector('.carousel').addEventListener('wheel', (evt) => {
    evt.preventDefault();
    document.querySelector('.carousel').scrollBy({
        left: evt.deltaY < 0 ? -30 : 30,
        behavior: 'smooth'
    });
});

const st = {};

st.flap = document.querySelector('#flap');
st.tabs = document.querySelector('.tabs');
st.favoris = document.querySelector('#favoris');
st.telecharges = document.querySelector('#telecharges');

document.addEventListener('DOMContentLoaded', () => {
    st.flap.children[0].textContent = st.favoris.nextElementSibling.textContent;
});

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'LABEL') {
        setTimeout(() => {
            st.flap.children[0].textContent = e.target.textContent;
        }, 250);
    }
});
