import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommetnList({ postId }) {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const { data } = await axios.get(`http://localhost:4001/post/${postId}/comments`);
        setComments(data);
    }

    useEffect(() => {
        fetchComments();
    }, [])
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>
            {comment.content}
        </li>
    })
    return (
        <ul>{renderedComments}</ul>
    )
}

export default CommetnList