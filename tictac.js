function init() {

    $('.gameboard').hide();
    $('#x')[0].checked = true;
    $('#o')[0].checked = false;
    $('#you')[0].checked = false;
    $('#computer')[0].checked = true;
}

let userLetter = 'X',
    computerLetter = 'O';

turnCount = 0;

winCombos = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a3', 'b2', 'c1'],
    ['a1', 'b2', 'c3'],
];

$('.game-tile').click(e => {
    if ($('#' + e.currentTarget.id).html() === '&nbsp;') {
        $('#' + e.currentTarget.id).html(userLetter);
        turn = 'user';
        turnCount++;
        (turnCount > 4) ? getWinner() : computerMove();
    } else {
        return;
    }
});

function computerMove() {
    turn = 'computer';
    const cellIds = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3'],
        cornerCellIds = ['a1', 'a3', 'c1', 'c3'];
    var computerWin = '',
        computerBlock = '';
    if (turnCount > 2) {
        winCombos.map(v => {

            let a = $('#' + v[0]).html(),
                b = $('#' + v[1]).html(),
                c = $('#' + v[2]).html();

            if (a === computerLetter && b === a && c === '&nbsp;') {
                computerWin = v[2];
            } else if (a === computerLetter && b === '&nbsp;' && c === a) {
                computerWin = v[1];
            } else if (a === '&nbsp;' && b === computerLetter && c === b) {
                computerWin = v[0];
            } else if (a === userLetter && b === a && c === '&nbsp;') {
                computerBlock = v[2];
            } else if (a === userLetter && b === '&nbsp;' && c === a) {
                computerBlock = v[1];
            } else if (a === '&nbsp;' && b === userLetter && c === b) {
                computerBlock = v[0];
            }
        });
    }

    if (computerBlock.length < 1 && computerWin.length < 1) {
        var availableTiles = cellIds.filter(function (e) { return $('#' + e).html() === '&nbsp;'; });
        var computerBlock = availableTiles[Math.floor(Math.random() * (availableTiles.length))];
    }

    if (computerWin.length > 0) {
        $("#" + computerWin).html(computerLetter);
    } else {
        $("#" + computerBlock).html(computerLetter);
    }

    turnCount++;
    if (turnCount > 4) getWinner();
    return;
}

function getWinner() {

    winCombos.map(v => {
        var a = $('#' + v[0]).html(),
            b = $('#' + v[1]).html(),
            c = $('#' + v[2]).html();

        if (a !== '&nbsp;' && a === b && b === c) {
            var winner = turn;

            $('#' + v[0]).parent('div').addClass('winning-tile');
            $('#' + v[1]).parent('div').addClass('winning-tile');
            $('#' + v[2]).parent('div').addClass('winning-tile');
            $('.winning-tile').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

            setTimeout(() => {
                $('.winner-text').html(a + ' wins!');
                alert("Winner Winner Chicken Dinner!!\n" + a + " Wins!\n" + "Click OK below and anywhere on the screen to restart game.");
                $('#winModal').modal();
            }, 500);
            turnCount = 0;
            return;
        }
    });

    if (turnCount === 9) {
        $('.winner-text').html('Draw! Try again!');
        alert("Draw! Try again!")
        $('#winModal').modal();
        turnCount = 0;
        return;
    }


    if (turn !== 'computer') computerMove();
    return;
}

function restartGame() {
    $('#winModal').modal('hide');
    $('.gameboard').hide('slow').rotate(360);
    $('.options, .title, .welcome-text').show('slow');
    turnCount = 0;
    $('.game-tile').html('&nbsp;');
    $('.game-tile').parent('div').removeClass('winning-tile');
}

$('#winModal').on('hidden.bs.modal', restartGame)
$('.refresh').click(restartGame)

$('#x').click(() => {
    if ($('#o')[0].checked === true) $('#o')[0].checked = false;

    userLetter = 'X';
    computerLetter = 'O';
});

$('#o').click(() => {
    if ($('#x')[0].checked === true) $('#x')[0].checked = false;

    userLetter = 'O';
    computerLetter = 'X';
});

$('#you').click(() => {
    if ($('#computer')[0].checked === true) $('#computer')[0].checked = false;
});

$('#computer').click(() => {
    if ($('#you')[0].checked === true) $('#you')[0].checked = false;
});

$('.start-btn').click(() => {
    $('.options').hide('');
    $('.gameboard').show('slow').rotate(360);
    $('.title').fadeOut('slow');
    if ($('#computer')[0].checked === true) computerMove();
});

$.fn.rotate = function (degrees, step, current) {
    let $this = $(this);
    current = current || 0, step = step || 5, current += step;
    $this.css('transform', 'rotate(' + current + 'deg)');
    if (current !== degrees) setTimeout(() => $this.rotate(degrees, step, current), 5);
}

$(document).ready(init);
