class Grid{
    m_size;
    m_arr;
    m_cell;

    constructor(size){
        let conf = new Config();
        this.m_cell = conf.cell;
        this.m_size = size;
        this.m_arr = new Array(this.m_size);
        for(let i = 0; i < this.m_size; i++){
            this.m_arr[i] = new Array(this.m_size);
            for(let j = 0; j < this.m_size; j++){
                this.m_arr[i][j] = this.m_cell.DEAD;
            }
        }
    }

    updateCell(loc, type){
        let row = this.rowCoor(loc);
        let col = this.colCoor(loc);
        this.m_arr[row][col] = type;
    }

    initCell(loc, isNew){
        let row = this.rowCoor(loc);
        let col = this.colCoor(loc);
        if(isNew){
            this.updateCell(loc, this.m_cell.GROWING);
        }else{
            this.updateCell(loc, this.m_cell.DEAD);
        }
        document.getElementById("board").rows[row].cells[col].style.backgroundColor = this.m_arr[row][col];
    }

    cellStatus(loc){
        let count = 0;
        let row = this.rowCoor(loc);
        let col = this.colCoor(loc);
        let curRow = 0;
        let curCol = 0;

        for(let i = -1; i < 2; i++){
            curRow = row + i;
            for(let j = -1; j < 2; j++){
                curCol = col + j;
                if(!(curRow == row && curCol == col) && (curRow >= 0 && curRow < this.m_size) && (curCol >= 0 && curCol < this.m_size)){
                    if(!(this.m_arr[curRow][curCol] == this.m_cell.DEAD || this.m_arr[curRow][curCol] == this.m_cell.GROWING)){
                        count++;
                    }
                }
            }
        }
        return count;
    }

    rowCoor(loc){
        return parseInt(loc.substring(0, loc.indexOf(":")));
    }

    colCoor(loc){
        return parseInt(loc.substring(loc.indexOf(":") + 1));
    }

    refreshGrid(){
        let loc = 0;
        for(let i = 0; i < this.m_size; i++){
            for(let j = 0; j < this.m_size; j++){
                loc = i + ":" + j;
                if(this.m_arr[i][j] == this.m_cell.DYING){
                    this.updateCell(loc, this.m_cell.DEAD);
                }else if(this.m_arr[i][j] == this.m_cell.GROWING){
                    this.updateCell(loc, this.m_cell.ALIVE);
                }
                document.getElementById("board").rows[i].cells[j].style.backgroundColor = this.m_arr[i][j];
            }
        }
    }

    getCell(loc){
        return this.m_arr[this.rowCoor(loc)][this.colCoor(loc)];
    }
}