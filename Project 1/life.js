class Life{
    m_cell;
    m_boardSize;
    m_grid;
    isDone = false;
    
    constructor(size){
        this.m_boardSize = size;
        let conf = new Config();
        this.m_cell = conf.cell;
        this.m_grid = new Grid(this.m_boardSize);

        let output = "";
        document.getElementById("setupButtons").style = "display:none";
        output = "<table id='board' style='border: solid 1px;' cellpadding='1'>";
        for(let i = 0; i < this.m_boardSize; i++){
            output += "<tr>"
            for(let j = 0; j < this.m_boardSize; j++){
                let loc = "\"" + i + ":" + j + "\"";
                output += "<td id='" + loc + "' ";
                output += "onclick='input(" + loc + ")' ";
                output += "bgcolor='" + this.m_cell.DEAD + "' ";
                output += "width='10' height='5' ";
                output += "></td>";
            }
            output += "</tr>"
        }
        output += "</table>";
        document.getElementById("boardDiv").innerHTML = output;
        output = "<br>";

        output += "<button id='startB' onclick='run()' disabled='true'>Start</button>";
        output += "<button id='stop' onclick='stop()' disabled='true'>Stop</button>";
        output += "<button id='restart' onclick='restart()' disabled='true'>Restart</button>";
        document.getElementById("controlDiv").innerHTML = output;
        
        document.getElementById("startB").style.display = "none";
        document.getElementById("stop").style.display = "none";
        document.getElementById("restart").style.display = "none";
    }
    
    input(loc){
        document.getElementById("startB").disabled = false;
        document.getElementById("startB").style.display = "block";
        if(this.m_grid.getCell(loc) == this.m_cell.DEAD){
            this.m_grid.initCell(loc, true);
        }else{
            this.m_grid.initCell(loc, false);
        }
    }

    run(){
        document.getElementById("startB").disabled = true;
        document.getElementById("startB").style.display = "none";
        document.getElementById("stop").disabled = false;
        document.getElementById("stop").style.display = "block";
        this.m_grid.refreshGrid();
        this.runHelper();
    }
        
    async runHelper(){
        while(!this.isDone){
            await this.wait(100).then(()=>{
                this.verifyIntegrity();
                this.m_grid.refreshGrid();
            });
        }
        document.getElementById("stop").disabled = true;
        document.getElementById("stop").style.display = "none";
        document.getElementById("restart").disabled = false;
        document.getElementById("restart").style.display = "block";
    }
    
    wait(time){
        return new Promise((resolve)=>{
            setTimeout(resolve, time)
        });
    }

    verifyIntegrity(){
        let loc = 0;
        for(let i = 0; i < this.m_boardSize; i++){
            for(let j = 0; j < this.m_boardSize; j++){
                loc = i + ":" + j;
                let temp = this.m_grid.cellStatus(loc);
                if(this.m_grid.m_arr[i][j] == this.m_cell.ALIVE){
                    if(temp < 2){
                        //underpopulation
                        this.m_grid.updateCell(loc, this.m_cell.DYING);
                    }else if(temp > 3){
                        //overpopulation
                        this.m_grid.updateCell(loc, this.m_cell.DYING);
                    }
                }else if(this.m_grid.m_arr[i][j] == this.m_cell.DEAD){
                    if(temp == 3){
                        //reproduction
                        this.m_grid.updateCell(loc, this.m_cell.GROWING);
                    }
                }
                
            }
        }
    }
}

