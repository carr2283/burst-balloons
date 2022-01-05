$(document).ready(function () {
  let puzzle = []
  let puzzleHistory = []
  let scoreHistory = []
  let score = 0

  $("#new-puzzle").click(function () {
    puzzleString = $("#puzzle-size").val();

    $(".error-message").empty();
    if (puzzleString === "") {
      $(".error-message").html("<span> Error: please input a puzzle </span>");
      return false;
    }
    puzzle = puzzleString.split(', ');
    puzzleHistory = []
    scoreHistory = []
    score = 0
    puzzleHistory.push([...puzzle]);
    scoreHistory.push(0);

    renderPuzzle(puzzle);
    setScore(score);
  });

  $(".undo").on("click", (event) => {
    puzzle = puzzleHistory[puzzleHistory.length - 1];
    score = scoreHistory[scoreHistory.length - 1];
    if (puzzleHistory.length > 1) {
      puzzleHistory.pop();
      scoreHistory.pop();
    }
    renderPuzzle(puzzle);
    setScore(score);
  })

  $(".reset").on("click", (event) => {
    puzzleHistory = [puzzleHistory[0]];
    scoreHistory = [scoreHistory[0]];
    puzzle = [...puzzleHistory[0]];
    score = scoreHistory[0];

    renderPuzzle(puzzle);
    setScore(score);
  })

  $(".puzzle-container").on("click", '.balloon', (event) => {
    console.log('clicked');
    let idx = $(event.target).parent().index();

    puzzleHistory.push([...puzzle]);
    scoreHistory.push(score);

    let left = idx > 0 ? puzzle[idx - 1] : 1;
    let right = idx < puzzle.length - 1 ? puzzle[idx + 1] : 1;
    let mid = puzzle[idx];

    puzzle.splice(idx, 1);

    score += left * mid * right;    
    renderPuzzle(puzzle);
    setScore(score);
  })

  $(".puzzle-container").on("mouseenter", ".balloon", (event) => {
    // hover starts code here
    console.log('hover');
    let idx = $(event.target).parent().index();
    let left = idx > 0 ? idx - 1 : 1;
    let right = idx < puzzle.length - 1 ? idx + 1 : 1;

    let $leftChild = $(".puzzle-container div:nth-child(" + (left + 1) + ")");
    let $midChild = $(".puzzle-container div:nth-child(" + (idx + 1) + ")");
    let $rightChild = $(".puzzle-container div:nth-child(" + (right + 1) + ")");

    $leftChild.css({'filter': 'brightness(0.95)'})
    $leftChild.css({'filter': 'sepia(40%)'})

    $midChild.css({'filter': 'brightness(0.85)'})
    $midChild.css({'filter': 'sepia(80%)'})

    $rightChild.css({'filter': 'brightness(0.95)'})
    $rightChild.css({'filter': 'sepia(40%)'})
  });

  $(".puzzle-container").on("mouseout", ".balloon", (event) => {
    console.log('exit');

    let idx = $(event.target).parent().index();
    let left = idx > 0 ? idx - 1 : 1;
    let right = idx < puzzle.length - 1 ? idx + 1 : 1;

    let $leftChild = $(".puzzle-container div:nth-child(" + (left + 1) + ")");
    let $midChild = $(".puzzle-container div:nth-child(" + (idx + 1) + ")");
    let $rightChild = $(".puzzle-container div:nth-child(" + (right + 1) + ")");
    
    $leftChild.css({'filter': 'brightness(1.00)'})
    $leftChild.css({'filter': 'sepia(0%)'})

    $midChild.css({'filter': 'brightness(1.00)'})
    $midChild.css({'filter': 'sepia(0%)'})

    $rightChild.css({'filter': 'brightness(1.00)'})
    $rightChild.css({'filter': 'sepia(0%)'})
  });

  const renderPuzzle = (puzzle) => {
    balloonsHtmlString = "";
    puzzle.forEach((element, idx) => {

      balloonsHtmlString = balloonsHtmlString + 
                                  '<div class="balloon shrink-on-click">' +
                                      '<img src="../public/party-balloon.png" class="balloon-img" alt="balloon"/>' + 
                                      '<div class="balloon-text">' + 
                                        Number(element) +
                                      '</div>' +
                                  '</div>'
    });
    $( ".puzzle-container" ).html(balloonsHtmlString);
  }

  const setScore = (score) => {
    let scoreString = 'Score: ' + Number(score);
    $('.score').text(scoreString);
  }
});