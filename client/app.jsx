import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      caption: ''
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGroupName = this.handleGroupName.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
  }

  componentDidMount() {
    fetch('api/groups')
      .then(res => res.json())
      .catch(error => console.error('Error:', error));
  }

  handleCaptionChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleGroupName(event) {
    this.setState({ groupName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();
    form.append('groupName', this.state.groupName);
    form.append('url', this.fileInputRef.current.files[0]);
    form.append('caption', this.state.caption);
    fetch('/api/groups', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ caption: '', groupName: '' });
        this.fileInputRef.current.value = null;

      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
          <div className="col col-md-8">
            <h3 className="text-center mb-5">Create a group</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="groupName" className="form-label">Group Name</label>
                <input type="text" value={this.state.groupName} onChange={this.handleGroupName} className="form-control" id="groupName" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" value={this.state.caption} onChange={this.handleCaptionChange} id="exampleFormControlTextarea1" rows="3" placeholder="About..." />
              </div>
              <div className="mb-3">
                <input
                  required
                  type="file"
                  name="image"
                  ref={this.fileInputRef}
                  placeholder="Choose group picture"
                  accept=".png, .jpg, .jpeg, .gif" />
              </div>
              <div>
                <button type="button" className="btn btn-primary">POST</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
