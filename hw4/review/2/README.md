# Web Programming HW4

<img width="1433" alt="螢幕快照 2021-04-21 下午4 17 00" src="https://user-images.githubusercontent.com/44222693/115634269-dbbe1e80-a33b-11eb-923a-bdd223accf8d.png">

### 一些功能說明：
有些功能是考google sheet的behavior，所以希望不要被亂評嗚嗚
* 在只有select cell的狀態，Double Click或按Enter就會變成focus等候開始輸入，不會清掉原本的，且游標放在最後面
<img width="85" alt="螢幕快照 2021-04-21 下午4 16 06" src="https://user-images.githubusercontent.com/44222693/115634762-d3b2ae80-a33c-11eb-820e-19434b4e5c64.png">

* 如果選取cell時，cell內沒有東西，按Backspace會沒有反應，但如果有東西就會清除全部
* 除了一些特殊的鍵像是Shift, Ctrl, Option, Backspace, CapsLock等，在選取cell還沒出現可輸入時按其他按鍵就會清掉原本並開始自動輸入
* 新增row或column：focus會跑到`新增`的row或column 
* 刪除row或column：如果不是刪最後，focus會停在`原本刪掉的位置`（變成focus在原本的下一個row或column）如果是刪最尾巴，focus跑到`前一個`row或column（因此可以連續加或刪)。但如果點擊不是在table cell的地方一樣會lose focus，沒有辦法刪
* 加入keyboard navigation：按上下左右鍵可以移動
* Ctrl+C / Crtl+V：可以copy paste cell (mac一樣是按ctrl不是command!)
