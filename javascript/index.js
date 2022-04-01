const playerCoord = {
    posX: -1,
    posY: -1
}
function makeCube(temp, coordinates ) {
    let divCube = document.createElement("div");
    divCube.className = temp;
    divCube.id= coordinates; 
    document.getElementById("cubeHolder").appendChild(divCube);
}
function makeAGrid()
{    
    clearGrid();    
    
         for(let j=tileMap01.height-1; j >= 0;j--)
         {
            for(let i=0; i < tileMap01.width; i++)
            {                
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
            }            
        }

    startGame();
}

function startGame(){  
    
    document.addEventListener("keydown", event => {

        event.preventDefault();        
        
        switch(event.key){
            
            case "ArrowUp":
                console.log("test up"); 
                move(1,"y");
                break;
            
            case "ArrowDown":
                console.log("test down");
                move(-1,"y");
                break;

            case "ArrowLeft":
                console.log("test left");
                move(-1,"x");
                break;

            case "ArrowRight":;
                console.log("test right");
                move(1,"x");
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
    let cName = direction(number, axelDirection, false);

    if(cName === "wall")
    {
        return;
    }
    else if(cName === "block"){
        cName = direction((number*2), axelDirection, false)
        if(cName === "background")
        {

        }else
        {
            return;
        }
    }
    return;
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
