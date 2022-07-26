
const getElementById = (name) => {
  return document.getElementById(name);
};

const clock = getElementById('clock');
const hoursBlock = getElementById('hours');
const minutesBlock = getElementById('min');
const secondsBlock = getElementById('sec');
const body = document.getElementsByTagName('body')[0];

let now = new Date();
const ONESEC = 1000;
let timerId;
const timeOutToNextSec = () => ONESEC - now.getMilliseconds();


function updateTime(time) {
  if (time < 10) {
    return '0' + time;
  } else {
    return time;
  }
}

const clockUpdate = () => {
  now = new Date();
  hoursBlock.innerText = updateTime(now.getHours());
  minutesBlock.innerText = updateTime(now.getMinutes());
  secondsBlock.innerText = updateTime(now.getSeconds());

  timerId = setTimeout(() => {
    clockUpdate();
  }, ONESEC); 
};

setTimeout(() => {
  clockUpdate();
}, timeOutToNextSec());

const stopButton = getElementById('stop');
const startButton = getElementById('start');
const alarmButton = getElementById('alarm');
const dotsArr = Array.from(document.getElementsByClassName('dot'));
const buttonContainer = getElementById('button__container');

let stopTime;

const stopFunction = () => {
  stopTime = new Date();
  clearTimeout(timerId);

  body.classList.add('BG');

  dotsArr.forEach((element) => {
    element.classList.remove('dot');
  });
  startButton.style.display = 'block';
};
const startFunction = () => {
  let hour = updateTime(stopTime.getHours());
  let min = updateTime(stopTime.getMinutes());
  let sec = updateTime(stopTime.getSeconds());

  body.classList.remove('BG');
  dotsArr.forEach((element) => {
    element.classList.add('dot');
  });



  setInterval(() => {
    let getSec = () => {
      sec++;
      return sec;
    };

    if (sec < 60) {
      secondsBlock.innerText = updateTime(getSec());
    } else {
      min++;

      sec = 0;
      minutesBlock.innerText = updateTime(min);

      secondsBlock.innerText = updateTime(sec);
      getSec();
    }
    if (min >= 60) {
      hour++;

      min = 0;
      sec = 0;
      hoursBlock.innerText = updateTime(hour);
      minutesBlock.innerText = updateTime(min);

      secondsBlock.innerText = updateTime(sec);
      getSec();
    }
  }, 1000);

};

stopButton.addEventListener('click', stopFunction);
startButton.addEventListener('click', startFunction);

alarmButton.addEventListener('click', () => {
  const timer = getElementById('alarm__input');
  const set = getElementById('submit');
  const alarmContainer = getElementById('alarm__container');
  const repeatCheck = getElementById('repeat');

  alarmContainer.style.display = 'block';



  set.addEventListener('click', () => {
    let a = timer.value.split(':');
    let [hour, min] = a;
    now = new Date();
    let currentTimeMS = now.getHours() * 3600000 + now.getMinutes() * 60000;
    let alarmTimeMS = Number(hour) * 3600000 + Number(min) * 60000;
    let time;

    if (currentTimeMS < alarmTimeMS) {
      time = alarmTimeMS - currentTimeMS - now.getSeconds() * 1000;
    } else {
      time = 3600000 * 24 - (currentTimeMS - alarmTimeMS) - now.getSeconds() * 1000;
    }

    alarmContainer.style.display = 'none';

    setTimeout(() => {
      if (repeatCheck.checked === true) {
        setInterval(() => {
          comeBack();
        }, 3600000 * 24);
      }
      comeBack();
    }, time);
  });
});

const comeBack = () => {
  let alarmBlock = getElementById('alarm__block');
  alarmBlock.style.display = 'block';

  let turnOff = getElementById('reset');
  turnOff.addEventListener('click', () => {
    alarmBlock.style.display = 'none';
  });
};
