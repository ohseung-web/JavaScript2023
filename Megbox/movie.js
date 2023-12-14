//예매좌석 100좌석 2차원 배열로 지정
const seatArray = Array.from(Array(10), () => new Array(10));

const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //좌석 열 알파벳

let seat = document.querySelector('.seat');
function reserveSeat() {
  let seatTable = "<table class='seattable' >";
  for (let i = 0; i < seatArray.length; i++) {
    seatTable += '<tr>';
    seatTable += "<td class='alpha'>" + alpha[i] + '</td>';
    for (let j = 0; j < seatArray[0].length; j++) {
      seatTable += '<td class="seatTd">' + (j + 1) + '</td>';
    }
    seatTable += '</tr>';
  }
  seatTable += '</table>';
  seat.innerHTML = seatTable;
}
reserveSeat();

// 총인원수 8명까지 예약가능
var totalPeople = 0;
var audaltPeople = 0; //성인 인원수
var teenagerPeople = 0; //청소년 인원수
var disabledPeople = 0; //우대 인원수
var seatChk = 0;
var possiblePeople = 0; //선택가능 인원수
var seatchk2 = 0;

let plusBtn = document.querySelectorAll('.plus');
let minusBtn = document.querySelectorAll('.minus');
let cnt = document.querySelectorAll('.cnt');
let seatTd = document.querySelectorAll('.seatTd');
// plus 버튼 클릭시  cnt 증가
for (let i = 0; i < plusBtn.length; i++) {
  plusBtn[i].addEventListener('click', () => {
    totalPeople = audaltPeople + teenagerPeople + disabledPeople;
    if (
      totalPeople === 8 ||
      audaltPeople === 8 ||
      teenagerPeople === 8 ||
      disabledPeople === 8
    ) {
      alert('예매 인원은 8명까지 가능합니다.');
    } else {
      if (i === 0) {
        audaltPeople++;
        cnt[i].innerHTML = audaltPeople;
      } else if (i === 1) {
        teenagerPeople++;
        cnt[i].innerHTML = teenagerPeople;
      } else {
        disabledPeople++;
        cnt[i].innerHTML = disabledPeople;
      }
    }
    evenSeatImgChang();
  });
}
// console.log(minusBtn);
// minus 클릭시 cnt 감소
for (let i = 0; i < minusBtn.length; i++) {
  minusBtn[i].addEventListener('click', () => {
    if (cnt[i].innerHTML > 0) {
      if (i === 0) {
        audaltPeople--;
        cnt[i].innerHTML = audaltPeople;
      } else if (i === 1) {
        teenagerPeople--;
        cnt[i].innerHTML = teenagerPeople;
      } else {
        disabledPeople--;
        cnt[i].innerHTML = disabledPeople;
      }
    }
    evenSeatImgChang();
  });
}

// 좌석 예매
// console.log(seatTd);
for (let i = 0; i < seatTd.length; i++) {
  seatTd[i].addEventListener('click', () => {
    totalPeople = audaltPeople + teenagerPeople + disabledPeople;
    if (audaltPeople === 0 && teenagerPeople === 0 && disabledPeople === 0) {
      alert('인원을 선택해 주세요!!');
    } else {
      // console.log(seatTd[i]);
      if (totalPeople === 1) {
        seatTd[i].classList.add('choice');
        evenCancel();
      } else if (totalPeople >= 2 && totalPeople <= 8) {
        if (i % 2 === 0) {
          seatTd[i].classList.remove('common');
          seatTd[i + 1].classList.remove('common');
          seatTd[i].classList.add('choice');
          seatTd[i + 1].classList.add('choice');
          evenCancel();
        } else {
          seatTd[i].classList.remove('common');
          seatTd[i - 1].classList.remove('common');
          seatTd[i].classList.add('choice');
          seatTd[i - 1].classList.add('choice');
          evenCancel();
        }
      }
    }
    //예매 취소
  });
}

//좌석 마우스 오버
for (let i = 0; i < seatTd.length; i++) {
  seatTd[i].addEventListener('mouseover', () => {
    if (totalPeople === 1) {
      seatTd[i].classList.add('hover');
    } else if (totalPeople === 2) {
      if (i % 2 === 0) {
        seatTd[i].classList.add('hover');
        seatTd[i + 1].classList.add('hover');
      } else {
        seatTd[i].classList.add('hover');
        seatTd[i - 1].classList.add('hover');
      }
    }

    if (audaltPeople === 0 && teenagerPeople === 0 && disabledPeople === 0) {
      seatTd[i].classList.remove('hover');
    }
  });
}
// 마우스 오버 해제

// 인원수가 1명일때 짝수 자리 이미지 변경 함수
function evenSeatImgChang() {
  totalPeople = audaltPeople + teenagerPeople + disabledPeople;
  if (
    (audaltPeople === 1 && totalPeople === 1) ||
    (teenagerPeople === 1 && totalPeople === 1) ||
    (disabledPeople === 1 && totalPeople === 1)
  ) {
    for (let i = 0; i < seatTd.length; i++) {
      for (let j = 0; j < seatTd.length; j++) {
        if (j % 2 != 0) {
          seatTd[j].classList.add('odd');
        }
      }
    }
  } else {
    evenCancel();
  }
}
function evenCancel() {
  for (let i = 0; i < seatTd.length; i++) {
    for (let j = 0; j < seatTd.length; j++) {
      if (j % 2 != 0) {
        seatTd[j].classList.remove('odd');
      }
    }
  }
}

//버튼 클릭시 영화시간 목록 출력
let nowbtn = document.querySelector('.now');
let list = document.querySelector('.movieDesc .theaterDesc .time .other li');

nowbtn.addEventListener('click', () => {
  if (document.querySelector('.listadd')) {
    list.classList.remove('listadd');
    nowbtn.classList.remove('stylechange');
  } else {
    list.classList.add('listadd');
    nowbtn.classList.add('stylechange');
  }
});
