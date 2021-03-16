var pics = ["https://i.postimg.cc/zvPRrgf7/67-675445-transparent-cinnamoroll-png-cinnamon-roll-cartoon-sanrio.png" , 
"https://i.postimg.cc/nLYjL5zC/6867172-preview.png",
"https://i.postimg.cc/gJzwLDX4/1e33c4a1f8ff586ff5cb40bdf6b4b0c1.jpg",
"https://i.postimg.cc/V6KJqCXw/main.png",
"https://i.postimg.cc/Yqm4Jj1r/d4c838165e5a5a23e3aa8e61e00ac0b4.gif"]

var count=0;
document.getElementById("previous").classList.add('disabled');

function next(){
    if (count!==4){
        count = count+1;
        document.getElementById("display").src = pics[count];
        document.getElementById("url").href = pics[count];
        document.getElementById("url").innerHTML = pics[count];
        if ( document.getElementById("previous").classList.contains('disabled') ){
            document.getElementById("previous").classList.remove('disabled');
        }
    }

    if( count===4 ){
        document.getElementById("next").classList.add('disabled');
    }
}

function back(){
    if( count===0 ){
        document.getElementById("previous").classList.add('disabled');
    }

    if (count!==0){
        count = count-1;
        document.getElementById("display").src = pics[count];
        document.getElementById("url").href = pics[count];
        document.getElementById("url").innerHTML = pics[count];
    
        if ( document.getElementById("next").classList.contains('disabled') ){
            document.getElementById("next").classList.remove('disabled');
        }
    }
    
}