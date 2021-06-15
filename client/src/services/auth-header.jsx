
// DATA service
/* 
We also have methods for retrieving data from server. 
In the case we access protected resources, 
the HTTP request needs Authorization header. 
*/
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // For Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };

    // for Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}

/* The code above checks Local Storage for user item. If there is a logged in user with accessToken (JWT), return HTTP Authorization header. Otherwise, return an empty object. */
