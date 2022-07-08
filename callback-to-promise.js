class UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
                if (
                  (id === "sunny" && password === "sun") ||
                  (id === "manny" && password === "man")
                ) {
                  resolve(id);
                } else {
                  reject(new Error("not found!"));
                }
              }, 2000);
        })
    }
  
    getRoles(user) {
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                if (user === "sunny") {
                  resolve({ name: "sunny", role: "admin" });
                } else {
                  reject(new Error("no access"));
                }
              }, 1000);

        })

    }
  }
  
  //1. id passwoed를 입력받기
  //2. 서버에게 로그인 요청
  //3. 성공히면 id 받아와서 role 받기
  
  const userStorage = new UserStorage();
  const id = prompt("enter your id");
  const password = prompt("enter your password");

  userStorage.loginUser(id, password)
  .then(userStorage.getRoles)
  .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
  .catch(console.log)
  

  