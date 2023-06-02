import React, { useState } from 'react';
import axios from 'axios';

function PostCreate() {
    const [title, setTitle] = useState('');

    const postHandler = (e) => {
        setTitle(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        })
        setTitle('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        className='form-control'
                        value={title}
                        onChange={postHandler}
                    />
                </div>
                <button className='btn  btn-primary'>Submit</button>
            </form>

        </div>
    )
}

export default PostCreate