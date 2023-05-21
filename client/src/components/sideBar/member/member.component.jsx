import '../mainContent.style.css';
import './member.style.css';
import UserCard from './userCard.component';
import React, { useState, useEffect, useContext } from 'react';
import { searchByEmail } from '../../../action/search-action';
import { ProjectContext } from '../../../contexts/project.context';

//검색 결과 테스트 데이터
const test_search_result = 
  [
    {
      "name": "홍길동1",
      "email": "user1@naver.com"
    },
    {
      "name": "홍길동2",
      "email": "user2@naver.com"
    },
    {
      "name": "홍길동3",
      "email": "user3@naver.com"
    },
    {
      "name": "홍길동4",
      "email": "user4@naver.com"
    },
    {
      "name": "홍길동5",
      "email": "user5@naver.com"
    },
    {
      "name": "홍길동6",
      "email": "user6@naver.com"
    },
    {
      "name": "홍길동7",
      "email": "user7@naver.com"
    },
    {
      "name": "홍길동8",
      "email": "user8@naver.com"
    },
    {
      "name": "홍길동9",
      "email": "user9@naver.com"
    }
  ]


const Member = (props) =>{
  const {zIndex} = props;
  const [searchId, setSearchId] = useState(''); //searchId 유저에게 input으로 받은 값(이메일)
  const [searchResult, setSearchResult] = useState([]);//초기값 테스트 데이터
  const { currentProject } = useContext(ProjectContext);

  const handleChange = async (e) => {
    const { value } = e.target;
    console.log(value);
    if (value) {
        const result = await searchByEmail(value);
        if (result.data.length) {
            console.log(result.data);
            setSearchResult(result.data.map((e) => ({ name: e.name, email: e.id, id: e._id})));
        }
    }
    setSearchId(value);
  }

  return(
  <div className='main-content-wrapper member-wrapper' opacity={{zIndex}}>
    <div className='search-bar-container'>
      <input className='search-bar' placeholder='이메일로 친구를 검색해보세요' value={searchId} onChange={handleChange}/>
    </div>
    <div className='search-result'>
      {searchResult.map((user) => (<UserCard key={user._id} user={user}/>))}
    </div>
  </div>
  )
}
export default Member;