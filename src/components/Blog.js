import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostContext } from '../PostContext';
import './Blog.css';

const Blog = (match) => {

    const [posts, setPosts] = useContext(PostContext);  
    
    // Search data
    const [input, setInput] = useState('');
    let [filteredData, setFilteredData] = useState([]);

    const [cat, setCat] = useState(undefined);

    const {category} = useParams();
    

    // Getting popular posts
    const getPopularPosts = () => {
        let popularPosts = [];
        for(let i = 1; i <= 5; i++) {
            popularPosts.push(posts[i]);
        }
        return popularPosts;
    }

    // Getting posts by category
    useEffect(() => {
        if(category !== undefined) {
            const classified = posts.filter(post => post.category.toLowerCase() === category);
            setCat(classified);
            setFilteredData(classified);
        } else {
            setFilteredData(posts);
            setCat(undefined);
        }
    }, [category]);

    useEffect(() => {
        setFilteredData(posts);
        getPopularPosts();
    }, []);    


    // Star rank
    const countStars = (stars) => {
        let items = [];
        for(let i = 1; i <= 5; i++) {
            i <= stars ? items.push(<span key={i} className="fa fa-star checked"></span>) : items.push(<span key={i} className="fa fa-star"></span>);
        }
        return items;
    }

    // Date function
    const dateFunction = (date) => {        
        const formattedDate = date.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
        const now = new Date().toISOString().split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
        const diffDays = parseInt((new Date(now) - new Date(formattedDate)) / (1000 * 60 * 60 * 24), 10);

        if(diffDays === 0)
            return 'today';
        if(diffDays === 1)
            return 'yesterday';
        if(diffDays < 7)
            return `${diffDays} days ago`;
        if(diffDays >= 7  && diffDays < 30)
            return `${Math.floor(diffDays / 7)} ${Math.floor(diffDays / 7) === 1 ? 'week' : 'weeks'} ago`;
            //result = diffDays % 7 === 0 ? Math.floor(diffDays / 7) : Math.floor((diffDays / 7) + 1);
        if(diffDays >= 30 && diffDays < 365)
            return `${Math.floor(diffDays / 30)} ${Math.floor(diffDays / 30) === 1 ? 'month' : 'months'} ago`;
        if(diffDays >= 365)
            return `${Math.floor(diffDays / 365)} ${Math.floor(diffDays / 365) === 1 ? 'year' : 'years'} ago`;
    }

    // Search filter
    const filter = (input) => {
        let newData = [];
        let temp = cat === undefined ? posts : cat;
        temp.map((el, i) => {
            if(el['title'].toString().toLowerCase().indexOf(input) > -1) {
                newData.push(el);
            }
        });
        setFilteredData(newData);
    }

    // Handle search input
    const handleSearch = (event) => {
        let inputSearch = event.target.value;
        setInput(inputSearch);
        filter(event.target.value);
    }

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="nav-search">
                        <div className="icon-input">
                            <input type="text" onChange={handleSearch} value={input} placeholder="Search" className="form-control search-box" />
                            <img src="/images/assets/search.png" width="32" height="32" />
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="posts">
                        
                        {filteredData.map(post => (
                            <div className="single-post" key={post.id}>
                            <div className="post-image"><img src="/images/assets/images.jpg" /></div>
                            <Link to={`/blog/category/${post.category.toLowerCase()}`} style={{ textDecoration: 'none', color: '#000' }}>
                                <div data-category={post.category.toLowerCase()} className="post-category"><span className={`post-${post.category.toLowerCase()}`}>{post.category}</span></div>
                            </Link>
                            <div className="post-stars">{ countStars(post.rank) }</div>
                            <Link to={`/blog-detail/${post.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                                <div className="post-title">{post.title}</div>
                            </Link>
                            <div className="post-author-and-date">
                                <div className="col-md-6">
                                    <div className="post-author">{post.author}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="post-date text-right">{dateFunction(post.date)}</div>
                                </div>
                            </div>
                        </div>
                        ))}
                       
                    </div>
                </div>


                <div className="col-md-3 pop-container">
                    <div className="popular-blogs">
                        <div className="top">Popular Blogs</div>
                        
                        {getPopularPosts().map((post, i) => (
                            <div className="popular" key={post.id}>
                            <Link to={`/blog-detail/${post.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                                <div className="popular-title">{post.title}</div>
                            </Link>
                            <div className="popular-category">{post.category}</div>
                            <div className="popular-stars">
                                {countStars(post.rank)}
                            </div>
                            {i === getPopularPosts().length - 1 ? '' : <hr />}
                        </div>
                        ))}
            
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Blog;