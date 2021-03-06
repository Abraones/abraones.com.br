import styles from '../../styles/Tree.module.scss'
import React from 'react'
import Image from 'next/image'
import imgPerfil from "../../public/img/abraones.jpg"

export default function Tree(props){

    /* <div className={styles.hello}>
    <h1>Abraones</h1>
    <p>Olá, eu sou Abraão Lincon e seja bem vindo ao meu site</p>
</div> */


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                
                <div className={styles.linkTree}>
                    <div className={styles.cellPhone}>
                        <div className={styles.iconPerfil}>
                        <Image className={styles.logo} alt="Vercel logo" src={imgPerfil} width={1000} height={1000} />
                        <p>Abraão Lincon</p>
                        </div>
                        <a href="">
                            <div className={styles.buttonTree}>
                                <p>Sobre mim</p>
                            </div>
                        </a>
                        <a href="https://www.instagram.com/abraones_/">
                            <div className={styles.buttonTree}>
                                <p>Instagram</p>
                            </div>
                        </a>
                        <a href="./bianca">
                            <div className={styles.buttonTree}>
                                <p>Desafio Dev</p>
                            </div>
                        </a>
                        <div className={styles.swipe}></div>
                    </div>
                </div>

            </header>
        </div>
    )
}