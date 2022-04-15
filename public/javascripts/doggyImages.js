const dogImages = "https://api.thedogapi.com/v1/breeds";

const getPics = async () => {
    const reqestObj = {
        headers: {"x-api-key":"869466b6-009d-421f-a2d5-4bf91cc88fa4"}
    };
    const apiRes = await fetch(dogImages);
    const data = await apiRes.json();
    const pictures = data.map(datum => datum.image.url);
    return pictures;
}

document.addEventListener('DOMContentLoaded',async(_e) => {

    const slideshows =  await getPics();

    let index =0;
    let activeIndex = 0;
    const time = 3000;
    const slideshowContainer = document.getElementById('might-be-slide-show');
    const slides = slideshows.map(slide =>{
       const image = document.createElement("img");
       image.classList.add('slide');
       image.setAttribute("src",slide);
       slideshowContainer.append(image);
       return image;
    });

    slides[activeIndex].classList.toggle('active');

    setInterval(() => {
        slides[activeIndex].classList.toggle('active');
        index = (index+1)%slides.length;
        slides[index].classList.toggle('active');
        activeIndex = index;
    },time);
})
