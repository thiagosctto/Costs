import styles from './Newproject.module.css';
import ProjectForm from '../project/ProjectForm';
import {useNavigate} from 'react-router-dom'

function Newproject(){

    const navigate = useNavigate()

    function createPost(project) {

        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(project),
        }).then(
            resp => resp.json()
        ). then((data) => {
            console.log(data)
            const state = { message: "Projeto criado com sucesso!" };
            navigate("/projects", {state});
        })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}> 
            <h1>Criar Projeto</h1>
            <p>Crie seu Projeto para depois adicionar os serviços!</p>
            <ProjectForm handleSubmit={createPost} btnText="criar projeto"/>
        </div>
    )
}
export default Newproject;