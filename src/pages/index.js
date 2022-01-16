import styles from '../styles/Home.module.scss'
import Bianca from '../components/Bianca'
import Contador from '../components/Contador'; 
import Parallax from '../components/Parallax'
/* function Contador(){
    return
} */


 function Home() {

    return (
        <>
            <Parallax />
        <div className={styles.container}>
            <Contador />
            <Bianca/>
        </div>
        </>
    )
 }

 export default  Home
