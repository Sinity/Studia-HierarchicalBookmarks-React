import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {A} from 'hookrouter';
import API_URL from '../api.js';

function TagList() {    
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
        axios.get(API_URL + '/tags').then(function(response) {
            setTagList(response.data);
            console.log(response);
        }).catch(function(error) { console.log(error); });
    }, []);

    var list = tagList.map((tag) => <li className="list-inline-item" key={tag}><A href={'/tags/' + tag}>{tag}</A></li>);
    return <ul className="list-inline"><li className="list-inline-item" key="_header">Tags:</li>{list}</ul>;    
}

export default TagList;