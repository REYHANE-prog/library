const BOOKS = [
  {
    id: 1,
    title: "خواجه تاجدار",
    author: "ژان گور",
    published_date: 2007,
    language: "persian",
    genre: "تاریخ",
    imgSrc: "1.jpg",
  },
  {
    id: 2,
    title: "ضیافت",
    author: "افلاطون",
    published_date: 385,
    language: "greek",
    genre: "فلسفه",
    imgSrc: "2.jpg",
  },
  {
    id: 3,
    title: "منطق الطیر",
    author: "عطار",
    published_date: 1177,
    language: "persian",
    genre: "شعر",
    imgSrc: "3.jpg",
  },
  {
    id: 4,
    title: "مثنوی معنوی",
    author: "مولوی",
    published_date: 1258,
    language: "persian",
    genre: "شعر",
    imgSrc: "4.jpg",
  },
  {
    id: 5,
    title: "دیوان حافظ",
    author: "حافظ",
    published_date: 1200,
    language: "persian",
    genre: "شعر",
    imgSrc: "5.jpg",
  },
  {
    id: 6,
    title: "رومیو و جولیت",
    author: "ویلیام شکسپیر",
    published_date: 1595,
    language: "english",
    genre: "عاشقانه",
    imgSrc: "6.jpg",
  },
  {
    id: 7,
    title: "ویس و رامین",
    author: "فخرالدین اسعد گرگانی",
    published_date: 1054,
    language: "persian",
    genre: "عاشقانه",
    imgSrc: "7.jpg",
  },
  {
    id: 8,
    title: "گلستان",
    author: "سعدی",
    published_date: 1258,
    language: "persian",
    genre: "شعر",
    imgSrc: "8.jpg",
  },
  {
    id: 9,
    title: "بوستان",
    author: "سعدی",
    published_date: 1257,
    language: "persian",
    genre: "شعر",
    imgSrc: "9.jpg",
  },
  {
    id: 10,
    title: "گلشن راز",
    author: "شیخ محمود شبستری",
    published_date: 1311,
    language: "persian",
    genre: "شعر",
    imgSrc: "10.jpg",
  },
  {
    id: 11,
    title: "لیلی و مجنون",
    author: "نظامی",
    published_date: 1188,
    language: "persian",
    genre: "عاشقانه",
    imgSrc: "11.jpg",
  },
  {
    id: 12,
    title: "شاهنامه",
    author: "فردوسی",
    published_date: 1010,
    language: "persian",
    genre: "شعر",
    imgSrc: "12.jpg",
  },
  {
    id: 13,
    title: "ایلیاد",
    author: "هومر",
    published_date: 762,
    language: "greek",
    genre: "شعر",
    imgSrc: "13.jpg",
  },
  {
    id: 14,
    title: "اودیسه",
    author: "هومر",
    published_date: 725,
    language: "greek",
    genre: "شعر",
    imgSrc: "14.jpg",
  },
  {
    id: 15,
    title: "هملت",
    author: "ویلیام شکسپیر",
    published_date: 1609,
    language: "greek",
    genre: "درام",
    imgSrc: "15.jpg",
  },
  {
    id: 16,
    title: "دن کیشوت",
    author: "میگل دسروانتس",
    published_date: 1605,
    language: "spanish",
    genre: "درام",
    imgSrc: "16.jpg",
  },
];

const root = document.querySelector(".main__container");
const authorsFilterContainer = document.getElementById("filterAuthors");
const langsFilterContainer = document.getElementById("filterLangs");
const header = document.querySelector("header");
const favContainer = document.getElementById("favs");
const favButton = document.querySelector(".favContainer");
const selectedGenres = [];
const selectedAuthors = [];
const selectedLangs = [];
const burgerMenu = document.getElementById('burger-menu');
const titles = document.querySelector('.titles');
const favContainers = document.querySelector('.favContainer');
const favs = document.getElementById('favs');

let favorite = [];
let currentPage = 1;
let perPage = 4;

favContainers.addEventListener('click', () => {
  favs.classList.toggle('visible');
});

burgerMenu.addEventListener('click', () => {
  titles.classList.toggle('active');
});

function getFavoriteBooks() {
  const localData = JSON.parse(localStorage.getItem("favs"));
  if (localData) favorite = localData;
}
getFavoriteBooks();

function renderFav() {
  const favBooks = favorite
    .map((item) => {
      return BOOKS.find((book) => book.id === item);
    })
    .filter((book) => book !== undefined); 

  const template = favBooks
    .map((item) => {
      return `
      <div class="favedBook">
        <img src="./image/${item.imgSrc}" />
        <h3>${item.title}</h3>
        <button onclick="removeFromFavorite(${item.id})">حذف از علاقه مندی ها</button>
      </div>
    `;
    })
    .join("");

  favContainer.innerHTML = template;
}

function removeFromFavorite(bookId) {
  const index = favorite.indexOf(bookId);
  if (index !== -1) {
    favorite.splice(index, 1);
    localStorage.setItem("favs", JSON.stringify(favorite)); 
  }
  renderFav();
}


