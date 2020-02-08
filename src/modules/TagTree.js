import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRoutes, A} from 'hookrouter';
import {format} from 'date-fns';

const baseURL = 'http://localhost:5000/api';

function TagTree({selectedTags, onChangeSelected}) {   
	function TagTreeNode({id, name, children, selectedTags, onChange}) {		
		var childrenList = children.map((tag) => <TagTreeNode key={tag.id} id={tag.id} name={tag.name} children={tag.children}/>);
		return <li>
			<input type="checkbox" value={id} name={name} onChange={onChange} checked={(selectedTags && (selectedTags.length > 0)) ? selectedTags.some(tag => tag.id === id) : false} />
			<A href={'/tags/' + id}>{name}</A>
			<ul>{childrenList}</ul>
		</li>;
	}	
	
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
		axios.get(baseURL + '/tags').then(function(response) {
			setTagList(response.data);
			console.log(response);
		}).catch(function(error) { console.log(error); });
    }, []);

    return <ul><TagTreeNode key="0" id="" name="Tags" children={tagList} selectedTags={selectedTags} onChangeSelected={onChangeSelected} /></ul>;	
}

export default TagTree;