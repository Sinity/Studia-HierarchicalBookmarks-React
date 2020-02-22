import React from 'react';
import {useRoutes, A} from 'hookrouter';
import './App.css';
import TagList from './modules/TagList.js';
import BookmarkList from './modules/BookmarkList.js';
import BookmarkEdit from './modules/BookmarkEdit.js';

const routes = {
    '/': () => <BookmarkList/>,
    '/add': () => <BookmarkEdit/>,
    '/bookmarks/:id': ({id}) => <BookmarkEdit id={id}/>,
    '/tags/:name': ({name}) => <><BookmarkList tag={name}/></>
};

function NavBar(props) {
    return <>            
        <A href='/'>View all bookmarks</A><br />
        <A href='/add'>Add new bookmark</A><br />
        <TagList/>
    </>;
}

function App() {
    const routeResult = useRoutes(routes);
    return (
        <div className="App">
            <NavBar className="navbar" />
            <hr />
            {routeResult}
        </div>
    );
}


export default App;
