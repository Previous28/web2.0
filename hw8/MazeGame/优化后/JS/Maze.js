(function () {
    $(function () { new Maze(); });

    function Maze () {
        this.CreateWalls();
        this.ListenIfStart();
        this.ListenIfOut();
        this.ListenIfEnd();
    }

    var m = Maze.prototype; m.start = false;
    m.exit = false; m.lose = false;

    m.CreateWalls = function () {
        var that = this;
        this.wallList = [];
        $('#main .wall').each(function (i) {
            var wall = new Wall(this, i);
            that.wallList.push(wall);
        });
    };

    m.ListenIfStart = function () {
        $('#start').mouseover(function () {
            m.exit = m.lose = false;
            m.start = true;
            $('#result').css('opacity', 0).text('');
            this.reset();
            this.check();
        }.bind(this));
    };

    m.ListenIfOut = function () {
        $('#main').mouseleave(function () {
            if (m.start === true) m.exit = true;
        }.bind(this));
    };

    m.ListenIfEnd = function () {
        $('#end').mouseover(function () {
            if (m.start === true && m.exit === false && m.lose === false) { this.win(); }
            else if (m.start === true && m.exit === true && m.lose === false) { this.cheat(); }
            else if (m.start === false) {this.cheat();}
        }.bind(this));
    };

    m.reset = function () {
        for (var i = 0; i < this.wallList.length; ++i)
            this.wallList[i].reCover();
    };

    m.check = function () {
        for (var i = 0; i < this.wallList.length; ++i) {
            this.wallList[i].ifLose(); 
            this.wallList[i].reCover();
        }
    };

    m.win = function (argument) {
        $('#result').css('opacity', 1).text('You Win!');
        m.start = false;
    };

    m.cheat = function () {
        $('#result').css('opacity', 1).text("'Don't cheat, you should start form the 's' and move to the 'E' inside the maze!'");
        m.lose = true;
    };

    function Wall (dom, num) {
        this.dom = dom;
        this.num = num;
        $(this.dom).attr('id','wall'+this.num);
    }

    Wall.prototype.ifLose = function () {
        $(this.dom).mouseover(function () {
            if (m.start === true && m.lose === false) {
                $(this.dom).attr('class', 'redwall');
                m.lose = true;
                m.start = false;
                $('#result').css('opacity', 1).text('You Lose!');
            }
        }.bind(this));
    };

    Wall.prototype.reCover = function () {
        $(this.dom).mouseout(function () { $(this.dom).attr('class', 'wall'); }.bind(this));
    };
})();