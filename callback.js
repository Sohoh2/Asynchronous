"use strict";

/**
 * JavaScript is synchronous.
 * Execute the code block by orger after hoisting.
 * 호이스팅이 된 이후부터 코드가 작성한 순서에 맞춰서 하나하나 동작하는 '동기적인' 언어
 * 호이스팅은  var, function declaration에서 일어남
 **/

//setTimeout -> 비동기적인 실행방법

console.log("0");
setTimeout(() => {
  console.log("1");
}, 1000);
console.log("2");

// 작동순서 0 -> 2 -> 1

//콜백에도 동기적, 비동기적 처리를 할 수 있음

//Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log("Synchronous callback!"));

//Asynchronous callback

function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}

printWithDelay(() => console.log("Asynchronous callback!"), 2000);

/**
 * callback chain
 * 콜백지옥 : 콜백 안에서 다른 콜백 호출하고 또 전달하고 또 호출하고 또 전달
 * 1. 가독성이 너무 떨어짐
 * 2. 비지니스 로직을 한눈에 이해하기 힘들어짐
 * 3. 에러가 발생하거나 디버깅할 때 어려움
 * 4. 유지보수가 어려워짐
 * 
 */

class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "sunny" && password === "sun") ||
        (id === "manny" && password === "man")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found!"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "sunny") {
        onSuccess({ name: "sunny", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

//1. id passwoed를 입력받기
//2. 서버에게 로그인 요청
//3. 성공히면 id 받아와서 role 받기

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)

      },
      (error) => {
        console.log(error)
      }
    );
  },
  (error) => {
    console.log(error);
  }
);


