import { GetServerSideProps } from "next"
import axios, { Axios } from "axios"

function Bianca(){

    
    return (
        <section>
        <p>Teste abacaxi</p>
        </section>
    )
}

export async function getServerSideProps(context) {
    const response = await axios.get('http://localhost:3000/api/users');
    return {
      props: {response}, // will be passed to the page component as props
    }
  }

export default Bianca