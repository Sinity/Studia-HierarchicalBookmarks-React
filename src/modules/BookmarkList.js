import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRoutes, A} from 'hookrouter';
import {format} from 'date-fns';

const baseURL = 'http://localhost:5000/api';

function BookmarkList(props) {
	const BookmarkListItem = ({id, url, createdOn, tags}) =>
		<div>
			<h3><a href={url}>{url} - {id}</a></h3>
			<p>{tags.map((tag) => tag.name + ': ' + tag.id).join()}</p>
			<p>{format(new Date(createdOn), 'yyyy-MM-dd')}</p>
			<A href={baseURL + '/bookmarks/' + id}>details</A>
			<hr/>
		</div>;	
		
    const [bookmarkList, setBookmarkList] = useState([]);
    useEffect(() => {
		axios.get(baseURL + '/bookmarks').then(function(response) {
			setBookmarkList(response.data);
		}).catch(function(error) { console.log(error); });
    }, []);

    return bookmarkList.map((bookmark) => 
		<BookmarkListItem key={bookmark.id} id={bookmark.id} url={bookmark.url} createdOn={bookmark.createdOn} tags={bookmark.tags}/>);
}

export default BookmarkList;