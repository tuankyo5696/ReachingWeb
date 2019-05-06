import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
   state = {
       posts: [],
       selectedPostId: null
   }
   
    componentDidMount(){
         axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.splice(0,4)
                const updatePosts = posts.map(post=>{
                    return {
                        ...post,
                        author: 'Tuan'
                    }
                })
                this.setState({
                    posts : updatePosts
                });  
              
            });
            
     
    }
    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }
    
    render () {
        const {posts} = this.state;
        const elmposts = posts.map(post =>{
            return <Post 
            title = {post.title} 
            key={post.id} 
            author = {post.author}
            clicked ={()=>this.postSelectedHandler(post.id)}/>
        });
        return (
            <div>
                <section className="Posts">
                    {elmposts}
                </section>
                <section>
                    <FullPost id ={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;