import { useRouter } from 'next/router'

function MeInvest({ posts }) {
  const router = useRouter()
  const { id } = router.query

  return <p>Inversion: {id}</p>
}


export default MeInvest