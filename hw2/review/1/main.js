var myImage = document.querySelector('#display');
var myLink = document.querySelector('#link');
var myAudio = document.querySelector('#audio');
var loading = document.querySelector('#loading');
var back = document.querySelector('#previous');
var next = document.querySelector('#next');
var imageLink = ['https://i.ytimg.com/vi/M6nEl7hMDcs/maxresdefault.jpg', 
                'https://i.ytimg.com/vi/zI3GqAT_tro/maxresdefault.jpg',
                'https://img.ttshow.tw/images/author/vivian/screenshot%202021-02-15%20%E4%B8%8B%E5%8D%884_57_47.jpg',
                'https://i.ytimg.com/vi/7VFTcmGRM-k/mqdefault.jpg']
var sourceLink = ['https://youtu.be/072tU1tamd0',
                'https://youtu.be/zI3GqAT_tro',
                'https://youtu.be/uoqJy_AEt-E',
                'https://youtu.be/7VFTcmGRM-k']
var audioLink = ['./audio/0.wav', './audio/1.wav', './audio/2.wav', './audio/3.wav']
var numOfImage = imageLink.length;
var orderOfImage = 0;

window.onload = function() {
    loading.style.display = 'none';
}

back.onclick = function() {
    if(orderOfImage != 0){
        orderOfImage -= 1;
        myImage.setAttribute ('src', imageLink[orderOfImage]);
        myLink.setAttribute('href', sourceLink[orderOfImage]);
        myAudio.setAttribute('src', audioLink[orderOfImage]);
        next.removeAttribute('class');
        if(orderOfImage == 0) back.setAttribute('class', 'disabled');
    }
}

next.onclick = function() {
    if(orderOfImage != imageLink.length - 1) {
        orderOfImage += 1;
        myImage.setAttribute ('src', imageLink[orderOfImage]);
        myLink.setAttribute('href', sourceLink[orderOfImage]);
        myAudio.setAttribute('src', audioLink[orderOfImage]);
        back.removeAttribute('class');
        if(orderOfImage == imageLink.length - 1) next.setAttribute('class', 'disabled');
    }
}