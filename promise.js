/**
 * Promise
 * 비동기를 간편하게 처리할 수 있도록 도와주는 오브젝트
 * 정해진 장시간 기능 수행하고 성공하면 기능. 문제발견 에러 전달
 * Promise is a JaveScript object for asynchronous operation.
 * 비동기적인 것을 수행할 때 callback함수 대신에 사용할 수 있는 유용한 오브젝트
 * State : pending -> fulfilled or rejected
 * Producer : 우리가 원하는 데이터를 제공하는사람  : 정보 제공
 * Comsumer : 데이터를 쓰는 사람 : 소비자
 */

//1. Producer
// When new Promise is created, the executor runs automatically.
// promise를 만드는 순간 executor 수행
// resolve : 기능을 정상적으로 수행해서 마지막에 최종 데이터를 전달함
// reject : 기능을 수행하다가 문제가 생기면 호출

const promise = new Promise((resolve, reject) => {
  //doing some heavy work (network, read files)
  console.log("doing somthing");
  // * 만약 네트워크 요청을 사용자가 요구했을때만 해야한다면
  // 사용자가 요구하기 전에 불필요한 네트워크 통신이 일어날 수 있음
  setTimeout(() => {
    resolve("ellie");
    // reject(new Error('no network'))
  }, 2000);
});

//2. Comsumers: them, catch, finally로 값을 받아옴
//promise가 정상 수행 되었을때 리졸브를 통해서 값이 전달되어서 들어옴

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally는 성공 여부에 상관없이 호출");
  });

//비동기적으로 수행하고싶은 코드를 작성하고 성공하면 resolve 실패하면 reject,  Error 전달

//3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(num - 1);
      }, 1000);
    });
  })
  .then((num) => console.log(num));

//rhen 값을 바로 전달해도 되고 프라미스를 전달해도 됨

// Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("닭");
    }, 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
    //   resolve(`${hen}  => 알`);
    reject(new Error(`Error ${hen}`))

    }, 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${egg}  => 계란후라이~!`);
    }, 1000);
  });

// getHen()
//   .then((hen) => getEgg(hen))
//   .then((egg) => cook(egg))
//   .then((meal) => console.log(meal));


  getHen()
  //then 에서 받아오는 value를 바로 get egg로 전달해서 실행 가능
  .then(getEgg)
  .catch(error =>{
    return "BREAD!!!";
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);


  //5. 