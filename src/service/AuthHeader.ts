export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "false");
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
