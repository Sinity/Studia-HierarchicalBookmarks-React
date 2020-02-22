import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {navigate} from 'hookrouter';
import API_URL from '../api.js';

function BookmarkEdit({id}) {   
    const [bookmark, setBookmark] = useState({url: '', tags: []});
    useEffect(() => {
        if (!id)
            return;
        
        axios.get(API_URL + '/bookmarks/' + id)
            .then(function(response) { setBookmark(response.data); })
            .catch(function(error) { console.log(error); });
    }, [id]);
    
    function handleSubmit(ev) {
        var reqURL = API_URL + '/bookmarks';
        var reqMethod = 'post';     
        if (id) {
            reqMethod = 'put';
            reqURL += '/' + id;
        }
            
        axios({method: reqMethod, url: reqURL, data: bookmark})
            .then(function (response) { navigate('/'); window.location.reload(true); })
            .catch(function (error) { console.log(error); });       
            
        ev.preventDefault();
    }
    
    function handleURLChanged(ev) {
        setBookmark({url: ev.target.value, tags: bookmark.tags});
    }
    
    function handleTagsChanged(ev) {
        setBookmark({url: bookmark.url, tags: ev.target.value.split(/[ ]+/)});
    }   
    
    return <><form onSubmit={handleSubmit}>
        <div class="form-group">
            <label htmlFor="url">URL:</label>
            <input className="form-control" type="url" id="url" name="URL" value={bookmark.url} onChange={handleURLChanged} />
        </div>
        <div class="form-group">
            <label htmlFor="tags">Tags:</label>
            <input className="form-control" type="text" id="tags" name="tags" value={bookmark.tags ? bookmark.tags.join(' ') : ''} onChange={handleTagsChanged} />      
        </div>
        <input className="btn btn-light" type="submit" value="Send" />  
    </form></>;
}

export default BookmarkEdit;