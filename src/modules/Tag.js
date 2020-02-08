import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRoutes, A} from 'hookrouter';
import {format} from 'date-fns';
import TagTree from './TagTree.js';

const baseURL = 'http://localhost:5000/api';

function Tag({id}) {
	const [tag, setTag] = useState({});
	
    useEffect(() => {		
        const fetchData = (async () => {
            const nTag = await axios.get(baseURL + '/tags/' + id);
            setTag({name: nTag.data.name, parents: nTag.data.parents});
        });
		
		fetchData();
    }, []);	
	
    const saveChanges = (ev) => {
		if (tag == {})
			return null;
		
		axios.put(baseURL + '/tags/' + id, {
			name: tag.name,
			parents: tag.parents.map((parent) => parent.id)
		}).then(function(response) {
			console.log(response);
		}).catch(function(error) { console.log(error); });        
    }	
	
    const nameChanged = (ev) => {
		if (tag == {})
			return null;
		
		setTag({name: ev.target.value, parents: tag.parents});
    }		
	
	const parentsChanged = (ev) => {
		if (tag == {})
			return null;
		
		console.log(ev.target);

		if ((ev.target.checked) && (!tag.parents.some(parent => parent.id === ev.target.value))) {
			setTag({name: tag.name, parents: tag.parents.push({name: ev.target.name, id: ev.target.value})});
		} else if ((!ev.target.checked) && (tag.parents.some(parent => parent.id === ev.target.value))) {
			setTag({name: tag.name, parents: tag.parents.filter(parent => parent.id === ev.target.value)});		
		}
	}
	
	return <>
      <form onSubmit={saveChanges}>
        <label>Name:<input type="text" value={tag ? tag.name : ''} onChange={nameChanged} /></label>
		<TagTree selectedTags={tag ? tag.parents : ''} onChangeSelected={parentsChanged} />
        <input type="submit" value="Submit" />
      </form>
	</>;			
}

export default Tag;
