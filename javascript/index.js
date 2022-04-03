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
function makeCube(temp, coordinates ) {
    let divCube = document.createElement("div");
    divCube.className = temp;
    divCube.id= coordinates; 
    document.getElementById("cubeHolder").appendChild(divCube);
}
function makeAGrid()
{    
    clearGrid();    
    
    
    yAxel();
         //for(let j=tileMap01.height-1; j >= 0;j--)
         //{

            //for(let i=0; i < tileMap01.width; i++)
            //for(let i=tileMap01.width-1; i >= 0 ; i--)
            /*{                
                if(tileMap01.mapGrid[j][i][0]  ===" ")
                {
                    makeCube("background","y"+j+"x"+i);        
                }
                else if(tileMap01.mapGrid[j][i][0] ==="P")
                {
                    playerCoord.posX = j;
                    playerCoord.posY = i;
                    makeCube("player","y"+j+"x"+i);
                }
                else if(tileMap01.mapGrid[j][i][0]  ==="B")
                {
                    makeCube("block","y"+j+"x"+i);
                }
                else if(tileMap01.mapGrid[j][i][0]  ==="G")
                {
                    makeCube("goal","y"+j+"x"+i);
                }
                else if(tileMap01.mapGrid[j][i][0] ==="W")
                {                
                    makeCube("wall","y"+j+"x"+i);
                }                  
            }*/            
        //}
}

function yAxel(){

    if(selectorY && selectorX ){
        
        for(let j=tileMap01.height-1; j >= 0;j--){
            xAxel(j);
                   
        }
        console.log("Y: " + selectorY + " X: " + selectorX);
        up = 1;
        down = -1;
        right = -1;
        left = 1;
        selectorY = false;
        selectorX = false;
    }else if(selectorY === true && selectorX === false){
        for(let j=tileMap01.height-1; j >= 0;j--){
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
    else if(selectorY === false && selectorX === true){

        for(let j=0; j < tileMap01.height; j++){
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
    else if(selectorY === false && selectorX === false) {

        for(let j=0; j < tileMap01.height; j++){
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
        console.log(selectorX);
        for(let i=tileMap01.width-1; i >= 0 ; i--){
            createMap(yCoord,i);
        }
        

    }else if(selectorX === false){
        console.log(selectorX);
        for(let i=0; i < tileMap01.width; i++){
            createMap(yCoord,i);
        }
        
    }

}

function createMap(yPos, xPos){

    if(tileMap01.mapGrid[yPos][xPos][0]  ===" ")
                {
                    makeCube("background","y"+yPos+"x"+xPos);        
                }
                else if(tileMap01.mapGrid[yPos][xPos][0] ==="P")
                {
                    playerCoord.posX = yPos;
                    playerCoord.posY = xPos;
                    makeCube("player","y"+yPos+"x"+xPos);
                }
                else if(tileMap01.mapGrid[yPos][xPos][0]  ==="B")
                {
                    makeCube("block","y"+yPos+"x"+xPos);
                }
                else if(tileMap01.mapGrid[yPos][xPos][0]  ==="G")
                {
                    makeCube("goal","y"+yPos+"x"+xPos);
                }
                else if(tileMap01.mapGrid[yPos][xPos][0] ==="W")
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
            //document.getElementById(coord((number*2), axelDirection)).replaceWith(cName);
            console.log(number + " : " + coord(number, axelDirection));
            cName = direction(number, axelDirection, true);
            cName.className = "player";
            //document.getElementById(coord(number, axelDirection)).replaceWith(cName);
            playersBlock.className = "background";
            //document.getElementById("y" + playerCoord.posY + "x" + playerCoord.posX).replaceWith(cName);
            updatePlayerCoord(number, axelDirection);
        }else
        {
            return;
        }
        return
    }else
    {
        let cName = direction(number, axelDirection, true);
        cName.className = 'player';
        //document.getElementById(coord(number, axelDirection)).replaceWith(cName);
        if(playerCoord.posX > 15){
            playersBlock.className = "goal";
        }else{
            playersBlock.className = "background";
        };
        
        //document.getElementById("y" + playerCoord.posY + "x" + playerCoord.posX).replaceWith(cName);
        updatePlayerCoord(number, axelDirection);
    }
    return;
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

function clearGrid()
{
    document.getElementById("cubeHolder").innerHTML="";
}
