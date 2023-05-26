import './project-list.style.css';
import ProjectForm from '../components/project-form/project-form.component';
import NewProjectForm from '../components/new-project-form/newProjectForm.component';
import {useContext, useEffect, useState} from 'react';
import { ProjectContext } from '../contexts/project.context';
import {useCookies} from "react-cookie";
import {getProjectList} from "../action/project-action";
import { UserContext } from '../contexts/user.context';
import React from 'react';
import {getUser} from "../action/user-action";

const ProjectList = () => {
  const { displayUserName } = useContext(UserContext);
  const { projectList } = useContext(ProjectContext);
  const { setProjectList } = useContext(ProjectContext);
  const [cookies, setCookies] = useCookies();
  const [refresh, setRefresh] = useState(0);
  const { setCurrentUser } = useContext(UserContext);
  const { setDisplayUserName } = useContext(UserContext);
  useEffect(() => {
    (async function () {
      if (cookies.w_auth) {
        const res = await getUser(cookies.user_id);
        setCurrentUser({ email: res.data.id, password: res.data.password });
        setDisplayUserName(res.data.id.substring(0, res.data.id.indexOf("@")));
        const response = await getProjectList(cookies.user_id);
        if (response.data.length !== 0) {
          setProjectList(response.data);
        }
      }
    })();
  }, [cookies, refresh]);

  const [newProjectFormVisible,setNewProjectFormVisible] = useState(false);
  
  //set newProjectFormVisible true when new-project-btn clicked
  //set newProjectFormVisible false when close-btn clicked in newProjectForm
  const toggleFormVisible = () => {
    setNewProjectFormVisible(!newProjectFormVisible);
  }
  
  return (
    <div className='project-body'>
      <div className='project-display-name'>
        {displayUserName}님의 프로젝트
      </div>
      <div className='project-slider'>
        { newProjectFormVisible && 
          <NewProjectForm onClose={toggleFormVisible} setRefresh={() => setRefresh(refresh + 1)}/>
        }
        <div className='new-project-btn-container'>
          <button className='new-project-btn' onClick={toggleFormVisible}>
            +
          </button>
        </div>
        {projectList && projectList.map((project) => (
          <ProjectForm key={project.id} project={project} setRefresh={() => setRefresh(refresh + 1)}/>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;

