import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PostProvider } from './PostContext';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';

function App() {
  
  
  return (
    <PostProvider>    
        <Router >
            <Nav />
            <Switch>
              <Route path="/" exact component={Blog} />
              <Route path="/blog" exact component={Blog} />
              <Route path="/blog-detail/:id" component={BlogDetail} />
              <Route path="/blog/category/:category" component={Blog} />
            </Switch>
            <Footer />
        </Router>
      </PostProvider>
  );
}

export default App;
