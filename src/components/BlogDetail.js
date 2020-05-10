import React, { useContext } from 'react';
import { PostContext } from '../PostContext';
import './BlogDetail.css';

const BlogDetail = (match) => {
    const [posts, setPosts] = useContext(PostContext);
    
    const id = match.match.params.id;
    
    const post = posts.find(item => item.id === parseInt(id));


    const formatDate = (unformattedDate) => {
        const date = new Date(unformattedDate).toUTCString().split(' ');
        const formattedDate = `${date[1]} ${date[2]}, ${date[3]}`;
        return formattedDate;
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="post">
                        <div className="single-image"><img src="/images/assets/images.jpg" /></div>
                        <div className="single">
                            <div className="row">
                                <div className="col-md-1">
                                    <img src="/images/users/user.jpg" className="single-avatar" />
                                </div>
                                <div className="col-md-11 single-info">
                                    <div className="single-author">{post.author}</div>
                                    <div className="single-date">{formatDate(post.date)}</div>
                                </div>
                            </div>
                            <div className="single-title">{post.title}</div>
                            <div className="single-content">{post.content}</div>
                            <div className="single-tags">
                                {post.tags.map((tag, index) => (
                                    <div className="tag" key={index}><span>{tag}</span></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;