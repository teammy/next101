import { useRouter } from 'next/router'

function CreateDoc() {
  const router = useRouter() 
  const { type } = router.query;

  let pageTitle = '';
  if (type === 'vacation') {
    pageTitle = 'ลาพักผ่อน';
  } else if (type === 'sick') {
    pageTitle = 'ลาป่วย';
  }
  return (
    <div><h1>{pageTitle}</h1></div>
  )
}

export default CreateDoc