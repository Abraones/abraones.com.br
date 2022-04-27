import styles from '../styles/Tree.module.scss'
import React from 'react'
import Image from 'next/image'
import imgPerfil from "../public/img/abraones.jpg"

export default function Tree(props){

 
    return (
            <header className={styles.header}>
                
                <div className={styles.linkTree}>
                    <div className={styles.cellPhone}>
                        <div className={styles.iconPerfil}>
                        <Image className={styles.logo} alt="Vercel logo" src={imgPerfil} width={1000} height={1000} />
                        <p>Abraão Lincon</p>
                        </div>
                        <a href="/sobre">
                            <div className={styles.buttonTree}>
                                <p>Sobre mim</p>
                            </div>
                        </a>
                        <a href="./dev">
                            <div className={styles.buttonTree}>
                                <p>Desafio Dev</p>
                            </div>
                        </a>
                        <a href="https://www.instagram.com/abraones_/">
                            <div className={styles.buttonTree}>
                                <p>Instagram</p>
                            </div>
                        </a>
                        <div className={styles.swipe}></div>
                    </div>
                </div>

            </header>
    )
}