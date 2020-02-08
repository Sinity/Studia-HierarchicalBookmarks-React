import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRoutes, A} from 'hookrouter';
import {format} from 'date-fns';
import './App.css';
import './blogList.scss';
import Tag from './modules/Tag.js';
import TagTree from './modules/TagTree.js';
import BookmarkList from './modules/BookmarkList.js';
import Bookmark from './modules/Bookmark.js';

const baseURL = 'http://localhost:5000/api';

const routes = {
    '/': () => <><TagTree/><hr/><BookmarkList/></>,
	'/bookmarks/:id': ({id}) => <Bookmark id={id}/>,
	'/tags/:id': ({id}) => <Tag id={id}/>
};

function App() {
    const routeResult = useRoutes(routes);
    return (
        <div className="App">
            <A href='/'>Main</A>
            <hr/>

            {routeResult}
        </div>
    );
}


export default App;
