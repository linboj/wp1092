// TODO:
document.getElementById('comment-num').innerText='1則留言'
var count=1
var comment_button_group=document.getElementById('comment-button-group')
var cancel_button=document.createElement('button')
var comment_button=document.createElement('button')
cancel_button.innerText='取消'
cancel_button.id='cancel-button'
comment_button.innerText='留言'
comment_button.id='comment-button'
comment_button_group.appendChild(cancel_button)
comment_button_group.appendChild(comment_button)

function setcss(select,width,height,radius,bordersize,bcolor,fcolor){
    select.style.border=bordersize
    select.style.borderRadius=radius
   select.style.width=width
    select.style.height=height
    select.style.backgroundColor=bcolor
    select.style.color=fcolor
    select.style.display='none'
}
setcss(cancel_button,'72px','40px','2px','0px','#ffffff','#606060')
setcss(comment_button,'72px','40px','2px','0px','#cccccc','#ffffff')


let comment_input=document.getElementById('comment-input')
comment_input.oninput=function(){
    if (comment_input.value.length!=0){
        comment_button.style.backgroundColor='#065fd4'
    }
    else{
        comment_button.style.backgroundColor='#cccccc'
    }
}        


comment_button.onclick=function(){
    document.getElementById('comment-input').value=''
    document.getElementById('comment-button').style.backgroundColor='#cccccc'
}

comment_input.onclick=function(){
    cancel_button.style.display='block'
    comment_button.style.display='block'
}

cancel_button.onclick=function(){
    document.getElementById('comment-input').value=null
    cancel_button.style.display='none'
    comment_button.style.display='none'
}

comment_button.onclick=function(){
    count++
    addcomment()
    document.getElementById('comment-num').innerText=count+'則留言'
    document.getElementById('comment-input').value=''
    document.getElementById('comment-input').style.backgroundColor='#cccccc'
}

function addcomment(){
    var grounp=document.getElementById('comment-group')
    var comment=document.createElement('div')
    comment.className='comment'
    let img=document.createElement('img')
    img.className='comment-img'
    img.src="images/user-icon.jpg"
    let right=document.createElement('div')
    right.className='comment-right'
    let blk=document.createElement('div')
    let name=document.createElement('span')
    name.className='comment-name'
    name.innerText='Toby Chen'
    let time=document.createElement('span')
    time.className='comment-time'
    time.innerText='現在'
    let txt=document.createElement('p')
    txt.className='comment-text'
    txt.innerHTML=document.getElementById('comment-input').value
    blk.appendChild(name)
    blk.appendChild(time)
    right.appendChild(blk)
    right.appendChild(txt)
    comment.appendChild(img)
    comment.appendChild(right)
    grounp.appendChild(comment)
}