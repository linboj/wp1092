const img_list=[
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Terrier_mixed-breed_dog.jpg/330px-Terrier_mixed-breed_dog.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/RoughCollie_Pangpang.JPG/300px-RoughCollie_Pangpang.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/GermanWirehrPtr1_wb.jpg/300px-GermanWirehrPtr1_wb.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e0/Dalmatian_b_01.jpg',
    'https://i.pinimg.com/originals/99/28/73/9928737a3504c5fc8269377d8ba5a122.jpg'
]
var img_index=0

function previousimage(){
    if (img_index==1){
        img_index=img_index-1
        changeimg(img_list[img_index])
        document.getElementById('previous').classList.add('disabled')
    }
    else if (img_index==img_list.length-1){
        img_index=img_index-1
        changeimg(img_list[img_index])
        document.getElementById('next').classList.remove('disabled')
    }
    else if (img_index<=0){}
    else {
        img_index=img_index-1
        changeimg(img_list[img_index])
    }
}

function nextimage(){
    if (img_index==img_list.length-2){
        img_index=img_index+1
        changeimg(img_list[img_index])
        document.getElementById('next').classList.add('disabled')
    }
    else if (img_index==0){
        img_index=img_index+1
        changeimg(img_list[img_index])
        document.getElementById('previous').classList.remove('disabled')
    }
    else if (img_index>=img_list.length-1){}
    else {
        img_index=img_index+1
        changeimg(img_list[img_index])
    }
}

function changeimg(url){
    let display=document.getElementById('display');
    display.src='./images/loading.gif'
    var downloadingImage= new Image()
    let link=document.getElementById('source')
    link.href=url
    link.innerHTML=url
    downloadingImage.onload=function(){display.src=this.src}
    downloadingImage.src=url
}

