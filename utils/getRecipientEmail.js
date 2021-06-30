export default function getRecipientEmail(users, userLoggedIn) {
  return users?.filter((user) => user !== userLoggedIn?.email)[0]
}
