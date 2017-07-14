(function () {
    $(function () { new MoleGame(); });

    function MoleGame () {
        this.CreateButtons();
        this.CreateHoles();
        this.ListenHolesClicks();
        this.listenStartButtonClick();
        this.disabled();
    }

    var m = MoleGame.prototype;
    m.time = 30;
    m.score = 0;
    m.start = m.gameOver = false;

    m.CreateButtons = function () {
        _.times(60, function () {
            var button = $('<button></button>');
            $('#main').append(button);
        });
    };

    m.CreateHoles = function () {
        var that = this;
        m.holeList = [];
        $('#main button').each(function (i) {
            var hole = new Hole(this, i);
            that.holeList.push(hole);
        });
    };

    m.ListenHolesClicks = function () {
        var that = this;
        _.times(that.holeList.length, function (i) { that.holeList[i].hit(); });
    };

    m.listenStartButtonClick = function () {
        $('#startAndStopButton').click(function () {
            if (!m.start) {m.startGame();}
            else {m.stopGame();}
        });
    };

    m.startGame = function () {
        $('#status').val("Playing");
        m.start = true;
        if (m.gameOver) { $('#score').val(0); m.score = 0; m.gameOver = false; }
        else { $('#score').val(m.score); }
        this.reset().enable().createMole().settime();
    };

    m.stopGame = function () {
        $('#status').val("Stop");
        m.start = false;
        this.stopCount().disabled();
    };

    m.settime = function () {
        var that = this;
        if (this.time === 0) {
            this.gameOverFunction();
            this.time = 30;
            return;
        } else {this.gameContinueFunction();}
        this.t = setTimeout(function() { that.settime();},1000);
    };

    m.gameOverFunction = function () {
        $('#status').val("Game Over");
        $('#timeLeft').val(this.time);
        this.deleteMole();
        alert("Game Over!\nYour score is " + this.score + '.');
        this.gameOver = true;
        this.stopCount().disabled();
        this.start = false;
    };

    m.gameContinueFunction = function () {
        $('#timeLeft').val(this.time);
        this.time--;
    };

    m.stopCount = function () {
        clearTimeout(m.t);
        return this;
    };

    m.reset = function () {
        var that = this;
        for (var i = 0; i < that.holeList.length; ++i)
            $(that.holeList[i].dom).attr('class', 'hole').val("0");
        return this;
    };

    m.createMole = function () {
        var that = this;
        this.numOfHamster = Math.floor(Math.random() * 60);
        $(that.holeList[this.numOfHamster].dom).attr('class', 'select').val('1');
        return this;
    };

    m.deleteMole = function () {
        $(this.holeList[this.numOfHamster].dom).attr('class', 'hole').val('0');
    };

    m.enable = function () {
        var that = this;
        _.times(that.holeList.length, function (i) { $(that.holeList[i].dom).attr('disabled', false); });
        return this;
    };

    m.disabled = function () {
        var that = this;
        _.times(that.holeList.length, function (i) { $(that.holeList[i].dom).attr('disabled', true); });
        return this;
    };

    function Hole (dom, num) {
        this.dom = dom;
        this.num = num;
        this.dom._hole = this;
        $(this.dom).attr('class', 'hole').attr('value', '0');
    }

    Hole.prototype.hit = function () {
        $(this.dom).click(function () {
            if ($(this.dom).val() === "0") { m.score--; $('#score').val(m.score); }
            else { m.score++; $('#score').val(m.score); m.deleteMole(); m.createMole();}
        }.bind(this));
    };
})();