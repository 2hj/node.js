const id = document.querySelector('#q_id').value;//q_id

getQuestion(id);
getAnswer(id);

function getQuestion(id) {
  fetch('/question', { method: 'GET' })
  .then((result) => {
    if(result.status == '200') {
      return result.json();
    }
  })
  .then((resJson) => {
    const questions = resJson;
    questions.map((question) => {
      if(question.q_id==id) {
        document.querySelector('#read-big-title').textContent = question.q_title;
        document.querySelector('#read-small-title').textContent = question.q_title;
        document.querySelector('#read-name').textContent = question.q_name;
        document.querySelector('#read-question').innerHTML = question.q_question;
      }
    });
  })
  .catch((err) => {
    console.error('글 불러오는 중 에러발생: '+ err.message);
  })
}

if(allowQus) {
  const u_id = document.querySelector('#userid').value;
  //글 수정
  document.querySelector('#question-update').addEventListener('click' , () => {
    location.href = '/write/?no='+id+'&mo='+u_id;
  });
  //글삭제
  document.querySelector('#question-delete').addEventListener('click' , () => {
    fetch('/question/'+id, { method: 'DELETE' })
    .then((result) => {
      if(result.status == '200') {
        location.href = '/menu3'
      }
    })
    .catch((err) => {
      console.error('글 삭제 시 에러발생: '+ err.message);
    });
  });
}

//댓글 등록 시
if(allowAns) {
  document.querySelector('#answer-form').addEventListener('submit', (e) => {
    e.preventDefault();//기본적인 submit 행동 취소
    var userId = e.target.userid.value;
    var name = e.target.username.value;
    var answer = e.target.answer.value;
    var targetId = e.target.targetid.value;

    answer = answer.replace(/(?:\n)/g, "<br>");//정규식 사용
    
    if(!answer.trim()) {
      e.target.answer.value = '';
      return alert('댓글을 입력하세요.');
    }
  
    fetch('/answer', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        a_user_id: userId,
        a_name: name,
        a_answer: answer,
        a_target_id: targetId
      })
    })
    .then((result) => {
      if(result.status == '201') {
        getAnswer(id);
      }
    })
    .catch((err) => {
      console.error('댓글 등록 시 에러발생: '+ err.message);
    });
    e.target.answer.value = '';
  });
}

//댓글 불러오기 함수
function getAnswer(id) {//id: a_target_id
  fetch('/answer/'+id, { method: 'GET' })
  .then((result) => {
    if(result.status = '200') {
      return result.json();
    }
  })
  .then((resJson) => {
    const answers = resJson;
    document.querySelector('#total-answer').textContent = "댓글 "+ answers.length;
    var tbody = document.querySelector('#answer-read tbody');
    tbody.innerHTML = '';
    answers.map((answer) => {
      var { resdate, restime } = formChange(answer.updatedAt);
      var tr = document.createElement('tr');//이름,날짜,시간,답글,수정,삭제  //댓글내용
      var th = document.createElement('th');
      var td = document.createElement('td');
      th.textContent = answer.a_name;
      tr.appendChild(th);
      td.textContent = resdate;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = restime;
      tr.appendChild(td);
      
      if(allowAns) {
        var logingid = document.getElementById('userid').value;
        if(logingid == answer.a_user_id) {
          var a = document.createElement('a');
          a.textContent = "답글";
          a.addEventListener('click', () => {
            alert('미구현');
          });
          td = document.createElement('td');
          td.appendChild(a);
          tr.appendChild(td);
          var button = document.createElement('button');
          button.textContent = "수정";
          button.addEventListener('click', () => {
            var newAnswer = prompt('바꿀 내용을 입력하세요.');
            try {
              if(!newAnswer.trim()) {
                return alert('내용을 반드시 입력해 주세요.');
              }
            }catch(err) {
              return alert('내용을 반드시 입력해 주세요.');
            }
            fetch('/answer/'+answer.a_id, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'PATCH',
              body: JSON.stringify({ a_answer: newAnswer })
            })
            .then((res) => {
              if(res.status == '200') {
                getAnswer(id);
              }
            })
            .catch((err) => {
              console.error("댓글 수정 이벤트에서 에러발생: " + err.message);
            })
          });
          td = document.createElement('td');
          td.appendChild(button);
          tr.appendChild(td);
          button = document.createElement('button');
          button.textContent = "삭제";
          button.addEventListener('click', () => {
            fetch('/answer/'+answer.a_id, { method: 'DELETE' })
            .then((res) => {
              if(res.status == '200') {
                getAnswer(id);
              }
            })
            .catch((err) => {
              console.error("댓글 삭제 이벤트에서 에러발생: " + err.message);
            })
          });
          td = document.createElement('td');
          td.appendChild(button);
          tr.appendChild(td);
        }else {
          var a = document.createElement('a');
          a.textContent = "답글";
          a.addEventListener('click', () => {
            alert('미구현');
          });
          td = document.createElement('td');
          td.setAttribute('colspan', '3');
          td.appendChild(a);
          tr.appendChild(td);
        }
      }else {
        td = document.createElement('td');
        td.setAttribute('colspan', '3');
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      tr = document.createElement('tr');
      td = document.createElement('td');
      td.setAttribute('colspan', '6');
      td.innerHTML = answer.a_answer;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }); 
  })
  .catch((err) => {
    console.error('댓글 불러오기 함수에서 에러발생: '+ err.message);
  });
}
//날짜 form change 함수(업그레이드 버전)
function formChange(str) {
  const day = new Date(str);
  const year = day.getFullYear();
  const month = day.getMonth()+1;
  const date = day.getDate();
  const hour = day.getHours();
  const min = day.getMinutes();

  var resdate = "";
  resdate += year+"."
  resdate += (month < 10) ? "0"+month+"." : month+".";
  resdate += (date < 10) ? "0"+date+"." : date+".";
  var restime = "";
  restime += (hour < 10) ? "0"+hour+":" : hour+":";
  restime += (min < 10) ? "0"+min : min;

  return {resdate: resdate, restime: restime};
}

//목록으로
document.querySelector('#content-back #back').addEventListener('click', () =>  location.href='/menu3');