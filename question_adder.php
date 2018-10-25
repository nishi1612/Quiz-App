<style> <?php include('style.css');?> </style>
<?php include('conn.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Quiz</title>
	<link rel="stylesheet" href="style.css" type = "style/css">
</head>
<body>
  	
  	<div class="grid">
  		<div id="quiz">
  	<h1>Question Bank</h1>
        <hr style="margin-bottom: 20px">
        <form action="question_adder.php" method="post">
          <input placeholder="Enter your question here" name = "question" type="text" name="question" id="question" style = "width: 100%; text-align: center;">
        <div class="buttons">
          <input placeholder="First Option" type="text" name="choice01" id="choice01">
          <input placeholder="Second Option" type="text" name="choice02" id="choice02">
          <input placeholder="Third Option" type="text" name="choice03" id="choice03">
          <input placeholder="Fourth Option" type="text" name="choice04" id="choice04">
         </div>
        <hr style="margin-top: 20px">
    
          <input name="answer" placeholder="Answer" type="text" id="answer">
          <button type="submit" name="submit" value="submit" id="next">Add</button>
        </form>
          <button id="done">Done</button>
       
      </div>
    </div>

<script type="text/javascript">
  var done = document.getElementById("done");
    done.onclick = function(){
    window.open("main.php","_self");
  }
</script>

</body>
</html>
<?php
  if(isset($_REQUEST['submit'])){
    $que = $_REQUEST['question'];
    $c1 = $_REQUEST['choice01'];
    $c2 = $_REQUEST['choice02'];
    $c3 = $_REQUEST['choice03'];
    $c4 = $_REQUEST['choice04'];
    $ans = $_REQUEST['answer'];
    $f=0;
    if($que=='') $f=2;
    if($ans=='') $f=2;
    if($c1=='') $f=2;
    if($c2=='') $f=2;
    if($c3=='') $f=2;
    if($c4=='') $f=2;
    if($f==2){
      ?>
      <script type="text/javascript">
        alert("Either of the required quantities are not filled");
        window.location("question_adder.php");
      </script>
      <?php
    }else{
      if($ans==$c1) $f=1;
      if($ans==$c2) $f=1;
      if($ans==$c3) $f=1;
      if($ans==$c4) $f=1;
      if($f==0){
        ?> 
        <script type="text/javascript">
          alert("Answer written is not one of the given options");
          window.location("question_adder.php");
        </script>
        <?php
      }else{
        $sqli = "insert into questions(question,choice1,choice2,choice3,choice4,answer) values ('$que',
        '$c1','$c2','$c3','$c4','$ans')";
        $req = $conn->query($sqli);
        if($req){
          ?>
          <script type="text/javascript">
            alert("Added the question");
            window.location="question_adder.php";      
          </script>
          <?php
        }
      }
    }
  }
?>


