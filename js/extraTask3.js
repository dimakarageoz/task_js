
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

const animation = (img, item, index) => {
    let left = 0;
    let slide = 0;
    let top = 0;
    let first = true;
    this.anime = setInterval(()=> {
        left=(left+item.width/item.widthFrame)%item.width;
        top=(!first && (left === 0)) ? (top+item.height/item.heightFrame)%item.height : top;
        slide++;
        if(slide<item.frames) {
            img.style.left = `-${left}px`;
            img.style.top = `-${top}px`;
        } else {
            clearInterval(anime);
        }
        first = false;
}, 30)
};

const reverseAnimatin = (img, item) => {
    let slide = 0;
    let top = -parseInt(
        img.style.top.split('px')[0]
    );
    let left = -parseInt(
        img.style.left.split('px')[0]
    );
    this.anime = setInterval(()=> {
        if((slide<item.frames) || (left === 0 && top === 0 )) {
            img.style.left = `-${left}px`;
            img.style.top = `-${top}px`;
        } else {
            clearInterval(anime);
        }
        left=(left-item.width/item.widthFrame)%item.width;
        if(left === 0) {
            top=(top-item.height/item.heightFrame)%item.height;
            left=item.width/item.widthFrame;
        }
        slide++;
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

