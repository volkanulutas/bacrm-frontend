export default function authUserId() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user) {
    return user.id;
  } 
}

