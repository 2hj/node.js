getList(0);
getindex();

//질문 리스트 구현 함수
function getList(offset) {
  fetch('/question/'+offset, { method: 'GET' })
  .then((result) => {
    if(result.status == '200') {
      return result.json();
    }
  })
  .then((resJson) => {
    const questions = resJson;
    var tbody = document.querySelector('#question-list tbody');
    tbody.innerHTML = '';
    questions.map((question) => {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      var a = document.createElement('a');
      td.textContent = question.q_id;
      tr.appendChild(td);
      td = document.createElement('td');
      a = document.createElement('a');
      a.textContent = question.q_title;
      a.setAttribute('href','/read/?no='+question.q_id+'&mo='+question.q_user_id);
      td.appendChild(a);
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = question.q_name;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = formChange(question.updatedAt);
      tr.appendChild(td);
      tbody.appendChild(tr);
    });
  })
  .catch((err) => {
    console.error('질문 리스트 함수에서 에러발생: '+ err.message);
  });
}
//날짜 form change 함수
function formChange(str) {
  const day = new Date(str);
  const year = day.getFullYear();
  const month = day.getMonth()+1;
  const date = day.getDate();
  var response = "";
  response += year+"."
  response += (month < 10) ? "0"+month+"." : month+".";
  response += (date < 10) ? "0"+date+"." : date+".";

  return response;
}
//질문 하단 숫자 메뉴얼 구현 함수
function getindex() {
  fetch('/question', { method: 'GET' })
  .then((result) => {
    if(result.status = '200') {
      return result.json();
    }
  })
  .then((resJson) => {
    const res = resJson.length;
    var thead = document.querySelector('#question-index thead');
    thead.innerHTML = '';
    var tr = document.createElement('tr');
    var th;
    for(var i=0;i<res/10;i++) {
      th = document.createElement('th');
      th.textContent = i+1;
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    document.querySelectorAll('#question-index th').forEach(function (element) {
      element.addEventListener('click', function() {
        var offset = (parseInt(element.textContent)-1)*10;
        getList(offset);
      });
    });
  })
  .catch((err) => {
    console.error('질문 하단 숫자 메뉴얼 함수에서 에러발생: '+ err.message);
  });
}
//글쓰기 버튼 페이지 이동 이벤트 구현
document.querySelector('#go-write').addEventListener('click', () => {
  location.href = '/write';
});