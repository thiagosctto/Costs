import Mensagem from "../layouts/Mensagem"
import {useLocation} from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../layouts/Container'
import LinkButton from "../layouts/LinkButton"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"
import Loading from "../layouts/Loading"

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()

    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect (() => {

        setTimeout(
            () => {
                fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
            }, 300)
    }, [])

    return (
        <div className={styles.project_container}> 
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Mensagem type="success" msg={message} />}
            <Container customClass="start">

                {projects.length > 0 && 
                    projects.map((project) => 
                        <ProjectCard 
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project?.category?.name}
                            key={project.id} 
                        />
                    )
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados</p>
                }
            </Container>
            
        </div>
    )
}

export default Projects