import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {A} from 'hookrouter';
import {format} from 'date-fns';
import API_URL from '../api.js';

function BookmarkListItem({id, url, createdOn, tags}) {
	function handleDelete(ev) {
		axios.delete(API_URL + '/bookmarks/' + id)
			.then(function (response) { window.location.reload(true); })
			.catch(function (error) { console.log(error); });	
		ev.preventDefault();
	}
	
	return <div>
		<a href={url}>{url}      </a>
		<A className="btn btn-light m-1" role="button" href={'/bookmarks/' + id}>edit   </A>
		<button className="btn btn-danger" onClick={handleDelete}>Delete</button>
		<p>
			Tags: {tags.join(', ')}<br />
			Created: {format(new Date(createdOn), 'yyyy-MM-dd')}
		</p>
	</div>;	
}

function BookmarkList({tag}) {		
    const [bookmarkList, setBookmarkList] = useState([]);
    useEffect(() => {	
		axios.get(API_URL + (tag ? '/tags/' + tag : '/bookmarks')).then(function(response) {
			setBookmarkList(response.data);
		}).catch(function(error) { console.log(error); });
    }, [tag]);

    return bookmarkList.map((bookmark) => 
		<><BookmarkListItem key={bookmark.id} id={bookmark.id} url={bookmark.url} createdOn={bookmark.createdOn} tags={bookmark.tags}/><hr/></>);
}

export default BookmarkList;