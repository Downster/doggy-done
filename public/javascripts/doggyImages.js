
const dogImages = "https://api.thedogapi.com/v1/breeds";



const genData = async () => {
    const reqestObj = {
        headers: {"x-api-key":"869466b6-009d-421f-a2d5-4bf91cc88fa4"}
    };
    const [apiRes, dogNamesMRes, dogNamesFRes] = await Promise.all([
        fetch(dogImages),
        fetch('/randomDogNames/m'),
        fetch('/randomDogNames/f'),
    ]);
    const [data, dogNamesM, dogNamesF] = await Promise.all([
        apiRes.json(),
        dogNamesMRes.json(),
        dogNamesFRes.json(),
    ]);
    const ages = [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10];
    data.sort((a,b) => 0.5 - Math.random());
    const pictures = data.map(datum => datum.image.url);
    const temperaments = data.map(datum => datum.temperament);
    const breedNames = data.map(datum => datum.name);
    const dataMap = data.reduce((accum, datum) => {
        const obj = {};
        const mOrF = Math.random() >= 0.5;
        const randomNameIndex = Math.floor(Math.random() * Math.min(dogNamesM.length, dogNamesF.length));
        const randomAgeIndex = Math.floor(Math.random() * ages.length);
        obj.breed = datum.name.trim();
        obj.name = mOrF ? dogNamesM[randomNameIndex] : dogNamesF[randomNameIndex];
        obj.age = ages[randomAgeIndex];
        obj.url = datum.image.url;
        obj.temperament = datum.temperament ?
          datum.temperament
            .split(", ")
            .sort((a,b) => 0.5 - Math.random())
            .slice(0,5)
        : [];
        accum.push(obj);
        return accum;
    }, []);
    return dataMap;
}

const makeTable = (obj) => {
    const tag = "Loves Doggy Done!"
    const { name, age, temperament } = obj;
    const table = document.createElement("table");
    table.classList.add('dog-profile');
    table.innerHTML = `
      <tbody>
        <tr>
          <td>Name</td>
          <td>${name}</td>
        <tr>
          <td>Age</td>
          <td>${age}</td>
        <tr>
          <td>Personality</td>
        <tr>
        <p class="temperament">${temperament.join(". ") + `. ${tag}`}</p>
       </tbody>
    `;
    return table;
}

const makeELements = (datum) => {
    const {url, temperament, name} = datum;
    const figure = document.createElement("figure");
    figure.classList.add("slide");
    figure.style.backgroundImage = `url(${url})`;
    const caption= document.createElement("figcaption");
    caption.innerText = datum.breed;
    figure.append(caption);
    const table = makeTable(datum);
    const container = document.createElement("div");
    container.classList.add("dog-passport");
    container.append(figure);
    container.append(table);
    console.log(container);
    return container;
}


document.addEventListener('DOMContentLoaded',async(_e) => {

    const slideshows =  await genData();
    setTimeout(() => {
        let index = 0;
        let activeIndex = 0;
        const time = 5000;
        const slideshowContainer = document.getElementById('might-be-slide-show');
        const slides = slideshows.map(slide =>{
        const fig = makeELements(slide);
            slideshowContainer.append(fig);
            return fig;
        });
        slides[activeIndex].classList.toggle('active');
        setInterval(() => {
            slides[activeIndex].classList.toggle('active');
            index = (index+1)%slides.length;
            slides[index].classList.toggle('active');
            activeIndex = index;
        }, time);
    }, 1000);
});
