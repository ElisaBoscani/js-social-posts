const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];
const containerEl = document.getElementById("container");

let markup;
let texImg;
let idLikedPosts = [];

///modifica della data
function stringToData(created) {
  const partiData = created.split("-");

  const day = partiData[2];
  const month = partiData[1];
  const year = partiData[0];
  const newDate = `${day}/${month}/${year}`;

  return newDate;
}

const postsUpdated = posts.map((post) => {
  return { ...post, created: stringToData(post.created) };
});

postsUpdated.forEach(function (post) {
  //caricamento delle immagini del post se non cè l'immagine metto le iniziali del nome
  if (post.author.image === null) {
    const initials = post.author.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    console.log(initials);
    texImg = ` <span>${initials}</span> `;
  } else {
    texImg = `<img src="${post.author.image}" class="circol_img"/> `;
  }

  markup = `
  <div class="card bg_color_light border-info " style="width: 35rem;">
    <span class="fs_text p-2">${post.id}</span>
    <div class="d-flex align-items-center gap-3 ps-3">
    ${texImg}
     <div class="d-flex flex-column">
      <span>${post.author.name}</span>
      <span>${post.created}</span>
     </div>
    </div>
    <div class="p-3">
     <p>${post.content}</p>
     <img src="${post.media}" alt="${post.author.name}" class="w-100" />
    </div>
    <div class="d-flex justify-content-around align-items-center pb-3">
     <button class="like ">Mi piace</button>
     <span >Piace a ${post.likes}</span>
    </div>
  </div>`;
  containerEl.innerHTML += markup;
});
const buttonEl = document.querySelectorAll("button");

console.log("buttonEl", buttonEl);
//funzione del botton
buttonEl.forEach(function (button, i) {
  const postPlus = posts[i];
  //aumenta e toglie i like e crea un array con gli id del post a cui ho messo il like
  button.addEventListener("click", function () {
    if (button.classList.contains("like")) {
      postPlus.likes++;
      idLikedPosts.push(postPlus.id);
      button.classList.remove("like");
      button.classList.add("bg_color");
    } else {
      postPlus.likes--;
      button.classList.add("like");
      button.classList.remove("bg_color");
      const findElement = idLikedPosts.indexOf(postPlus.id);
      idLikedPosts.splice(findElement, 1);
    }

    console.log("idLikedPosts", idLikedPosts);

    let totalLike = button.nextElementSibling;
    totalLike.innerHTML = "Piace a " + postPlus.likes.toString();
    console.log(postPlus.likes);
  });
});
