import React from 'react';
const styles = {
  product: {
    display: 'block',
    cursor: 'pointer'
  },
  image: {
    height: '600px',
    objectFit: 'contain'
  },
  description: {
    objectFit: 'contain'

  }
};

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div className="container">
        <div className='row title-padding'>
          <div className='col-11'><h2>My Posts</h2></div>
          <div className='col'>
            <a href='#postForm'>
              <i className="title-padding fas fa-plus fa-2xl align-center" />
            </a>
          </div>
        </div>
        <hr />
        <div className="row">
          {
            this.state.posts.map(posts => (
              <div key={posts.postId} className="col-11">
                <ShowPosts posts={posts} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function ShowPosts(props) {
  // eslint-disable-next-line no-unused-vars
  const { postId, title, caption, image } = props.posts;
  /* this anchor should go to product details at `#products?productId=${productId}` */
  return (
    <a
      href={`#posts?postId=${postId}`}
      style={styles.product}
      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <img src={image} className="card-img-top" alt={postId} style={styles.image} />
        <p className="card-text" style={styles.description}>{caption}</p>
      </div>

    </a>
  );
}
