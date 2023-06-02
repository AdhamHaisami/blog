import React, { useState } from 'react';
import axios from 'axios';


function CommentCreate({ postId }) {
    const [comment, setComment] = useState('');

    const commnetHandler = (e) => {
        setComment(e.target.value);
    }
    const commentSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content: comment
        });
        setComment('')
    }
    return (
        <div>
            <form onSubmit={commentSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input
                        style={{ marginBottom: '10px' }}
                        className='form-control'
                        type="text"
                        value={comment}
                        onChange={commnetHandler}
                    />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate