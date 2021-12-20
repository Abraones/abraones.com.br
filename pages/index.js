import styles from '../styles/styles.module.scss'
import Contador from '../components/Contador'; 
/* function Contador(){
    return
} */


 function Home() {

    return (
        <div className={styles.container}>
            <Contador/>
        </div>
    )
 }

 export default  Home
