if(!state) {
  const id = document.querySelector('#q_id').value;

  getQuestion(id);

  function getQuestion(id) {
    fetch('/question', { method: 'GET' } )
    .then((result) => {
      if(result.status == '200') {
        return result.json();
      }
    })
    .then((resJson) => {
      const questions = resJson;
      questions.map((question) => {
        if(question.q_id==id) {
          document.querySelector('#title').value = question.q_title;
          var qus = question.q_question.split('<br>').join('\n');
          document.querySelector('#question').value = qus;
        }
      });
    })
    .catch((err) => {
      console.error('글 불러오는 중 에러발생: '+ err.message)
    });
  }
}

//수정 및 저장 이벤트
document.getElementById('question-create-form').addEventListener('submit', (e) => {
  e.preventDefault();
  var user_id = e.target.user_id.value;
  var name = e.target.name.value;
  var title = e.target.title.value;
  var question = e.target.question.value;

  if(!title.trim()) {
    e.target.title.value = '';
    return alert('제목을 입력하세요.');
  }else if(!question.trim()) {
    e.target.question.value = '';
    return alert('내용을 입력하세요.');
  }

  question = question.replace(/(?:\n)/g, "<br>");

  if(state) {
    fetch('/question', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        q_user_id: user_id,
        q_name: name,
        q_title: title,
        q_question: question
      })
    })
    .then((result) => {
      if(result.status == '201') {
        location.href='/menu3'
      }
    })
    .catch((err) => {
      console.error('작성한 글 저장 중 에러발생: '+ err.message);
    });
  }else {
    const id = document.querySelector('#q_id').value;
    const ida = document.querySelector('#u_id').value;
    fetch('/question/'+id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        q_title: title,
        q_question: question
      })
    })
    .then((result) => {
      if(result.status == '200') {
        return result.json();
      }
    })
    .then((resJson) => {
      const question = resJson;
      location.href = '/read/?no='+id+'&mo='+ida;
    })
    .catch((err) => {
      console.error('작성한 글 수정 중 에러발생: '+ err.message);
    });
  }
  
});
//목록으로
document.querySelector('#content-back #back').addEventListener('click', () =>  location.href='/menu3');