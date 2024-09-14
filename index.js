//setTimeout и setInterval
setTimeout(() => {
  console.log("Привет через 3 секунды!"); /*callback функция*/
}, 3000); /*delay*/

function greeting() {
  /*2вариант записи первого задания */
  console.log("Привет через 3 секунды!");
}
setTimeout(greeting, 3000);

const interval = setInterval(() => {
  console.log("Привет каждые 2 секунды!"); /*callback функция*/
}, 2000); /*interval*/
setTimeout(() => {
  clearInterval(interval);
  console.log("Остановите интервал через 6 секунд.");
}, 6000);

let color = "red"; /*не работает*/
function changeColor(color) {
  setInterval(() => {
    console.log(color);
  }, 5000);
}
setTimeout(() => {
  console.log(color);
}, 20000);

// Коллбэки
function fetchData(callback) {
  /* Основная функция выполняет задержку в 2 с*/
  setTimeout(() => {
    console.log("получение данных");
    callback();
  }, 2000);
}
function handleData() {
  /* коллбэк функция*/
  console.log("Данные получены");
}
fetchData(
  handleData
); /* колбэк функцию передаем в качестве аргумента в основную функцию*/

//Обработка ошибок в коллбэках

function divide(num1, num2, callback) {
  const result = num1 / num2;
  if (num2 != 0) {
    return callback(result);
  } else {
    return callback(new Error("На ноль делить нельзя"));
  }
}
function resultDivide(result) {
  console.log(result);
}

divide(5, 0, resultDivide);

//Коллбэки в цепочке
function step1(callback) {
  setTimeout(() => {
    let str = "Шаг 1 завершен";
    callback(str);
  }, 1000);
}
function step2() {
  console.log(str);
}
step1(step2); // не получается, не поняла как делать цепочки

// Простой промис
const promise = new Promise((resolve) => {
  setTimeout(() => resolve("Промис выполнен"), 2000);
});
promise.then(result => {
  /*обработка результата*/
  console.log("Результат:", result);
});

// Промис с ошибкой - 
const promise1 = new Promise((resolve, reject) => {
  const success = false;
  if (success) {
    resolve("Успех");
  } else {
    setTimeout(() => reject("Промис отклонен"), 3000);
  }
});
promise1.
then(result => {
  /*обработка результата*/
  console.log("Результат:", result)
})
.catch(error => {
  /*если результат промис отклонен - обработка ошибок*/
  console.log("Ошибка", error);
});

// или
const promise2= new Promise((resolve, reject) => { //здесь если убрать resolve не работает почему?
  setTimeout(() => 
  reject("Промис отклонен")
, 3000);
})
promise2
.catch((error) => {
/*если результат промис отклонен - обработка ошибок*/
console.error("Ошибка", error);
});


// цепочка промисов 
function operation1() {
  return new Promise((resolve) =>{
    setTimeout(() => resolve("Первый промис"),
    1000);
  });
}
function operation2(data) {
  return new Promise((resolve)=> {
    resolve("Второй промис")
  })
} 
operation1()  /*отсюда совсем непонятно, переписала из примера*/
.then(data => {
  console.log(data);
  return operation2(data)
}) 
.then(result =>{
  console.log(result)
})


async function fetchDataAsync() {
  return new Promise((resolve)=>{
  setTimeout(()=>{
  return "Данные получены"
  },2000)  
  })
}
async function getData(){
  let result = await fetchDataAsync();
  console.log(result)
}
