const container = document.getElementById('container');
const images = [
    {
        src: '../img/sprite1.png',
        width: 936,
        height: 1760,
        frames: 43,
        widthFrame: 6,
        heightFrame: 8
    },
    {
        src: '../img/sprite2.png',
        width: 1092,
        height: 1760,
        frames: 55,
        widthFrame: 7,
        heightFrame: 8 
    },
    {
        src: '../img/sprite3.png',
        width: 936,
        height: 1760,
        frames: 47,
        widthFrame: 6,
        heightFrame: 8 
    },
    {
        src: '../img/sprite4.png',
        width: 1716,
        height: 2640,
        frames: 129,
        widthFrame: 11,
        heightFrame: 12 
    }
];

const parseImg = ({ width, height, frames, widthFrame, heightFrame }) => {
    let slide = frames;
    let framesPosition = [];
    let left = 0;
    let top = 0;
    let first = true;
    while(slide>0) {
        slide--;
        left=(left+width/widthFrame)%width;
        top=(!first && (left === 0)) ? (top+height/heightFrame)%height : top;
        first = false;
        const position = {
            left: left,
            top: top
        };
        framesPosition = [...framesPosition, position];
    }
    return framesPosition;
};

const animation = (img, item) => {
    let slide = 0;
    this.anime = setInterval(()=> {
        slide++;
        img.counter = slide;
        if(slide<item.frames) {
            img.style.left = `-${item.framesPosition[slide-1].left}px`;
            img.style.top = `-${item.framesPosition[slide-1].top}px`;
        } else {
            slide = left = top = 0;
            img.style.left = `0px`;
            img.style.top = `0px`;
        }
}, 30)
};

const reverseAnimatin = (img, item) => {
    let slide = img.counter;
    this.anime = setInterval(()=> {
        if(slide>1) {
            img.style.left = `-${item.framesPosition[slide-1].left}px`;
            img.style.top = `-${item.framesPosition[slide-1].top}px`;
        } else {
            clearInterval(anime);
        }
        slide--;
}, 30)
};

images.map((item, index) => {
    const div = document.createElement('div');
    div.className+='container_div';
    const gif = document.createElement('div');
    gif.className+='gif-container';
    
    let img = document.createElement('img');
    img.id=index;
    img.src = item.src;
    item.framesPosition = parseImg(item);
    img.addEventListener('mouseenter', () => {
        animation(img, item)
    })
    img.addEventListener('mouseout', () => {
        clearInterval(anime);
        reverseAnimatin(img, item);
    })
    gif.appendChild(img);
    div.appendChild(gif);
    container.appendChild(div);
})