function renderBooks(data) {
  const template = data
    .slice((currentPage - 1) * perPage, perPage * currentPage)
    .map((book) => {
      return `
        <div class="container">
            <img src="./image/${book.imgSrc}" alt="${book.title}" class="image" />
            <div class="overlay">
                <div class="title">نام کتاب: ${book.title}</div>
                <div class="writer">نویسنده : ${book.author}</div>
                <div class="language">زبان : ${book.language}</div>
                <button onclick="addToFavorite(${book.id})">افزودن به علاقه مندی ها</button>
            </div>
      </div>
        `;
    })
    .join("");

  root.innerHTML = template;
  renderPagination(data);
}

renderBooks(BOOKS);

function addToFavorite(bookId) {
  if (!favorite.includes(bookId)) {
    favorite.push(bookId); 
    localStorage.setItem("favs", JSON.stringify(favorite)); 
  }
}


function renderPagination(data) {
  const pagesCount = Math.ceil(data.length / perPage);
  // let template = ""
  //   for(let i = 0; i<pagesCount; i++){
  //     template += `
  //       <div>
  //         ${i + 1}
  //       </div>
  //     `
  //   }

  // const newArr = new Array(pagesCount)

  const template = [...new Array(pagesCount)]
    .map((item, index) => {
      return `
      <button onclick="setCurrentPage(${index + 1})" class="pagination-item">
        ${index + 1}
      </button>
    `;
    })
    .join("");

  const temp = `
      <div class="pagination-container">
        ${template}
      </div>
    `;

  root.innerHTML += temp;
}

function setCurrentPage(page) {
  currentPage = page;
  filterBooks(true);
}

function renderAuthorItems() {
  const authors = [];

  for (const book of BOOKS) {
    if (!authors.includes(book.author)) {
      authors.push(book.author);
    }
  }

  const template = authors
    .map((author) => {
      return `
    <div class="filterItem">
    <label for="${author}" >${author}</label>
    <input onclick="handleAuthorClick(event)" id="${author}" type="checkbox" value="${author}" />
  </div>
    `;
    })
    .join("");

  authorsFilterContainer.innerHTML += template;
}

renderAuthorItems();

function renderLangItems() {
  const langs = [];

  for (const book of BOOKS) {
    if (!langs.includes(book.language)) {
      langs.push(book.language);
    }
  }

  const template = langs
    .map((lang) => {
      return `
    <div class="filterItem">
    <label for="${lang}">${lang}</label>
    <input onclick="handleLangClick(event)" id="${lang}" type="checkbox" value="${lang}" />
  </div>
    `;
    })
    .join("");

  langsFilterContainer.innerHTML += template;
}

renderLangItems();

function handleLangClick(event) {
  if (event.target.checked) {
    selectedLangs.push(event.target.value);
  } else {
    const foundIndex = selectedLangs.findIndex(
      (item) => item === event.target.value
    );
    selectedLangs.splice(foundIndex, 1);
  }

  filterBooks();
}
function renderGenreItems() {
  const genres = [];

  for (const book of BOOKS) {
    if (!genres.includes(book.genre)) {
      genres.push(book.genre);
    }
  }

  const template = genres
    .map((genre) => {
      return `
    <div class="filterItem">
    <label for="${genre}">${genre}</label>
    <input onclick="handleGenreClick(event)" id="${genre}" type="checkbox" value="${genre}" />
  </div>`
    })
    .join("");

  document.getElementById("filterGenre").innerHTML += template;
}

renderGenreItems();
function handleGenreClick(event) {
  if (event.target.checked) {
    selectedGenres.push(event.target.value);
  } else {
    const foundIndex = selectedGenres.findIndex(
      (item) => item === event.target.value
    );
    selectedGenres.splice(foundIndex, 1);
  }

  filterBooks();
}

function handleAuthorClick(event) {
  if (event.target.checked) {
    selectedAuthors.push(event.target.value);
  } else {
    const foundIndex = selectedAuthors.findIndex(
      (item) => item === event.target.value
    );
    selectedAuthors.splice(foundIndex, 1);
  }

  //   if (!selectedAuthors.includes(event.target.value)) {
  //     selectedAuthors.push(event.target.value);
  //   } else {
  //     const foundIndex = selectedAuthors.findIndex(
  //       (item) => item === event.target.value
  //     );
  //     selectedAuthors.splice(foundIndex, 1);
  //   }
  filterBooks();
}

function filterBooks(shouldResetPage) {
  let result = BOOKS;
  if (!shouldResetPage) {
    currentPage = 1;
  }

  if (selectedAuthors.length != 0) {
    result = result.filter((item) => selectedAuthors.includes(item.author));
  }

  if (selectedLangs.length != 0) {
    result = result.filter((item) => selectedLangs.includes(item.language));
  }

  if (selectedGenres.length !== 0) {
    result = result.filter((item) => selectedGenres.includes(item.genre));
  }

  renderBooks(result);
}

function handleScroll(evt) {
  console.log(evt.deltaY);

  if (evt.deltaY > 0) {
    header.classList.add("positioned");
  } else {
    header.classList.remove("positioned");
  }
}

function handleFavClick() {
  favContainer.classList.toggle("hidden");
  renderFav();
}

window.addEventListener("wheel", handleScroll);
favButton.addEventListener("click", handleFavClick);