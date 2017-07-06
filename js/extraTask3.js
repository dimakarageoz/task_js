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

images.map((item, index) => {
    const div = document.createElement('div');
    div.classList.add('container_div');
    const gif = document.createElement('div');
    gif.classList.add('gif-container');
    
    let img = document.createElement('img');
    img.id=index;
    img.src = item.src;
    img.frames = item.frames;
    img.counter = 1;
    img.revarse = false;
    img.classList.add('animation--move');
    item.framesPosition = parseImg(item);
    img.addEventListener('mouseenter', () => {
    
    const move = () => {
        if(img.counter < img.frames-1 && $(`#${img.id}`).is(':hover')) {
            const slide = img.counter;
            img.style.left = `-${item.framesPosition[slide-1].left}px`;
            img.style.top = `-${item.framesPosition[slide-1].top}px`;
            img.counter+=1;
            requestAnimationFrame(move);
        }
        if(img.counter == img.frames) img.counter = 1;
    }
    move();
    });
    img.addEventListener('mouseout', () => {
        const reverseMove = () => {
            if(img.counter > 1) {
                const slide = img.counter;
                img.style.left = `-${item.framesPosition[slide-1].left}px`;
                img.style.top = `-${item.framesPosition[slide-1].top}px`;
                img.counter-=1;
                requestAnimationFrame(reverseMove);
            }
        }
        reverseMove();
    });

    gif.appendChild(img);
    div.appendChild(gif);
    container.appendChild(div);
})

