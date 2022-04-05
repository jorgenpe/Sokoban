const playerCoord = {
    posX: -1,
    posY: -1
}

let selectorY =true;
let selectorX =true;
let up = 1;
let down = -1;
let right = 1;
let left = -1;
let map = tileMap01;
let mapSelector = 1;
let goalArray = [];


function makeCube(temp, coordinates ) {
    let divCube = document.createElement("div");
    divCube.className = temp;
    divCube.id= coordinates; 
    document.getElementById("cubeHolder").appendChild(divCube);
}
function makeAGrid()
{    
    goalArray = new Array();
    clearGrid(false);    
    if(mapSelector<5){
        map = tileMap01;
    }else{
        map = tileMap02;
    }
    
    yAxel();
    mapSelector++;
    if(mapSelector > 8){
        mapSelector = 1;
    }
}

function yAxel(){

    if(selectorY && selectorX ){
        
        for(let j=map.height-1; j >= 0;j--){
            xAxel(j);
                   
        }
        console.log("Y: " + selectorY + " X: " + selectorX);
        up = 1;
        down = -1;
        right = -1;
        left = 1;
        selectorY = false;
        selectorX = false;

    }
    else if(selectorY && !selectorX){

        for(let j= map.height-1; j >= 0;j--){
            xAxel(j);
                   
        }
        console.log("Y: " + selectorY + " X: " + selectorX);
        up = 1;
        down = -1;
        right = 1;
        left = -1;
        selectorY = true;
        selectorX = true;
    }
    else if(!selectorY && selectorX){

        for(let j=0; j < map.height; j++){
            xAxel(j);
                   
        }
        console.log("Y: " + selectorY + " X: " + selectorX);
        up = -1;
        down = 1;
        right = -1;
        left = 1;
        selectorY = true;
        selectorX = false;

    }
    else if(!selectorY && !selectorX) {

        for(let j=0; j < map.height; j++){
            xAxel(j); 
        }
        console.log("Y: " + selectorY + " X: " + selectorX);
        up = -1;
        down = 1;
        right = 1;
        left = -1;
        selectorY = false;
        selectorX = true;
    }


}

function xAxel(yCoord){
    
    if(selectorX === true){
        
        for(let i= map.width-1; i >= 0 ; i--){
            createMap(yCoord,i);
        }
        

    }else if(selectorX === false){
        console.log(selectorX);
        for(let i=0; i < map.width; i++){
            createMap(yCoord,i);
        }
        
    }

}

function createMap(yPos, xPos){

    if(map.mapGrid[yPos][xPos][0]  ===" ")
                {
                    makeCube("background","y"+yPos+"x"+xPos);        
                }
                else if(map.mapGrid[yPos][xPos][0] ==="P")
                {
                    playerCoord.posX = xPos;
                    playerCoord.posY = yPos;
                    makeCube("player","y"+yPos+"x"+xPos);
                }
                else if(map.mapGrid[yPos][xPos][0]  ==="B")
                {
                    makeCube("block","y"+yPos+"x"+xPos);
                }
                else if(map.mapGrid[yPos][xPos][0]  ==="G")
                {
                    makeCube("goal","y"+yPos+"x"+xPos);
                    goalArray.push("y"+yPos+"x"+xPos);
                }
                else if(map.mapGrid[yPos][xPos][0] ==="W")
                {                
                    makeCube("wall","y"+yPos+"x"+xPos);
                } 
}


startGame();
function startGame(){  
    
    document.addEventListener("keydown", event => {

        event.preventDefault();        
        
        switch(event.key){
            
            case "ArrowUp":
                console.log("test up"); 
                move(up,"y");
                break;
            
            case "ArrowDown":
                console.log("test down");
                move(down,"y");
                break;

            case "ArrowLeft":
                console.log("test left");
                move(left,"x");
                                 
                break;

            case "ArrowRight":;
                console.log("test right");
                move(right,"x");
                
                break;
            
            defalt:
            
            break;
        }

    })

}

function nextBlock(id, bool){

    if(bool){
        return document.getElementById(id);
    }else
    {
        return document.getElementById(id).className;
    } 
     
}

function move(number, axelDirection){
    
    let playersBlock = document.getElementById("y" + playerCoord.posY + "x" + playerCoord.posX);
    let cName = direction(number, axelDirection, true);

    

    if(cName.className === "wall")
    {
        return;
    }
    else if(cName.className === "block"){

        console.log(cName.className + ": " + cName.id)
        cName = direction((number*2), axelDirection, true)
        if(cName.className === "background" || cName.className === "goal" )
        {
            cName.className = "block";
            
            console.log(number + " : " + coord(number, axelDirection));
            cName = direction(number, axelDirection, true);
            cName.className = "player";
            
            if(testGoal(playersBlock.id)){
                playersBlock.className = "goal";
            }else{
                playersBlock.className = "background";
            };
            
            
            updatePlayerCoord(number, axelDirection);
            if(endGame()){
                const myDelay = setTimeout(delay,2000);
                function delay(){
                    clearGrid();                    
                    document.getElementById("cubeHolder").innerHTML="You have won the game!";
                }
            }
        }else
        {
            return;
        }
        return
    }else
    {
        let cName = direction(number, axelDirection, true);
        cName.className = 'player';
        
        if(testGoal(playersBlock.id) ){
            playersBlock.className = "goal";
        }else{
            playersBlock.className = "background";
        };
        
        updatePlayerCoord(number, axelDirection);
    }
    
    return;
}

function testGoal(id){
    
    for(let i = 0; i < goalArray.length; i++){
        console.log("id: " + id + " Array: " + goalArray[5]);
        if(id === goalArray[i]){
            console.log("id: " + id + " Array: " + goalArray[i]);
            return true;
        }
        
    }
    return false;

}

function endGame(){
    
    for(let i = 0; i < goalArray.length; i++){
        if(nextBlock(goalArray[i], false) != "block"){
            return false;
        }
    }
    return true;

}

function updatePlayerCoord(number, axelDirection){
    if(axelDirection === "x")
    {
        playerCoord.posX = playerCoord.posX + number;
    }
    else
    {
        playerCoord.posY = playerCoord.posY + number;
    }
}

function coord(number, axelDirection)
{
    if(axelDirection === "x")
    {
        return ("y" + playerCoord.posY + "x" + (playerCoord.posX + number));
    }
    else
    {
        return ("y" + (playerCoord.posY + number) + "x" + (playerCoord.posX));
    }
}

function direction(number,axelDirection, bool)
{
    if(axelDirection === "x")
    {
        return nextBlock(("y" + playerCoord.posY + "x" + (playerCoord.posX + number)), bool);
    }
    else
    {
        return nextBlock(("y" + (playerCoord.posY + number) + "x" + (playerCoord.posX)), bool);
    }
}

function clearGrid(boolSelect)
{
    if(boolSelect){
        selectorY = true;
        selectorX = true;
    }
    document.getElementById("cubeHolder").innerHTML="";
}
