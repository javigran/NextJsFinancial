import { useRouter } from 'next/router'

function meInvest({ posts }) {
  const router = useRouter()
  const { id } = router.query

  return <p>Inversion: {id}</p>
}


export default meInvest