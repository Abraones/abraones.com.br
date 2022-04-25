import styles from '../styles/Home.module.scss'
import Contador from '../components/Contador'; 
import Parallax from '../components/Parallax';
import Tree from '../components/Tree'
/* function Contador(){
    return
} */


 function Home() {

    // <Parallax />
    return (
        <div>
            <Tree/>
            <div className={styles.container}>
                <Contador />
            </div>

        </div>
    )
 }

 export default  Home
