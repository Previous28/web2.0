(function () {
    $(function () { new Puzzle(); });

    function Puzzle () {
        this.img = 1;
        this.CreateTiles();
        this.ListenTilesClicks();
        this.ListenStartButtonClick();
        this.ListenResetButtonClick();
        this.ListenChangeButtonClick();
        this.ListenOriginalButtonClick();
        $('#reset').trigger('click');
    }

    Puzzle.prototype.CreateTiles = function () {
        var that = this;
        this.TileList = [];
        $('#main div').each(function (i) {
            var tile = new Tile(this, i);
            that.TileList.push(tile);
            $(this).attr('id', 'b'+i);
        });
        this.TileList[15] = this.BlankTile = new Tile(null, 15);
    };

    Puzzle.prototype.ListenTilesClicks = function () {
        $("#main").click(function (event) {
            var tile = event.target._tile;
            if ($('#status').text() === "别想作弊") { $('#status').css('opacity', 0).text(''); }
            if (tile && tile.CanMove(this.BlankTile)) { tile.Swap(this.BlankTile); this.checkResult();}
        }.bind(this));
    };

    Puzzle.prototype.best = 10000;
    Puzzle.prototype.time = 0;
    Puzzle.prototype.ListenStartButtonClick = function () {
        $('#start').click(function () {
            clearTimeout(this.t);
            this.NewGame();
            $('#oriImg').attr('class','');
        }.bind(this));
    };

    Puzzle.prototype.ListenResetButtonClick = function () {
        $('#reset').click(function () {
            $('#status').css('opacity','0').text('');
            clearTimeout(this.t);
            $.each(this.TileList, function (i, tile) { tile.SetPosition(); tile.UpdatePlace(); });
        }.bind(this));
    };

    Puzzle.prototype.ListenChangeButtonClick = function () {
        $('#changeImg').click(function () {
            if (this.img === 1) { $('#main div').attr('class', 'imag2'); this.img = 2; }
            else if (this.img === 2) { $('#main div').attr('class', 'imag3'); this.img = 3; }
            else { $('#main div').attr('class', 'imag1'); this.img = 1; }
            $('#oriImg').attr('class', '');
            clearTimeout(this.t);
            $('#reset').trigger('click');
        }.bind(this));
    };

    Puzzle.prototype.ListenOriginalButtonClick = function () {
        $('#original').click(function () { $('#oriImg').attr('class', 'oriImg'+this.img); }.bind(this));
    };

    Puzzle.prototype.shuffle = function () {
        var that = this;
        _.times(2000, function () {$(that.TileList[Math.floor(Math.random() * 16)].dom).click();});
    };

    Puzzle.prototype.checkResult = function () {
        if (this.isWin())
            if ($('#status').text() === "") {$('#status').css('opacity', 1).text("别想作弊"); }
            else {
                $('#status').css('opacity', 1);
                if (this.time < this.best) {this.best = this.time; $('#status').text("恭喜你，挑战成功并且打破了记录！"+"用时："+parseInt(this.time/60)+" m "+(this.time%60)+" s");}
                else $('#status').text("恭喜你，挑战成功！"+"用时："+parseInt(this.time/60)+" m "+(this.time%60)+" s");
                clearTimeout(this.t);
            }
    };

    Puzzle.prototype.isWin = function () {
        for (var i = 0; i < this.TileList.length; ++i)
            if (this.TileList[i].row != Math.floor(i / 4) || this.TileList[i].col != i % 4)
                return false;
        return true;
    };

    Puzzle.prototype.NewGame = function () {
        $('#status').css('opacity', 0).text('');
        this.shuffle();
        this.time = 0;
        this.SetTime();
    };

    Puzzle.prototype.SetTime = function (argument) {
        var that = this;
        this.time++;
        $('#status').css('opacity', 1).text("用时："+parseInt(this.time/60)+" m "+(this.time%60)+" s");
        this.t = setTimeout(function () {that.SetTime();}, 1000);
    };

    function Tile (dom, num) {
        this.dom = dom;
        this.num = num;
        if (dom) {
            this.dom._tile = this;
            $(this.dom).addClass('imag1');
            this.SetPosition();
            this.UpdatePlace();
        }
    }

    Tile.prototype.height = Tile.prototype.width = 88;
    Tile.prototype.SetPosition = function () {
        this.row = Math.floor(this.num / 4);
        this.col = this.num % 4;
    };

    Tile.prototype.GetPlace = function () {
        return {
            top: this.row * this.height,
            left: this.col * this.width
        };
    };

    Tile.prototype.UpdatePlace = function () {
        var TempPlace = this.GetPlace();
        $(this.dom).css('top', TempPlace.top).css('left', TempPlace.left);
    };

    Tile.prototype.CanMove = function (BlankTile) {
        if ((this.row == BlankTile.row && Math.abs(this.col - BlankTile.col) === 1) ||
            (this.col == BlankTile.col && Math.abs(this.row - BlankTile.row) === 1)) {
                return true;
            }
        return false;
    };

    Tile.prototype.Swap = function (BlankTile) {
        var temp = this.row;
        this.row = BlankTile.row;
        BlankTile.row = temp;
        temp = this.col;
        this.col = BlankTile.col;
        BlankTile.col = temp;
        BlankTile.UpdatePlace();
        this.UpdatePlace();
    };
})();