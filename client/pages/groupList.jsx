import React from 'react';
const styles = {
  product: {
    display: 'block',
    cursor: 'pointer'
  },
  image: {
    height: '250px',
    objectFit: 'contain'
  },
  description: {
    height: '3rem',
    overflow: 'hidden'
  }
};

export default class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    fetch('/api/groups')
      .then(res => res.json())
      .then(groups => this.setState({ groups }));
  }

  render() {
    return (
      <div className="container">
        <div className='row title-padding'>
          <div className='col-11'><h2>My Groups</h2></div>
          <div className='col'><i className="title-padding fas fa-plus fa-2xl align-center" /></div>
        </div>
        <hr />
        <div className="row">
          {
            this.state.groups.map(groups => (
              <div key={groups.groupId} className="col-12 col-md-6 col-lg-4">
                <ShowGroup groups={groups} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function ShowGroup(props) {
  // eslint-disable-next-line no-unused-vars
  const { groupId, groupName, caption, image } = props.groups;
  /* this anchor should go to product details at `#products?productId=${productId}` */
  return (
    <a
      href={`#groups?groupId=${groupId}`}
      style={styles.product}
      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <img src={image} className="card-img-top" alt={groupName} style={styles.image} />
      <div className="card-body">
        <h5 className="card-title">{groupName}</h5>
        <p className="card-text" style={styles.description}>{caption}</p>
      </div>
    </a>
  );
}
