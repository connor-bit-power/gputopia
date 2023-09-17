import { useEffect, useState } from "react"

interface AlbyUser {
  avatar: string | null;
  email: string;
  identifier: string;
  keysend_custom_key: string
  keysend_custom_value: string
  keysend_pubkey: string
  lightning_address: string
  name: string | null
}

export function useAlby () {
  const [accessToken, setAccessToken] = useState("")
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState<AlbyUser | null>(null)
  useEffect(() => {
    const accessToken = window.sessionStorage.getItem("alby_access_token");
    const expiresAt = parseInt(window.sessionStorage.getItem("alby_expires_at") || '0', 10);
    const expiresIn = parseInt(window.sessionStorage.getItem("alby_expires_in") || '0', 10);
    const refreshToken = window.sessionStorage.getItem("alby_refresh_token");
    const scope = window.sessionStorage.getItem("alby_scope");
    const tokenType = window.sessionStorage.getItem("alby_token_type");

    if (accessToken && expiresAt && expiresIn && refreshToken && scope && tokenType) {
      setAuthed(true);
      setAccessToken(accessToken);
    }
  }, [])

  useEffect(() => {
    if (authed && !user && !!accessToken) {
      fetch("https://api.getalby.com/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setUser(res);
        })
        .catch((err) => {
          setAuthed(false)
          setUser(null)
          console.error(err);
        })
      }
  }, [authed, user, accessToken])

  return { authed, user };
}