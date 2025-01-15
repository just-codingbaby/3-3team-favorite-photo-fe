import {useRouter} from 'next/router'

export default function Page() {
  const router = useRouter()
  return <p>CardId: {router.query.id}</p>
}