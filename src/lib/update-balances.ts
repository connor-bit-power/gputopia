import { useStore } from "./store"

export const updateBalances = () => {
  const user = useStore.getState().user
  if (!user) return console.log("No user found")

  fetch("/api/balance", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email }),
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((json) => {
    if (json.totalSatsEarned) {
      useStore.setState({ balance: json.balance, totalSatsEarned: json.totalSatsEarned })
      console.log(`Updated balance to ${json.balance} and totalSatsEarned to ${json.totalSatsEarned}`)
    }
  }).catch((error) => {
    console.log(error);
  })
}